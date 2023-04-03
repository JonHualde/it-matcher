import { Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');
// Types
import { S3UploadResponse } from '@types';
import { GetPictureDataDto } from './dtos/get-picture-data.dto';

@Injectable()
export class MediaService {
  constructor() {}

  async getPictureData(body: GetPictureDataDto): Promise<S3UploadResponse> {
    const s3 = new AWS.S3();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: body.key,
    };

    return await s3.getObject(params).promise();
  }

  async uploadMedia(
    files: any[],
    type: 'pictures' | 'attachments',
  ): Promise<S3UploadResponse[]> {
    const s3 = new AWS.S3();

    const params = files.map((file) => {
      return {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${type}/${file.originalname}-${Math.random()
          .toString(36)
          .substr(2, 14)}`,
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
