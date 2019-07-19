import { ILang } from "./interface";
import _ from "lodash";

import { zhCN } from "./zh-cn";
import { enUS } from "./en-us";

export enum EApisLangKind {
  zhCN = "zhCN",
  enUS = "enUS",
}

// 默认处于中文
export let lingual: ILang = zhCN;
export let langKind = EApisLangKind.zhCN;

export const changeApisLingual = (kind: EApisLangKind) => {
  console.info("choosing language:", kind);

  switch (kind) {
    case EApisLangKind.zhCN:
      lingual = zhCN; // same as lang
      break;
    case EApisLangKind.enUS:
      lingual = enUS; // same as lang
      break;
    default:
      console.warn(`Unknown language: ${kind}! Defaults to zhCN`);
      lingual = zhCN; // same as lang
  }
};
