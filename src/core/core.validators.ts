import {
  isArray,
  isEmpty,
  isString,
  IsStrongPassword as _IsStrongPassword,
  Matches,
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
import { FindOptionsRelations, In } from 'typeorm';

@ValidatorConstraint({ async: true })
class _IsUnique implements ValidatorConstraintInterface {
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

@ValidatorConstraint({ async: true })
class _LoadEntity implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments: ValidationArguments) {
    if (isEmpty(value)) return false;
    const [
      entityClass,
      property = validationArguments.property,
      findByColumnName,
      relations,
      allowNull,
    ] = validationArguments.constraints;
    const whereOptions = { [findByColumnName]: value };
    const entity = await entityClass.findOne({
      where: whereOptions,
      relations,
    });
    const entityExists = !!entity || allowNull;
    if (entityExists) {
      const { object } = validationArguments;
      Object.defineProperty(object, property, {
        value: entity,
        writable: false,
      });
    }
    return entityExists;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} doesn't exist`;
  }
}

export const LoadEntity = function <T>({
  entityClass,
  accessEntityByProperty,
  findByColumnName = 'id',
  relations = undefined,
  allowNull = false,
}: {
  entityClass: EntityClass<T>;
  accessEntityByProperty: string;
  findByColumnName?: EntityColumnName<T> | 'id';
  relations?: FindOptionsRelations<T>;
  allowNull?: boolean;
}) {
  return Validate(_LoadEntity, [
    entityClass,
    accessEntityByProperty,
    findByColumnName,
    relations,
    allowNull,
  ]);
};

@ValidatorConstraint({ async: true })
export class _LoadEntities implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments: ValidationArguments) {
    const [
      entityClass,
      entitiesHolderProperty = validationArguments.property,
      findByColumnName,
      relations,
      allowMissing,
      filter,
    ] = validationArguments.constraints;
    if (!isArray(value) || (isArray(value) && value.length === 0)) return false;
    const whereOptions = {
      [findByColumnName]: In(value.filter((item) => filter(item))),
    };
    const entities = await entityClass.find({ where: whereOptions, relations });
    const entitiesExist = entities.length === value.length || allowMissing;
    if (entitiesExist) {
      const { object } = validationArguments;
      Object.defineProperty(object, entitiesHolderProperty, {
        value: entities,
        writable: false,
      });
    }
    return entitiesExist;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Some or all values in ${validationArguments?.property} don't exist`;
  }
}

export const LoadEntities = function <T>({
  entityClass,
  accessEntityByProperty,
  findByColumnName = 'id',
  relations = undefined,
  allowMissing = false,
  filter = undefined,
}: {
  entityClass: EntityClass<T>;
  accessEntityByProperty: string;
  findByColumnName?: EntityColumnName<T> | 'id';
  relations?: FindOptionsRelations<T>;
  allowMissing?: boolean;
  filter?: (value: any) => boolean;
}) {
  return Validate(_LoadEntities, [
    entityClass,
    accessEntityByProperty,
    findByColumnName,
    relations,
    allowMissing,
    filter,
  ]);
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

export const IsStrongPIN = () => {
  const pinRegex = /[0-9]{6,}/;
  const message = 'Your PIN should be atleast 6 digits long';
  return Matches(pinRegex, { message });
};
