import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
const AWS = require('aws-sdk');
// Types
import { S3UploadResponse } from '@types';

@Injectable()
export class MediaService {
  constructor() {}

  async uploadMedia(
    files: any[],
    type: 'pictures' | 'attachments',
  ): Promise<S3UploadResponse[]> {
    const s3 = new AWS.S3();

    const params = files.map((file) => {
      return {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${type}/${uuid()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
  }

  async deleteMedia(key: string) {
    const s3 = new AWS.S3();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    return await s3.deleteObject(params).promise();
  }
}
