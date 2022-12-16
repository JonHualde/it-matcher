import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
const multerConfig = {
  destPictures: process.env.UPLOAD_LOCATION_PICTURES,
  destAttachments: process.env.UPLOAD_LOCATION_ATTACHMENTS,
  imageRegex: /(jpg|jpeg|png|gif)$/,
  attachmentRegex: /(jpg|jpeg|png|gif|pdf|doc|docx|csv|png|jpeg|jpg|xlsx|xls)$/,
};

// Check if a variable contains the string "picture" in it (case insensitive)
const isPicture = (variable: string) =>
  variable.toLowerCase().includes('picture');

// Multer upload options
export const multerOptions = () => ({
  // Enable file size limits
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (
      isPicture(file.fieldname)
        ? file.mimetype.match(multerConfig.imageRegex)
        : file.mimetype.match(multerConfig.attachmentRegex)
    ) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath =
        multerConfig[
          isPicture(file.fieldname) ? 'destPictures' : 'destAttachments'
        ];
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      file.updatedFilename = `${uuid()}${extname(file.originalname)}`;
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
});
