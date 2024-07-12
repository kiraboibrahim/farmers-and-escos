import * as argon from 'argon2';
import {
  AIRTEL_UG_REGEX,
  LYCA_UG_REGEX,
  MTN_UG_REGEX,
} from '@core/core.constants';

export const applyMixins = (
  derivedConstructor: any,
  ...baseConstructors: any[]
) => {
  baseConstructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedConstructor.prototype[name] = baseCtor.prototype[name];
    });
  });
};

export const hash = async (value: string) => {
  return await argon.hash(value);
};

export const isUGPhoneNumber = (phoneNumber: string) => {
  return (
    MTN_UG_REGEX.test(phoneNumber) ||
    AIRTEL_UG_REGEX.test(phoneNumber) ||
    LYCA_UG_REGEX.test(phoneNumber)
  );
};

export const isEmpty = (obj: any) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] !== undefined) {
      return false;
    }
  }
  return true;
};
