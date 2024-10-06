class apierror {
    code
    message
  
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static notFound() {
      return new apierror(404, 'Requested resource not found');
    }
  
    static badRequest(message) {
      return new apierror(400, message);
    }
  
    static internalError() {
      return new apierror(500, 'Internal server error');
    }
  }
  
  export default apierror;
  