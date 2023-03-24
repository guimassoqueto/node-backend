import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } from "../settings";
import { v4 as uuid4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const config = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION
}

export const s3Client = new S3Client(config);

interface IParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
  ACL: "private"|"public-read"|"public-read-write";
}

type ACLType = "private"|"public-read"|"public-read-write";

class AWSClientS3 {
  private config: S3ClientConfig = {
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION
  }
  private client = new S3Client(this.config);
  private ACL: ACLType;
  private params: IParams;
  public filename: string;

  constructor (file: Express.Multer.File, acl: ACLType = "public-read-write") {
    this.ACL = acl;
    this.filename = `${uuid4()}.${file.mimetype.split("/").pop()}`
    this.params = {
      Bucket: AWS_S3_BUCKET,
      Key: this.filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: this.ACL
    }
  }

  async upload() {
    try {
      const command = new PutObjectCommand(this.params);
      await this.client.send(command);
    } catch (error) {
      throw error;
    }
  }
};