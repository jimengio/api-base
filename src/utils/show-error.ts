import { globalErrorMessages, globalStatusCodeErrorMessages } from "./messages";
import { ApiError } from "./types";
import { JimuApisEventBus, JimuApisEvent } from "./event-bus";

export function showError(
  error: string | Error | ApiError,
  customErrorMessage = globalErrorMessages,
  customStatusCodeErrorMessage = globalStatusCodeErrorMessages
): void {
  let errorHumanized = "";

  if (error) {
    if (typeof error === "string") {
      errorHumanized = error;
    } else if (error instanceof ApiError) {
      errorHumanized = humanizeError(error, customErrorMessage, customStatusCodeErrorMessage) as string;
    } else if (error instanceof Error) {
      errorHumanized = error.toString();
    }
  }

  if (errorHumanized != null) {
    // 原来有个调用
    // message.error(errorHumanized);

    JimuApisEventBus.emit(JimuApisEvent.ErrorMessage, errorHumanized);
  }
}

interface IFieldError {
  field: string;
  namespace: string; // 如果你需要用到深层错误处理，那么写一个函数去处理到field上
  error: string;
}

export function humanizeError(
  e: ApiError | Error,
  customErrorMessage = globalErrorMessages,
  customStatusCodeErrorMessage = globalStatusCodeErrorMessages
): string | IFieldError[] {
  if (e instanceof ApiError) {
    let message: string | IFieldError[];

    if (e.data && e.data.error) {
      const messageId = e.data.error.messageId;

      if (messageId) {
        const humanizeMessage = customErrorMessage[messageId];

        if (humanizeMessage) {
          message = humanizeMessage;
        }
      } else if (e.data.error.message) {
        message = e.data.error.message;
      }
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

      message = messageArr;
    } else {
      const code = e.code;
      const statusCode = e.originError.response ? e.originError.response.status : 0;

      if (code) {
        message = customErrorMessage[code] as string;
      }

      if (message == null && statusCode) {
        message = customStatusCodeErrorMessage[statusCode] as string;
      }

      if (message == null) {
        message = e.message;
      }
    }

    return message;
  } else if (e instanceof Error) {
    return e.toString();
  }
}
