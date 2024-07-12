import { isEmpty } from '@core/core.utils';
import { BadRequestException } from '@nestjs/common';
import { User } from '@auth/auth.types';

export class BaseService {
  private _user: User;

  setUser(user: User) {
    this._user = user;
  }

  get user() {
    if (!this._user) {
      const errMsg = `The 'user' is undefined(not authenticated). Invoke ${this.constructor.name}.setUser(user) in the controller. Make sure the route isn't public`;
      throw new Error(errMsg);
    }
    return this._user;
  }

  handleMissingUpdateValues(dto: any) {
    if (isEmpty(dto)) throw new BadRequestException('Missing update values');
  }
}
