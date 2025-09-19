// ...existing code...
import { Injectable } from '@angular/core';
// Import S3 client v3
import { PutObjectCommand,S3Client } from '@aws-sdk/client-s3';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class S3UploadService {
  private s3: S3Client;

  private bucketName = environment.s3.bucketName;
  private region = environment.s3.region;
  private credentials = {
    accessKeyId: environment.s3.accessKeyId,
    secretAccessKey: environment.s3.secretAccessKey,
  };

  constructor() {
    this.s3 = new S3Client({
      region: this.region,
      credentials: this.credentials
    });
  }

  async uploadFile(file: File): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: file.name,
      Body: file,
      ContentType: file.type
    };
    await this.s3.send(new PutObjectCommand(params));
  }
}
// ...existing code...

