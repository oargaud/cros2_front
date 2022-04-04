import { Role } from './role';

export class Utilisateur{

  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  islocked: boolean;
  isvalidated: boolean;
  roles: Role[];

  constructor(){}

}

