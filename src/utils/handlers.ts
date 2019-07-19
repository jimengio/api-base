import { IErrorHandler } from "./types";
import { BuiltinApiErrorCode } from "./codes";
import { JimuApisEventBus, JimuApisEvent } from "./event-bus";

export const defaultErrorHandler: IErrorHandler = {
  [BuiltinApiErrorCode.Unauthorized]: () => {
    // 需要调用
    // gotoSignin(signinPath, location.href);
    JimuApisEventBus.emit(JimuApisEvent.ErrorGotoSignin);
  },
};

export let errorHandler = defaultErrorHandler;

export function setErrorHandler(customErrorHandler: IErrorHandler, isMergeWithDefault = true) {
  if (isMergeWithDefault) {
    Object.assign(errorHandler, customErrorHandler);
  } else {
    errorHandler = customErrorHandler;
  }
}

export const defaultStatusCodeErrorHandler: IErrorHandler = {
  [BuiltinApiErrorCode.Unauthorized]: () => {
    // 需要调用
    // gotoSignin(signinPath, location.href);
    JimuApisEventBus.emit(JimuApisEvent.ErrorGotoSignin);
  },
};

export let statusCodeErrorHandler = defaultStatusCodeErrorHandler;

export function setStatusCodeErrorHandler(customStatusCodeErrorHandler: IErrorHandler, isMergeWithDefault = true) {
  if (isMergeWithDefault) {
    Object.assign(statusCodeErrorHandler, customStatusCodeErrorHandler);
  } else {
    statusCodeErrorHandler = customStatusCodeErrorHandler;
  }
}
