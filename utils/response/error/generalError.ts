export class GeneralError extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data: any = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}