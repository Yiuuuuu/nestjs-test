import { plainToInstance } from "class-transformer";

import { TranslationVo } from "./translation.vo";

export function convertPojoToTranslationVo(val: Record<string, string>): TranslationVo {
  return plainToInstance(TranslationVo, {
    en: val.en ?? "",
    "zh-HK": val["zh-HK"] ?? "",
    ja: val.ja ?? "",
    ko: val.ko ?? "",
  });
}

export function convertTranslationVoToPojo(val: TranslationVo): Record<string, string> {
  return { ...val };
}
