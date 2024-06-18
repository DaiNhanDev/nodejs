export const ROLE_SHOP = {
  SHOP: "SHOP",
  WRITE: "WRITE",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

export type RoleType = keyof typeof ROLE_SHOP;
