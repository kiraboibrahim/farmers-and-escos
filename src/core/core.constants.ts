// Ugandan Phone Number Formats
export const MTN_UG_REGEX = /256(?:76|77|78|31|39)[0-9]{7}$/;
export const AIRTEL_UG_REGEX = /256(?:70|74|75|20)[0-9]{7}$/;
export const LYCA_UG_REGEX = /25672[0-9]{7}$/;

export const LOCALHOST_REGEX = /^localhost|127\.0\.0\.1(:?[0-9]+)?$/i;

export const PASSWORD_REQUIREMENTS = {
  minLength: 6,
  minLowercase: 4,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 2,
};

export const SYMBOLS = '!@#$%^&*()?<>';

// Pagination Settings
export const MAX_ITEMS_PER_PAGE = 20;

// File uploads
export const MAX_PHOTO_SIZE = 2.5 * 1024 * 1024; // 2.5 MBs

// Resource Names
export enum Resource {
  ESCO = 'ESCO',
  FARMER = 'FARMER',
  PRODUCT = 'PRODUCT',
  INSTALLATION = 'INSTALLATION',
  IOT = 'IOT',
  OFFER = 'OFFER',
}

export const MIN_RATING = 0;
export const MAX_RATING = 5;

export const MAX_GALLERY_PHOTOS_PER_FARMER = 10;
export const MAX_GALLERY_PHOTOS_PER_UPLOAD = 3;

export const API_VERSION = '0.1.0';

export const MAX_RECOMMENDATIONS_PER_FARMER = 10;
