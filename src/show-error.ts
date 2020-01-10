import { ApiError, IErrorMessages } from "./types";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";
import { globalErrorMessages, globalStatusCodeErrorMessages } from "./messages";

let emitAboutError = (err: string) => {
  if (err == null) {
    return;
  }
  JimuApisEventBus.emit(EJimuApiEvent.ErrorMessage, err);
};

export function showError(
  error: string | Error | ApiError,
  customErrorMessage: IErrorMessages = globalErrorMessages,
  customStatusCodeErrorMessage: IErrorMessages = globalStatusCodeErrorMessages
): void {
  if (error == null) {
    return;
  }
  if (typeof error === "string") {
    emitAboutError(error);
  } else if (error instanceof ApiError) {
    emitAboutError(humanizeError(error, customErrorMessage, customStatusCodeErrorMessage) as string);
    emitAboutError;
  } else if (error instanceof Error) {
    emitAboutError(error.toString());
  }
}

interface IFieldError {
  field: string;
  namespace: string; // 如果你需要用到深层错误处理，那么写一个函数去处理到field上
  error: string;
}

export function humanizeError(
  e: ApiError | Error,
  customErrorMessage: IErrorMessages = globalErrorMessages,
  customStatusCodeErrorMessage: IErrorMessages = globalStatusCodeErrorMessages
): string | IFieldError[] {
  if (e instanceof ApiError) {
    if (e.data && e.data.error) {
      let message: string;
      const messageId = e.data.error.messageId;

      if (messageId) {
        const humanizeMessage = customErrorMessage[messageId];

        if (humanizeMessage) {
          message = humanizeMessage;
        }
      } else if (e.data.error.message) {
        message = e.data.error.message;
      }
      return message || null;
    } else if (e.data && e.data.errorFields) {
      const messageArr = [];

      e.data.errorFields.forEach((item) => {
        const messageId = item.messageId;

        if (messageId) {
          messageArr.push({
            field: item.name,
            namespace: item.nameSpace,
            message: customErrorMessage[messageId],
          });
        } else if (item.message) {
          messageArr.push({
            field: item.name,
            namespace: item.nameSpace,
            message: item.message,
          });
        }
      });

      return messageArr;
    } else {
      let message: string | false;
      const code = e.code;
      const statusCode = e.originError.response ? e.originError.response.status : 0;

      if (code != null) {
        message = customErrorMessage[code];
      }

      if (message == null && statusCode != null) {
        message = customStatusCodeErrorMessage[statusCode];
      }

      if (message == null) {
        message = e.message;
      }
      // 从 code 可以设定 false, 这样 message 最后就被关闭了, 这里可能执行 `false || null`
      return message || null;
    }
  }

  if (e instanceof Error) {
    return e.toString();
  }
}
