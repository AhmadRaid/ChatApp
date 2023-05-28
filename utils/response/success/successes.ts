const { OK, CREATED, NO_CONTENT, CONTINUE } = require("../../httpCode");
import { GeneralSuccess } from "./generalSuccess";

export class Success extends GeneralSuccess {
  constructor(message: string, data: any = undefined) {
    super(message, OK, data);
  }
}

export class CreatedSuccess extends GeneralSuccess {
  constructor(message: string, data: any = undefined) {
    super(message, CREATED, data);
  }
}

export class NoContentSuccess extends GeneralSuccess {
  constructor(message: string, data: any = undefined) {
    super(message, NO_CONTENT, data);
  }
}

export class ContinueSuccess extends GeneralSuccess {
  constructor(message: string, data: any = undefined) {
    super(message, CONTINUE, data);
  }
}

export class Created extends GeneralSuccess {
  constructor(message : string, data = undefined) {
    super(message, CREATED, data);
  }
}
