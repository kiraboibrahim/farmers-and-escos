import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MAX_FILE_SIZE } from '@core/core.constants';
import { BadRequestException } from '@nestjs/common';

export const PhotoUploadsInterceptor = (photoFields: MulterField[]) => {
  const isJPEGPhoto = (req: any, file: Express.Multer.File, cb: any) => {
    // TODO: Check the magic number in the file instead of just relying on the file mimetype which is derived from the file extension
    const JPEG_MIME_TYPE = 'image/jpeg';
    if (file.mimetype !== JPEG_MIME_TYPE) {
      cb(new BadRequestException(`${file.fieldname} should be a JPEG image`));
    } else {
      cb(null, true);
    }
  };

  return FileFieldsInterceptor(photoFields, {
    fileFilter: isJPEGPhoto,
    limits: { fileSize: MAX_FILE_SIZE, files: photoFields.length },
    dest: process.env.MULTER_DEST,
  });
};

export const PDFUploadInterceptor = (field: string) => {
  const isPDF = (req: any, file: Express.Multer.File, cb: any) => {
    // TODO: Check the magic number in the file instead of just relying on the file mimetype which is derived from the file extension
    const PDF_MIME_TYPE = 'application/pdf';
    if (file.mimetype !== PDF_MIME_TYPE) {
      cb(new BadRequestException(`${file.fieldname} should be a pdf`));
    } else {
      cb(null, true);
    }
  };

  return FileInterceptor(field, {
    fileFilter: isPDF,
    limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    dest: process.env.MULTER_DEST,
  });
};
