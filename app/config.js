module.exports = {
  CONSTANTS: {
    ADDRESS: process.env.ADDRESS,
    PROXY_REQUEST_DELAY: process.env.PROXY_REQUEST_DELAY || 10, //seconds
    SMARTHOME_CENTRAL_URL: process.env.SMARTHOME_CENTRAL_URL,
    HTTP_CODE: {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      BAD_GATEWAY: 502,
    },
  },
};
