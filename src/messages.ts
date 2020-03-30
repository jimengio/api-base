import { IErrorMessages } from "./types";
import { BuiltinApiErrorCode } from "./codes";
import { lingual } from "./lingual/index";

const defaultErrorMessages: IErrorMessages = {
  [BuiltinApiErrorCode.Unkown]: lingual.lblUnknownError,

  [BuiltinApiErrorCode.BadRequest]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.NotFound]: lingual.lblDataNotFound,
  [BuiltinApiErrorCode.Unauthorized]: lingual.lblUnauthorized,
  [BuiltinApiErrorCode.Forbidden]: lingual.lblNoPermission,
  [BuiltinApiErrorCode.RequestTimeout]: lingual.lblRequestTimeout,
  [BuiltinApiErrorCode.InternalServerError]: lingual.lblServerError,
  [BuiltinApiErrorCode.DBDup]: lingual.lblDBDup,
  [BuiltinApiErrorCode.DBInternalError]: lingual.lblDBInternalError,
  [BuiltinApiErrorCode.DBDeadLockError]: lingual.lblDBDeadLockError,

  [BuiltinApiErrorCode.IOError]: lingual.IOError,
  [BuiltinApiErrorCode.ApiAuthInvalidHeader]: lingual.authInvalidHeader,
  [BuiltinApiErrorCode.ApiAuthInvalidToken]: lingual.authInvalidToken,
  [BuiltinApiErrorCode.ApiAuthInvalidType]: lingual.authInvalidType,
  [BuiltinApiErrorCode.ApiAuthInvalidInfo]: lingual.invalidAuthorizationInfo,
  [BuiltinApiErrorCode.ApiAuthExpiredToken]: lingual.authExpiredToken,
  [BuiltinApiErrorCode.ApiAuthUserNotFound]: lingual.authUserNotFound,
  [BuiltinApiErrorCode.ApiAuthNeedSSL]: lingual.authNeedSSL,
  [BuiltinApiErrorCode.ApiAuthInActived]: lingual.authInActived,
  [BuiltinApiErrorCode.ApiAuthCreateFailed]: lingual.authCreateFailed,
  [BuiltinApiErrorCode.ApiAuthWrongSuInfo]: lingual.authWrongSuInfo,
  [BuiltinApiErrorCode.ApiAuthSuNoPerm]: lingual.authSuNoPerm,
  [BuiltinApiErrorCode.ApiAuthEnterpriseFailed]: lingual.authEnterpriseFailed,
  [BuiltinApiErrorCode.AuthTypeNotSupport]: lingual.authTypeNotSupport,
  [BuiltinApiErrorCode.AuthInfoInvalid]: lingual.invalidAuthorizationInfo,
  [BuiltinApiErrorCode.AuthCodeInvalid]: lingual.authCodeInvalid,
  [BuiltinApiErrorCode.AuthTimesExceedLimit]: lingual.authTimesExceedLimit,
  [BuiltinApiErrorCode.PleaseWaitAMoment]: lingual.pleaseWaitAMoment,
  [BuiltinApiErrorCode.AlreadyBinded]: lingual.userMobileAlreadyBinded,
  [BuiltinApiErrorCode.UsedByOthers]: lingual.userMobileUsedByOthers,
  [BuiltinApiErrorCode.ActivateCodeInvalid]: lingual.activateCodeInvalid,
  [BuiltinApiErrorCode.ActivateCodeAlreadyUsed]: lingual.activateCodeAlreadyUsed,
  [BuiltinApiErrorCode.NeedBind]: lingual.userMobileNeedBind,
  [BuiltinApiErrorCode.DiagnoseModelUpdate]: lingual.diagnoseModelUpdate,
  [BuiltinApiErrorCode.CommandExecution]: lingual.commandExecution,
  [BuiltinApiErrorCode.RegionContainsContent]: lingual.regionContainsContent,
  [BuiltinApiErrorCode.ErrEnterpriseExpired]: lingual.enterpriseExpiredErrorInfo,
};

export let globalErrorMessages = defaultErrorMessages;

export function addGloablErrorMessages(customErrorMessage: IErrorMessages, overwrite = true) {
  if (overwrite) {
    Object.assign(globalErrorMessages, customErrorMessage);
  } else {
    globalErrorMessages = customErrorMessage;
  }
}
const defaultStatusCodeErrorMessages: IErrorMessages = {
  [BuiltinApiErrorCode.BadRequest]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.Unauthorized]: lingual.lblUnauthorized,
  [BuiltinApiErrorCode.PaymentRequired]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.Forbidden]: lingual.lblNoPermission,
  [BuiltinApiErrorCode.NotFound]: lingual.lblDataNotFound,
  [BuiltinApiErrorCode.MethodNotAllowed]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.NotAcceptable]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.ProxyAuthRequired]: lingual.lblNoPermission,
  [BuiltinApiErrorCode.RequestTimeout]: lingual.lblRequestTimeout,
  [BuiltinApiErrorCode.Conflict]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.Gone]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.LengthRequired]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.PreconditionFailed]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.RequestEntityTooLarge]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.RequestURITooLong]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.UnsupportedMediaType]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.RequestedRangeNotSatisfiable]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.ExpectationFailed]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.Teapot]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.UnprocessableEntity]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.Locked]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.FailedDependency]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.UpgradeRequired]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.PreconditionRequired]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.TooManyRequests]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.RequestHeaderFieldsTooLarge]: lingual.lblBadRequest,
  [BuiltinApiErrorCode.UnavailableForLegalReasons]: lingual.lblBadRequest,

  [BuiltinApiErrorCode.InternalServerError]: lingual.lblServerError,
  [BuiltinApiErrorCode.NotImplemented]: lingual.lblServerError,
  [BuiltinApiErrorCode.BadGateway]: lingual.lblServerError,
  [BuiltinApiErrorCode.ServiceUnavailable]: lingual.lblServerError,
  [BuiltinApiErrorCode.GatewayTimeout]: lingual.lblRequestTimeout,
  [BuiltinApiErrorCode.HTTPVersionNotSupported]: lingual.lblServerError,
  [BuiltinApiErrorCode.VariantAlsoNegotiates]: lingual.lblServerError,
  [BuiltinApiErrorCode.InsufficientStorage]: lingual.lblServerError,
  [BuiltinApiErrorCode.LoopDetected]: lingual.lblServerError,
  [BuiltinApiErrorCode.NotExtended]: lingual.lblServerError,
  [BuiltinApiErrorCode.NetworkAuthenticationRequired]: lingual.lblServerError,

  [BuiltinApiErrorCode.Unkown]: lingual.lblUnknownError,
  [BuiltinApiErrorCode.DBDup]: lingual.lblDBDup,
  [BuiltinApiErrorCode.DBInternalError]: lingual.lblDBInternalError,
  [BuiltinApiErrorCode.DBDeadLockError]: lingual.lblDBDeadLockError,

  [BuiltinApiErrorCode.NoConnectionToServer]: lingual.noConnectionToServer,
};

export let globalStatusCodeErrorMessages = defaultStatusCodeErrorMessages;

export function addGlobalStatusCodeErrorMessages(customStatusCodeErrorMessage: IErrorMessages, overwrite = true) {
  if (overwrite) {
    Object.assign(globalErrorMessages, customStatusCodeErrorMessage);
  } else {
    globalErrorMessages = customStatusCodeErrorMessage;
  }
}
