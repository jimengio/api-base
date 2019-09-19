import { IErrorHandler } from "./types";
import { BuiltinApiErrorCode } from "./codes";
import { JimuApisEventBus, EJimuApiEvent } from "./event-bus";

export const defaultErrorHandler: IErrorHandler = {
  [BuiltinApiErrorCode.Unauthorized]: () => {
    // 需要调用
    // gotoSignin(signinPath, location.href);
    JimuApisEventBus.emit(EJimuApiEvent.ErrorGotoSignin);
  },
};

export let globalErrorCodeHandler = defaultErrorHandler;

export function setErrorHandler(customErrorHandler: IErrorHandler, isMergeWithDefault = true) {
  if (isMergeWithDefault) {
    Object.assign(globalErrorCodeHandler, customErrorHandler);
  } else {
    globalErrorCodeHandler = customErrorHandler;
  }
}

export const defaultStatusCodeErrorHandler: IErrorHandler = {
  [BuiltinApiErrorCode.Unauthorized]: () => {
    // 需要调用
    // gotoSignin(signinPath, location.href);
    JimuApisEventBus.emit(EJimuApiEvent.ErrorGotoSignin);
  },
};

export let globalStatusCodeErrorHandler = defaultStatusCodeErrorHandler;

export function setStatusCodeErrorHandler(customStatusCodeErrorHandler: IErrorHandler, isMergeWithDefault = true) {
  if (isMergeWithDefault) {
    Object.assign(globalStatusCodeErrorHandler, customStatusCodeErrorHandler);
  } else {
    globalStatusCodeErrorHandler = customStatusCodeErrorHandler;
  }
}
