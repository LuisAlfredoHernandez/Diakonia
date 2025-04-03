import Index from "~/views/cl/index.vue";
import ServicesIndex from "~/views/cl/servicios/index.vue";
import Services from "~/views/cl/servicios/services.vue";
import ServicesContractors from "~/views/cl/servicios/contractors.vue";
import ClientChat from "~/views/cl/servicios/chat.vue";

import { RouterNames } from "~/enums/routerNames";
import { UserTypeEnum } from "~/enums";

const allowed = [
  UserTypeEnum.ADMIN_LAST_MILE_INSTALLER,
  UserTypeEnum.ADMIN_EXTERNAL_INSTALLER,
  UserTypeEnum.ADMIN_SELLER,
];

export default [
  {
    path: "/cliente",
    name: RouterNames.CLIENT_HOME,
    components: {
      default: Index,
    },
    redirect: "/cliente/servicios",
    meta: {
      title: "servicios",
      requiredAuth: true,
      allowed: allowed,
    },
    children: [
      {
        path: "servicios",
        name: RouterNames.CLIENT_SERVICIOS,
        components: {
          default: ServicesIndex,
        },
        children: [
          {
            path: "",
            name: RouterNames.CLIENT_CONTRATISTA_BASE,
            component: Services,
            meta: {
              title: "contratista",
              requiredAuth: true,
              allowed: allowed,
            },
          },
          {
            path: "contratista",
            name: RouterNames.CLIENT_CONTRATISTA,
            component: ServicesContractors,
            meta: {
              title: "contratista",
              requiredAuth: true,
              allowed: allowed,
            },
          },
          {
            path: "chat/:id",
            name: RouterNames.CLIENT_CONTRATISTA_CHAT,
            component: ClientChat,
            props: true,
            meta: {
              title: "chat",
              requiredAuth: true,
              allowed: allowed,
            },
          },
        ],
      },
    ],
  },
];
