export default interface S3UploadResponse {
  Etag: string;
  Location: string;
  Key: string;
  Bucket: string;
  VersionId: string;
  key: string;
}
