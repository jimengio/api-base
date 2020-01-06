import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { ApiError, IJimuApiOption } from "./types";
import { globalErrorMessages, globalStatusCodeErrorMessages } from "./messages";
import { globalErrorCodeHandler, globalStatusCodeErrorHandler } from "./handlers";
import { showError } from "./show-error";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";
import Qs from "qs";
import { notifyRequestStart, notifyRequestDone } from "./progress";

const instance = axios.create();
const CancelToken = axios.CancelToken;

export function setApiBaseUrl(baseUrl: string) {
  instance.defaults.baseURL = baseUrl;
}

export function getApiBaseUrl() {
  return instance.defaults.baseURL;
}

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

  /** 处理错误码的消息提示 */

  const errorMessageMap = Object.assign({}, globalErrorMessages, config.errorMessage);
  const statusCodeErrorMessageMap = Object.assign({}, globalStatusCodeErrorMessages, config.statusCodeErrorMessage);

  // errorMessageMap[code] might be set false to prevent showing messages
  showError(err, errorMessageMap, statusCodeErrorMessageMap);

  /** 处理错误码对应的函数回调 */

  const code = err.code;
  const statusCode = err.originError.response ? err.originError.response.status : 0;
  let handler: ((err: ApiError) => void) | false;

  if (code != null) {
    handler = config.errorHandler?.[code] || globalErrorCodeHandler[code];
  }

  if (handler == undefined && statusCode != null) {
    handler = config.statusCodeErrorHandler?.[statusCode] || globalStatusCodeErrorHandler[statusCode];
  }

  if (handler !== false) {
    if (typeof handler === "function") {
      handler(err);
    }
  }
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

/**
 * parse object params
 *
 * query: obj = {a: 1, b: 2} -> obj[a]=1&obj[b]=2
 * @param option
 */
export const getWithNestedParams = async (option: IJimuApiOption) => {
  option.paramsSerializer = function(params) {
    return Qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });
  };

  return get(option);
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
