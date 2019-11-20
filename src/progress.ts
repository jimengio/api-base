import { EJimuApiEvent, JimuApisEventBus } from "./event-bus";

let pendingRequestCount = 0;

export function notifyRequestStart() {
  pendingRequestCount++;
  JimuApisEventBus.emit(EJimuApiEvent.Inc);
}

export function notifyRequestDone() {
  pendingRequestCount--;
  if (pendingRequestCount === 0) {
    JimuApisEventBus.emit(EJimuApiEvent.Done);
  }
}
