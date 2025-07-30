export interface Account {
  rawLabel: string;
  label: { text: string }[];
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
}

export interface ValidationErrors {
  label?: boolean;
  type?: boolean;
  login?: boolean;
  password?: boolean;
}
