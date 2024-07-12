import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MAX_FILE_SIZE } from '@core/core.constants';
import { BadRequestException } from '@nestjs/common';

export const ImageFieldsInterceptor = (uploadFields: MulterField[]) => {
  const isJPEGFile = (file: Express.Multer.File, cb: any) => {
    if (file.mimetype !== 'image/jpeg') {
      cb(new BadRequestException(`${file.fieldname} should be a JPEG image`));
    } else {
      cb(null, true);
    }
  };
  const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    isJPEGFile(file, cb);
  };
  return FileFieldsInterceptor(uploadFields, {
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE, files: uploadFields.length },
    dest: process.env.MULTER_DEST,
  });
};
