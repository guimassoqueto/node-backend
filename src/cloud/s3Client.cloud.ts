import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } from "../settings";
import { v4 as uuid4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface IParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
  ACL: "private"|"public-read"|"public-read-write";
}

type ACLType = "private"|"public-read"|"public-read-write";

export class S3Service {
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
  private filename: string;
  public S3Location?: string; 

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
      this.S3Location = `https://${AWS_S3_BUCKET}.s3.us-east-2.amazonaws.com/${this.filename}`

    } catch (error) {
      throw error;
    }
  } 
};