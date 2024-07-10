import {
  isString,
  IsStrongPassword as _IsStrongPassword,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  AIRTEL_UG_REGEX,
  LYCA_UG_REGEX,
  MIN_LOWERCASE_IN_PASSWORD,
  MIN_PASSWORD_LENGTH,
  MIN_SYMBOLS_IN_PASSWORD,
  MIN_UPPERCASE_IN_PASSWORD,
  MTN_UG_REGEX,
} from '@core/core.constants';
import { isUGPhoneNumber } from '@core/core.utils';
import { EntityClass, EntityColumnName } from '@core/core.types';

@ValidatorConstraint({ async: true })
export class _IsUnique implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments: ValidationArguments) {
    if (!value) return false;
    const [entityClass, findByColumnName] = validationArguments.constraints;
    const whereOptions = { [findByColumnName]: value };
    const entity = await entityClass.findOneBy(whereOptions);
    return !entity;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} should be unique`;
  }
}

export const IsUnique = function <T>({
  entityClass,
  findByColumnName,
}: {
  entityClass: EntityClass<T>;
  findByColumnName: EntityColumnName<T>;
}) {
  return Validate(_IsUnique, [entityClass, findByColumnName]);
};

@ValidatorConstraint({ async: false })
export class _IsUGPhoneNumber implements ValidatorConstraintInterface {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, validationArguments: ValidationArguments) {
    if (!isString(value)) return false;
    return isUGPhoneNumber(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} should match ${MTN_UG_REGEX} or ${AIRTEL_UG_REGEX} or ${LYCA_UG_REGEX}`;
  }
}

export const IsUGPhoneNumber = () => {
  return Validate(_IsUGPhoneNumber);
};

export const IsStrongPassword = () => {
  const password_requirements = {
    minLength: MIN_PASSWORD_LENGTH,
    minLowercase: MIN_LOWERCASE_IN_PASSWORD,
    minUppercase: MIN_UPPERCASE_IN_PASSWORD,
    minSymbols: MIN_SYMBOLS_IN_PASSWORD,
  };
  const message = `Password doesn't meet the requirements: atleast ${MIN_PASSWORD_LENGTH} characters long, atleast ${MIN_LOWERCASE_IN_PASSWORD} lowercase letters, atleast ${MIN_UPPERCASE_IN_PASSWORD} uppercase letters, atleast ${MIN_SYMBOLS_IN_PASSWORD} symbols`;
  return _IsStrongPassword(password_requirements, { message });
};
