import { Role } from '../role/role.constants';

export type JWTPayload = {
  sub: number;
  role: Role;
  phoneNumber: string;
  escoName?: string;
  firstName?: string;
  lastName?: string;
};

export class User {
  id: number;
  role: Role;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  escoName?: string;

  get fullName() {
    switch (this.role) {
      case Role.ESCO:
        return this.escoName;
      case Role.FARMER:
        return `${this.firstName} ${this.lastName}`;
      default:
        throw new Error('Invalid role');
    }
  }

  isEsco() {
    return this.role === Role.ESCO;
  }

  isFarmer() {
    return this.role === Role.FARMER;
  }
}
