class Response {
  success;
  message;
  code;
  resources;
  constructor(success, code, message, resources) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.resources = resources;
  }

  OK(resources, message = 'Successful') {
    return new Response(true, 200, message, resources);
  }

  NOT_FOUND() {
    return new Response(false, 404, 'Not Found', []);
  }

  FAIL() {
    return new Response(false, 500, 'Fail', []);
  }
}

export default Response;
