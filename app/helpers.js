"use strict";
const Base64 = require("js-base64").Base64;

module.exports = new (class Helpers {
  getCurrentTimestamp() {
    return new Date().getTime();
  }

  isArray(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
  }

  decodeBase64(text) {
    return Base64.decode(text);
  }

  encodeBase64(text, salt) {
    let string = text;
    if (salt) {
      string += salt;
    }
    return Base64.encode(string);
  }

  extractIp(request) {
    return (
      request.headers["x-forwarded-for"] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress
    );
  }

  generateRandomString(max = 5, withNumbers) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const possible = letters + (withNumbers ? numbers : "");
    let text = "";

    for (let i = 0; i < max; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  parseEventBody(eventBody) {
    let body = eventBody;

    if (typeof body === "string") {
      body = JSON.parse(body || "{}");
    }

    return body;
  }
})();
