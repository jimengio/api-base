import { AxiosError, AxiosRequestConfig, CancelTokenSource, CancelToken } from "axios";
import { BuiltinApiErrorCode } from "./codes";
import { EBackendErrorMessageId } from "./backend-message-id";

export interface IErrorMessages {
  [key: number]: string | false;
}

export interface IErrorHandler {
  [key: number]: ((err: ApiError) => void) | false;
}

export interface IJimuApiOption extends AxiosRequestConfig {
  url?: string;
  /** 别名, 对应 url. 老代码主要使用的是 endpoint */
  endpoint?: string;
  query?: object;
  isAutoHandleError?: boolean;
  isShowProgressBar?: boolean;
  errorMessage?: IErrorMessages;
  /** field->文案 映射 */
  fieldLocaleDict?: { [k in string]: string };
  /** 获取服务端校验信息 */
  acceptServerValidations?: (messages: { [k in string]: string }) => void;
  statusCodeErrorMessage?: IErrorMessages;
  errorHandler?: IErrorHandler;
  statusCodeErrorHandler?: IErrorHandler;
}

export interface IApiErrorItem {
  name: string;
  nameSpace: string;
  type: string;
  value: string;
  message: string;
  messageId: EBackendErrorMessageId; // 后端定义的规则, 文案自动处理
  messageParams: (string | number | boolean)[];
}

export interface IApiErrorData {
  error?: IApiErrorItem;
  errorFields?: IApiErrorItem[];
}

export class ApiError extends Error {
  code: number;
  message: string;
  data?: IApiErrorData;
  originError: AxiosError;

  constructor(code: number, message: string, data: IApiErrorData, originError: AxiosError) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.code = code;
    this.message = message;
    this.data = data;
    this.originError = originError;
  }

  isUnauthorized(): boolean {
    return this.code === BuiltinApiErrorCode.Unauthorized;
  }
}

/** api cancel source */
export interface ApiCancelTokenSource extends CancelTokenSource {}

/** api cancel token */
export interface ApiCancelToken extends CancelToken {}
