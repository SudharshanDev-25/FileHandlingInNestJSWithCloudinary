/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as streamifier from 'streamifier';
import cloudinary from './config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  uploadStream(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }
}
