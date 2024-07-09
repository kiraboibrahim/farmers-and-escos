import * as argon from 'argon2';

export const hash = async (value: string) => {
  return await argon.hash(value);
};

export const applyMixins = (
  derivedConstructor: any,
  ...baseConstructors: any[]
) => {
  // Allow multiple inheritance, sth that isn't supported in typescript
  baseConstructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedConstructor.prototype[name] = baseCtor.prototype[name];
    });
  });
};
