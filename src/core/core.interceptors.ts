import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MAX_PHOTO_SIZE } from '@core/core.constants';
import { BadRequestException } from '@nestjs/common';

export const isJPEGPhotoFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any,
) => {
  // TODO: Check the magic number in the file instead of just relying on the file mimetype which is derived from the file extension
  const JPEG_MIME_TYPE = 'image/jpeg';
  if (file.mimetype !== JPEG_MIME_TYPE) {
    cb(new BadRequestException(`${file.fieldname} should be a JPEG image`));
  } else {
    cb(null, true);
  }
};

export const isPDFFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any,
) => {
  // TODO: Check the magic number in the file instead of just relying on the file mimetype which is derived from the file extension
  const PDF_MIME_TYPE = 'application/pdf';
  if (file.mimetype !== PDF_MIME_TYPE) {
    cb(new BadRequestException(`${file.fieldname} should be a pdf`));
  } else {
    cb(null, true);
  }
};

export const PhotoFieldsInterceptor = (photoFields: MulterField[]) => {
  /**
   * An interceptor used for uploading many photo fields
   */
  return FileFieldsInterceptor(photoFields, {
    fileFilter: isJPEGPhotoFilter,
    limits: { fileSize: MAX_PHOTO_SIZE, files: photoFields.length },
    dest: process.env.MULTER_DEST,
  });
};

export const PhotosFieldInterceptor = (
  photoField: string,
  maxCount: number,
) => {
  /**
   * An interceptor used for uploading multiple photos(files) per field i.e multiple photos
   */
  return FilesInterceptor(photoField, maxCount, {
    fileFilter: isJPEGPhotoFilter,
    limits: { fileSize: MAX_PHOTO_SIZE, fieldSize: 1 },
    dest: process.env.MULTER_DEST,
  });
};

export const PDFFieldInterceptor = (field: string) => {
  /**
   * An interceptor used for uploading a single PDF file
   */
  return FileInterceptor(field, {
    fileFilter: isPDFFileFilter,
    limits: { fileSize: MAX_PHOTO_SIZE, files: 1 },
    dest: process.env.MULTER_DEST,
  });
};
