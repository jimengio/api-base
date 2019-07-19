import EventEmitter from "eventemitter3";

export let JimuApisEventBus = new EventEmitter();

export enum JimuApisEvent {
  Inc = "inc",
  Done = "done",

  // 原来对外部调用的一些依赖, 暂时改成使用事件
  ErrorUnauthorized = "error-unauthorized",
  ErrorMessage = "error-message",
  ErrorGotoSignin = "error-goto-signin",
}
