export interface UserInterface {
  create: (
    username: string,
    email: string,
    password: string,
  ) => Promise<Record<string, string>>;
  get: () => Record<string, string>;
  getById: (id: string) => Promise<Record<string, string>>;
  update: (
    id: string,
    username: string,
    password: string
  ) => Promise<Record<string, string>>;
  delete: (id: string) => Promise<Record<string, string>>;
}


