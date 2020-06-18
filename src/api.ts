import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { ApiError, IJimuApiOption } from "./types";
import { globalErrorCodeHandler, globalStatusCodeErrorHandler } from "./handlers";
import { showError, transformErrorFieldMessages } from "./show-error";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";
import { notifyRequestStart, notifyRequestDone } from "./progress";

const instance = axios.create();
const CancelToken = axios.CancelToken;

export function setApiBaseUrl(baseUrl: string) {
  instance.defaults.baseURL = baseUrl;
}

export function getApiBaseUrl() {
  return instance.defaults.baseURL;
}

/** 强行暴露 instance 供外部处理, 不推荐使用, 只在特殊场景用往 instance 插入逻辑 */
export let processApiBaseInstance = (f: (apiInstance: typeof instance) => void) => {
  f(instance);
};

export function setApiDefaultHeader(headers: any, isMerge = true) {
  if (isMerge) {
    Object.assign(instance.defaults.headers, headers);
  } else {
    instance.defaults.headers = headers;
  }
}

export function setApiDefaultConfig(config: AxiosRequestConfig) {
  Object.assign(instance.defaults, config);
}

export function generateCancelToken() {
  return CancelToken.source();
}

const handleError = (err: ApiError, config?: IJimuApiOption) => {
  if (config == null) {
    config = {};
  }

  if (err.isUnauthorized()) {
    JimuApisEventBus.emit(EJimuApiEvent.ErrorUnauthorized);
  }

  // errorMessageMap[code] might be set false to prevent showing messages
  showError(err, config.errorMessage, config.statusCodeErrorMessage, config.fieldLocaleDict);

  // 尝试生成 key: message 对应的报错信息
  let generatedMessages: { [x: string]: string } = {};

  transformErrorFieldMessages(err.data?.errorFields || [], config.fieldLocaleDict).forEach((info) => {
    generatedMessages[info.field] = info.message;
  });
  if (Object.keys(generatedMessages).length === 0) {
    // 设置为空方便后续判断
    generatedMessages = undefined;
  }
  config.acceptServerValidations?.(generatedMessages);

  /** 处理错误码对应的函数回调 */

  const code = err.code;
  const statusCode = err.originError.response?.status ?? 0;

  if (code != null) {
    let customErrorHandler = config.errorHandler?.[code];
    if (customErrorHandler) return customErrorHandler(err);

    let defaultErrorHandler = globalErrorCodeHandler[code];
    if (defaultErrorHandler) return defaultErrorHandler(err);
  }

  let customStatusHandler = config.statusCodeErrorHandler?.[statusCode];
  if (customStatusHandler) return customStatusHandler(err);

  let defaultStatusHandler = globalStatusCodeErrorHandler[statusCode];
  if (defaultStatusHandler) return defaultStatusHandler(err);
};

const rejectError = (error: AxiosError, config?: IJimuApiOption) => {
  const resp = error.response;
  const data = resp?.data;
  const code = data?.code || 0;
  const message = data?.message || data || resp?.statusText;
  const errorData = data?.data;
  const apiError = new ApiError(code, message, errorData, error);

  if (config?.isAutoHandleError !== false) {
    handleError(apiError, config);
  }

  return Promise.reject(apiError);
};

const performRequest = async (option: IJimuApiOption) => {
  const { isShowProgressBar = true } = option;

  // 兼容 endpoint 作为 url 属性使用
  option.url = option.url || option.endpoint;
  if (option.query) {
    option.params = Object.assign({}, option.params, option.query);
  }

  if (isShowProgressBar) {
    notifyRequestStart();
  }

  try {
    let response = await instance.request(option);
    return response.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.warn("Request canceled: ", option.method, option.url, err.message);
    } else {
      return rejectError(err, option);
    }
  } finally {
    if (isShowProgressBar) {
      notifyRequestDone();
    }
  }
};

export const get = async <T = any>(option: IJimuApiOption): Promise<T> => {
  option.method = "GET";
  return performRequest(option);
};

export const post = async <T = any>(option: IJimuApiOption): Promise<T> => {
  option.method = "POST";
  return performRequest(option);
};

export const put = async <T = any>(option: IJimuApiOption): Promise<T> => {
  option.method = "PUT";
  return performRequest(option);
};

export const del = async <T = any>(option: IJimuApiOption): Promise<T> => {
  option.method = "DELETE";
  return performRequest(option);
};

setApiDefaultConfig({ withCredentials: true });
