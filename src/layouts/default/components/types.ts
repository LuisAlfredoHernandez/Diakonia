import type { UserInfo } from "#/store";
import { UserTypeEnum } from "~/enums/userTypeEnum";

export interface ItemProps {
  to: string;
  title: string;
  allowed?: string;
  allowedList?: UserTypeEnum[];
}

export interface GroupItemProps {
  title: string;
  items: ItemProps[];
  allowed?: string;
  allowedList?: UserTypeEnum[];
}

export const showFn = (
  { allowed, allowedList }: GroupItemProps | ItemProps,
  user: UserInfo
) => {
  return (
    user.is_superuser ||
    (allowed && allowed === "*") ||
    allowedList?.includes(user.user_type)
  );
};

export const showChildFn = (
  parent: GroupItemProps,
  child: ItemProps,
  user: UserInfo
) => {
  if (user.is_superuser) return true;

  if (child.allowed || child.allowedList) {
    return (
      (child.allowed && child.allowed === "*") ||
      child.allowedList?.includes(user.user_type)
    );
  }

  return showFn(parent, user);
};
