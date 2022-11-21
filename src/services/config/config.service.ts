import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import type { IConfigVo } from "./config.vo";

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService<IConfigVo>) {}

  get<T extends keyof IConfigVo>(key: T): IConfigVo[T] {
    return this.nestConfigService.get(key);
  }
}
