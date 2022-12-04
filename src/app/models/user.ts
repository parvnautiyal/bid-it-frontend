export class User {
  constructor(public username: string,
              public password: string,
              public name: string,
              public email: string,
              public contact: string,
              public roles: Roles[]) {}
}

export interface Roles {
  roleDescription: string
  roleName: string,
}
