import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { ApiError, IJimuApiOption } from "./types";
import { globalErrorMessages, globalStatusCodeErrorMessages } from "./messages";
import { errorHandler, statusCodeErrorHandler } from "./handlers";
import { UrlModel } from "@jimengio/url-model";
import { showError } from "./show-error";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";
import Qs from "qs";

const instance = axios.create();
const CancelToken = axios.CancelToken;

let pendingRequestCount = 0;

function notifyRequestStart() {
  pendingRequestCount++;
  JimuApisEventBus.emit(EJimuApiEvent.Inc);
}

function notifyRequestDone() {
  pendingRequestCount--;
  if (pendingRequestCount === 0) {
    JimuApisEventBus.emit(EJimuApiEvent.Done);
  }
}

export function setApiBaseUrl(baseUrl: string) {
  const url = new UrlModel(baseUrl);
  instance.defaults.baseURL = url.toString();
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
  if (err.isUnauthorized) {
    // 原来有个调用, 去耦合
    // clearUserInfoCache();

    JimuApisEventBus.emit(EJimuApiEvent.ErrorUnauthorized);
  }

  const code = err.code;
  const statusCode = err.originError.response ? err.originError.response.status : 0;

  const customErrorMessage = config && config.errorMessage;
  const customStatusCodeErrorMessage = config && config.statusCodeErrorMessage;
  const errorMessageMap = Object.assign({}, globalErrorMessages, customErrorMessage);
  const statusCodeErrorMessageMap = Object.assign({}, globalStatusCodeErrorMessages, customStatusCodeErrorMessage);

  // errorMessageMap[code] might be set false to prevent showing messages
  showError(err, errorMessageMap, statusCodeErrorMessageMap);

  const customErrorHandler = config && config.errorHandler;
  const customStatusCodeErrorHandler = config && config.statusCodeErrorHandler;
  const errorHandlerMap = Object.assign({}, errorHandler, customErrorHandler);
  const statusCodeErrorHandlerMap = Object.assign({}, statusCodeErrorHandler, customStatusCodeErrorHandler);

  let handler;

  if (code != null) {
    handler = errorHandlerMap[code];
  }

  if (handler === undefined && statusCode != null) {
    handler = statusCodeErrorHandlerMap[statusCode];
  }

  if (handler !== false) {
    if (typeof handler === "function") {
      handler(err);
    }
  }
};

const rejectError = (error: AxiosError, config?: IJimuApiOption) => {
  const resp = error.response;
  const data = resp && resp.data;
  const code = (data && data.code) || 0;
  const message = (data && data.message) || (data && data.Message) || data || (resp && resp.statusText);
  const errorData = data && data.data;
  const apiError = new ApiError(code, message, errorData, error);

  let isAutoHandleError = true;
  if (config && config.isAutoHandleError === false) {
    isAutoHandleError = false;
  }

  if (isAutoHandleError) handleError(apiError, config);

  return Promise.reject(apiError);
};

const handleSuccess = (resp: AxiosResponse, option: IJimuApiOption) => {
  const { isShowProgressBar = true } = option;

  if (isShowProgressBar) {
    notifyRequestDone();
  }

  return resp.data;
};

const handleFailed = (error: AxiosError, option: IJimuApiOption) => {
  const { isShowProgressBar = true } = option;

  if (isShowProgressBar) {
    notifyRequestDone();
  }

  return rejectError(error, option);
};

const beforeRequest = (method: Method, option: IJimuApiOption) => {
  option.url = option.url || option.endpoint;
  if (option.query) option.params = Object.assign({}, option.params, option.query);
  option.method = option.method || method;

  const { isShowProgressBar = true } = option;

  if (isShowProgressBar) {
    notifyRequestStart();
  }
};

const doRequest = async (method: Method, option: IJimuApiOption) => {
  beforeRequest(method, option);

  try {
    let response = await instance.request(option);
    return handleSuccess(response, option);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.warn("Request canceled: ", err.message);
    } else {
      return handleFailed(err, option);
    }
  }
};

export const get = async <T = any>(option: IJimuApiOption): Promise<T> => {
  return doRequest("get", option);
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

  return doRequest("get", option);
};

export const post = async <T = any>(option: IJimuApiOption): Promise<T> => {
  return doRequest("post", option);
};

export const put = async <T = any>(option: IJimuApiOption): Promise<T> => {
  return doRequest("put", option);
};

export const del = async <T = any>(option: IJimuApiOption): Promise<T> => {
  return doRequest("delete", option);
};

setApiDefaultConfig({ withCredentials: true });
