import { ILang } from "./interface";
export const zhCN: ILang = {
  "validatorId_gt.datetime": "{0}必须包含有效的CIDR表示法",
  "validatorId_gt.items-item.one": "{0}必须是可解析的IPv6地址",
  "validatorId_gt.items-item.other": "{0}必须是可解析的IP地址",
  "validatorId_gt.number": "{0}必须是有效的ISBN号",
  "validatorId_gt.string-character.one": "{0}必须大于或等于当前的日期和时间",
  "validatorId_gt.string-character.other": "{0}必须至少包含{1}个项目",
  "validatorId_gte.datetime": "{0}必须是有效的IPv4 UDP地址",
  "validatorId_gte.items-item.one": "{0}必须是有效的UUID",
  "validatorId_gte.items-item.other": "{0}必须是有效的版本3 UUID",
  "validatorId_gte.number": "{0}必须小于或等于{1}",
  "validatorId_gte.string-character.one": "{0}必须是有效的IPv6 TCP地址",
  "validatorId_gte.string-character.other": "{0}必须是有效的IPv4 TCP地址",
  "validatorId_len.items-item.one": "{0}必须是有效的数值",
  "validatorId_len.items-item.other": "{0}必须是有效数字",
  "validatorId_len.number": "{0}必须包含多字节字符",
  "validatorId_len.string-character.one": "{0}必须至少包含{1}个项目",
  "validatorId_len.string-character.other": "{0}的最大长度为{1}个字符",
  "validatorId_lt.datetime": "{0}必须包含文字“ {1}”",
  "validatorId_lt.items-item.one": "{0}不能包含以下任何字符“ {1}”",
  "validatorId_lt.items-item.other": "{0}不能包含以下“ {1}”",
  "validatorId_lt.number": "{0}不应等于{1}",
  "validatorId_lt.string-character.one": "{0}必须大于{1}",
  "validatorId_lt.string-character.other": "{0}必须包含超过{1}个项目",
  "validatorId_lte.datetime": "{0}是无效字段",
  "validatorId_lte.items-item.one": "{0}必须等于{1}",
  "validatorId_lte.items-item.other": "{0}必须包含{1}个项目",
  "validatorId_lte.number": "{0}必须是可解析的IPv4地址",
  "validatorId_lte.string-character.one": "{0}最多包含{1}个项目",
  "validatorId_lte.string-character.other": "{0}最多包含{1}个项目",
  "validatorId_max.items-item.one": "{0}必须仅包含可打印的ASCII字符",
  "validatorId_max.items-item.other": "{0}是必填字段",
  "validatorId_max.number": "{0}必须是有效的网址",
  "validatorId_max.string-character.one": "{0}必须等于{1}",
  "validatorId_max.string-character.other": "{0}不能包含文本“ {1}”",
  "validatorId_min.items-item.one": "{0}必须等于{1}",
  "validatorId_min.items-item.other": "{0}不等于{1}",
  "validatorId_min.number": "{0}必须大于{1}",
  "validatorId_min.string-character.one": "{0}必须小于或等于当前的日期和时间",
  "validatorId_min.string-character.other": "{0}必须小于{1}",
  activateCodeAlreadyUsed: "激活码已被使用",
  activateCodeInvalid: "不合法的激活码",
  authCodeInvalid: "验证码错误",
  authCreateFailed: "创建秘钥失败",
  authEnterpriseFailed: "企业信息验证失败",
  authExpiredToken: "秘钥已过期",
  authInActived: "认证未启用",
  authInvalidHeader: "请求头部没有认证信息",
  authInvalidToken: "无效秘钥",
  authInvalidType: "不合法的认证类型",
  authNeedSSL: "请使用https访问",
  authSuNoPerm: "没有权限模拟登陆",
  authTimesExceedLimit: "超过认证次数限制",
  authTypeNotSupport: "不支持该认证类型",
  authUserNotFound: "找不到用户信息",
  authWrongSuInfo: "模拟登陆信息不合法",
  cannotHaveTheSameNameAsTheParentRegion: "无法与父级区域同名！",
  categoryShouldNotBeDeleted: "类型不应该被删除",
  commandExecution: "执行命令失败",
  diagnoseModelUpdate: "贝叶斯模型更新失败",
  enterpriseExpiredErrorInfo: "您所在企业已经超过许可日期限制，需要续费后才能继续使用.",
  handlerNotSet: "处理函数未设置",
  inspectionMethodReferencedNotDeleted: "该检验方法已被检查项引用，请先修改相关检查项！",
  insufficientNumberOfOrdersCanBeGenerated: "可生成的单号不足，请修改编号规则！",
  invalidAuthorizationInfo: "账号或密码错误",
  IOError: "输入输出错误",
  lblBadRequest: "无效请求",
  lblDataNotFound: "资源未找到",
  lblDBDeadLockError: "数据库死锁",
  lblDBDup: "数据已存在",
  lblDBInternalError: "数据库错误",
  lblNoPermission: "无权访问",
  lblRequestTimeout: "请求超时",
  lblServerError: "服务器内部错误",
  lblUnauthorized: "请登录",
  lblUnknownError: "未知错误",
  noConnectionToServer: "无法访问到服务器",
  orderHandlerDuplicate: "处理者有重复",
  orderItemAmountOrPriceEmpty: "内容数量为空或者单位价格为空",
  orderItemsEmpty: "订单内容未设置",
  orderNotWorking: "订单不在工作过程当中",
  orderNumberAlreadyExists: "该单号已存在",
  orderSnEmpty: "订单序列号必填",
  orderUserIdsEmpty: "用户 ID 不可以为空",
  pleaseWaitAMoment: "请等待",
  regionContainsContent: "区域包含内容（下级区域或者库存物料）, 不可以删除",
  sequenceRuleConflicted: "序列号规则发生冲突",
  sequenceRuleInvalid: "编号规则不合法",
  sequenceRuleNotFound: "编号规则未找到",
  systemUnitProhibitsModification: "系统单位禁止修改",
  theWarehouseHasASubareaThatCannotBeDeleted: "仓库存在子区域无法删除!",
  unitNotSet: "单位未设置",
  userMobileAlreadyBinded: "手机号已被绑定",
  userMobileNeedBind: "需要绑定手机",
  userMobileUsedByOthers: "手机号已被其他账号使用",
  validatorId_alpha: "{0}的长度必须为{1}个字符",
  validatorId_alphanum: "{0}必须为{1}或更大",
  validatorId_ascii: "{0}的长度必须小于{1}",
  validatorId_cidr: "{0}必须小于或等于{1}",
  validatorId_cidrv4: "{0}的最大字符数为{1}",
  validatorId_cidrv6: "{0}必须大于当前的日期和时间",
  validatorId_contains: "{0}必须是有效的RGB颜色",
  validatorId_containsany: "{0}只能包含字母字符",
  validatorId_datauri: "{0}不能等于{1}",
  validatorId_email: "{0}的长度必须小于{1}",
  validatorId_eq: "{0}必须大于或等于{1}",
  validatorId_eqcsfield: "{0}必须是有效的IPv4地址",
  validatorId_eqfield: "{0}必须小于或等于{1}",
  validatorId_excludes: "{0}只能包含字母数字字符",
  validatorId_excludesall: "{0}必须包含有效的MAC地址",
  validatorId_excludesrune: "{0}必须包含少于{1}个项目",
  validatorId_gtcsfield: "{0}必须至少包含以下字符“ {1}”之一",
  validatorId_gtecsfield: "{0}必须是有效的十六进制",
  validatorId_gtefield: "{0}必须大于{1}",
  validatorId_gtfield: "{0}必须是有效的IPv6 UDP地址",
  validatorId_hexadecimal: "{0}必须小于或等于{1}",
  validatorId_hexcolor: "{0}必须是有效的十六进制颜色",
  validatorId_hsl: "{0}必须包含IPv6地址的有效CIDR表示法",
  validatorId_hsla: "{0}必须为{1}或更大",
  validatorId_ip4_addr: "{0}必须是有效的版本5 UUID",
  validatorId_ip6_addr: "{0}的长度必须至少为{1}个字符",
  validatorId_ip: "{0}必须包含有效的纬度坐标",
  validatorId_ip_addr: "{0}必须包含{1}个项目",
  validatorId_ipv4: "{0}的长度必须至少为{1}个字符",
  validatorId_ipv6: "{0}必须是有效的HSLA颜色",
  validatorId_isbn10: "{0}必须是有效的颜色",
  validatorId_isbn13: "{0}必须小于{1}",
  validatorId_isbn: "{0}必须是可解析的UNIX地址",
  validatorId_iscolor: "{0}的最大长度为{1}个字符",
  validatorId_latitude: "{0}必须是有效的RGBA颜色",
  validatorId_longitude: "{0}不能等于{1}",
  validatorId_ltcsfield: "{0}必须是有效的ISBN-10号",
  validatorId_ltecsfield: "{0}的长度字符必须大于{1}",
  validatorId_ltefield: "{0}必须包含少于{1}个项目",
  validatorId_ltfield: "{0}的长度必须为{1}",
  validatorId_mac: "{0}必须是有效的IPv6地址",
  validatorId_multibyte: "{0}必须是有效的电子邮件地址",
  validatorId_ne: "{0}必须小于当前的日期和时间",
  validatorId_necsfield: "{0}必须大于或等于{1}",
  validatorId_nefield: "{0}必须至少包含{1}个项目",
  validatorId_number: "{0}必须是有效的UDP地址",
  validatorId_numeric: "{0}必须包含IPv4地址的有效CIDR表示法",
  validatorId_printascii: "{0}必须是有效的TCP地址",
  validatorId_required: "{0}必须是有效的SSN号",
  validatorId_rgb: "{0}必须小于{1}",
  validatorId_rgba: "{0}必须包含有效的数据URI",
  validatorId_ssn: "{0}最多包含{1}个项目",
  validatorId_tcp4_addr: "{0}的长度必须至少为{1}个字符",
  validatorId_tcp6_addr: "{0}必须包含超过{1}个项目",
  validatorId_tcp_addr: "{0}必须是有效的IP地址",
  validatorId_udp4_addr: "{0}必须是有效的URI",
  validatorId_udp6_addr: "{0}必须是有效的版本4 UUID",
  validatorId_udp_addr: "{0}必须包含有效的经度坐标",
  validatorId_unix_addr: "{0}的长度必须至少为{1}个字符",
  validatorId_uri: "{0}必须是有效的HSL颜色",
  validatorId_url: "{0}必须至少包含{1}个项目",
  validatorId_username: "{0}必须仅包含ASCII字符",
  validatorId_uuid3: "{0}最多包含{1}个项目",
  validatorId_uuid4: "{0}的最大字符长度为{1}",
  validatorId_uuid5: "{0}必须是有效的ISBN-13数字",
  validatorId_uuid: "{0}的长度字符必须大于{1}",
  workflowNotFound: "流程未找到",
};
