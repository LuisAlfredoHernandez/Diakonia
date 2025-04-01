import { UserTypeEnum } from "@/enums/userTypeEnum";

export {};

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title: string;
    allowed?: UserTypeEnum[];
  }
}
