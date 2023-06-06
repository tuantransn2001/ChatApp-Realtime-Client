export interface ObjectDynamicValueAttributes {
  [key: string]: any;
}
export interface PostFileFormDataBody {
  [key: string]: Blob;
}

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
