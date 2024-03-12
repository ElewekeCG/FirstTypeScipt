export class CustomApiError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  // so there is a buuilt in status code in node that helps make lives easier so after installing http-ststus code,
  // you can say StatusCodes.UNAUTHORIZED