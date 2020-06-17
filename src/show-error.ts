import { ApiError, IErrorMessages, IApiErrorItem } from "./types";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";
import { globalErrorMessages, globalStatusCodeErrorMessages } from "./messages";
import { lingual } from "./lingual";

let emitAboutError = (err: string) => {
  if (err == null) {
    return;
  }
  JimuApisEventBus.emit(EJimuApiEvent.ErrorMessage, err);
};

export function showError(
  error: string | Error | ApiError,
  customErrorMessage: IErrorMessages,
  customStatusCodeErrorMessage: IErrorMessages,
  fieldsLocalesDict?: object
): void {
  if (error == null) {
    console.warn("called showError but error is null");
    return;
  }
  let message: string;
  if (typeof error === "string") {
    message = error;
  } else if (error instanceof ApiError) {
    message = humanizeError(error, customErrorMessage, customStatusCodeErrorMessage, fieldsLocalesDict) as string;
  } else if (error instanceof Error) {
    message = error.toString();
  } else {
    return console.error("don't know how to show error", error);
  }

  emitAboutError(message);
}

export function humanizeError(
  e: ApiError | Error,
  customErrorMessage: IErrorMessages,
  customStatusCodeErrorMessage: IErrorMessages,
  fieldsLocalesDict?: object
): string {
  if (e instanceof ApiError) {
    const code = e.code;
    const statusCode = e.originError.response?.status ?? 0;

    // 从 code 可以设定 false, 这样 message 最后就被关闭了, 这里可能执行 `false || null`

    // 用户配置的 code 对应的错误, 可能是 string | false | undefined
    let customMessageFromCode = code != null ? customErrorMessage[code] : null;
    if (customMessageFromCode === false) return null; // false 直接关闭提示
    if (customMessageFromCode) return customMessageFromCode;

    // 用户配置的 status 对应的错误, 可能是 string | false | undefined
    let costomMessageFromStatus = statusCode != null ? customStatusCodeErrorMessage[statusCode] : null;
    if (costomMessageFromStatus === false) return null; // false 直接关闭提示
    if (costomMessageFromStatus) return costomMessageFromStatus;

    // 可能情况, 提供了 error 属性(目前使用少)
    if (e.data?.error) {
      const messageId = e.data.error.messageId;
      let customMessage = messageId ? customErrorMessage[messageId] || globalErrorMessages[messageId] : null; // TODO confirm
      let messageFromError = customMessage || e.data.error.message || null;
      if (messageFromError) {
        return messageFromError;
      }
    }

    // 可能情况, 后端返回字段校验的错误, 部分用到, 需要前端拼接错误信息
    if (e.data?.errorFields && e.data?.errorFields.length > 0) {
      let concattedMessage = transformErrorFieldMessages(e.data.errorFields, fieldsLocalesDict)
        .map((info) => info.message)
        .join("\n");

      if (e.message) {
        return `${e.message}\n${concattedMessage}`;
      } else {
        return concattedMessage;
      }
    }

    // 配置在全局的 code 对应的错误
    let defaultMessageFromCode = code != null ? globalErrorMessages[code] : null;
    if (defaultMessageFromCode === false) return null; // false 直接关闭提示
    if (defaultMessageFromCode) return defaultMessageFromCode;

    // 配置在全局的 status 对应的错误
    let defaultMessageFromStatus = statusCode != null ? globalStatusCodeErrorMessages[statusCode] : null;
    if (defaultMessageFromStatus === false) return null; // false 直接关闭提示
    if (defaultMessageFromStatus) return defaultMessageFromStatus;

    // 默认的错误
    if (e.message) return e.message;
  }

  if (e instanceof Error) {
    return e.toString();
  }
}

/** TODO, 等待后端修复以后删掉 */
let correctFieldNameFromBackend = (x: string) => {
  return x[0].toLocaleLowerCase() + x.slice(1);
};

export let transformErrorFieldMessages = (errorFields: IApiErrorItem[], fieldsLocalesDict: object) => {
  return errorFields.map((info) => {
    let text = lingual[`validatorId_${info.messageId}`] as string;
    let field = correctFieldNameFromBackend(info.name);
    text = text.replace("$0", fieldsLocalesDict[field] || field);
    if (text) {
      info.messageParams.forEach((param, idx) => {
        if (idx > 0) {
          text = text.replace(`\$${idx}`, param as string);
        }
      });
      return { field, message: text };
    } else {
      console.warn("Unknown messageId", info);
      return { field, message: info.message };
    }
  });
};
