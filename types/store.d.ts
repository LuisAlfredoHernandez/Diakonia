import { UserTypeEnum } from "~/enums/userTypeEnum";
import { ModuleTypeEnum } from "~/enums/moduleTypesEnum";
import { ElementStateEnum, ElementTypeEnum } from "~/enums/genericEnums";

export interface UserInfo {
  id?: number;
  avatar_url?: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  user_type: UserTypeEnum;
  password: string;
  hashed_password?: string;
  image_url?: string;
}

export interface Product {
  id: number | null;
  name?: string;
  price: number;
  description?: string;
  category?: string;
  installer_product_id?: [number, string];
}

export interface Customer {
  id: number;
  name: string;
  user_id: number;
  last_name: string;
  nationality: string;
  identity_card: string;
  rnc: string;
  email: string;
  phone: string;
  is_contact: boolean;
  is_customer: boolean;
  odoo_id: number;
  site: string;
  sector: string;
}

export interface Contact {
  id?: number;
  user_id: number;
  name: string;
  last_name: string;
  phone: string;
  site: string;
  sector: string;
}

export interface Address {
  phone: string;
  address: string;
  street: string;
  number: string;
  site: string;
  sector: string;
  municipality: string;
  province: string;
}

export interface CloseContact {
  nationality: string;
  identity_card: string;
  email: string;
  rnc: string;
  addr: Address;
}

export interface Order {
  id: number;
  total_amount: number;
  customer_id: number;
  customer: Customer;
  user_id: number;
  odoo_id: number;
}

export interface GeneralGoal {
  id?: int;
  kpi_id: int;
  from_date: datetime;
  to_date: datetime;
  accumulated: float;
  goal: float;
  goal_users: GoalUser[];
  is_active: boolean;
}

export interface GoalUser {
  accumulated: int;
  general_goal_id: int;
  id?: int;
  goal: float;
  from_date: datetime;
  to_date: datetime;
  user_id: int;
  editable?: boolean;
  is_active: boolean;
  status: boolean;
}

export interface KpiName {
  id?: int;
  name: string;
  code: string;
  module: ModuleTypeEnum;
  editable?: boolean;
  is_active?: boolean;
}

export interface NetworkElements {
  id?: int;
  code: string;
  element_code: string;
  central_code?: string;
  latitude?: number;
  longitude?: number;
  state: ElementStateEnum;
  element_type: ElementTypeEnum;
}
