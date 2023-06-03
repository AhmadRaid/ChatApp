export class GeneralSuccess {
  statusCode: number;
  data: any;
  message: string;

  constructor(message: string, statusCode: number, data: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
