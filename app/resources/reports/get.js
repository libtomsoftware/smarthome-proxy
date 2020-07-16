const axios = require('axios');
const moment = require('moment');
const CONFIG = require('../../config');
const {
  HTTP_CODE,
  PROXY_REQUEST_DELAY,
  SMARTHOME_CENTRAL_URL,
} = CONFIG.CONSTANTS;
const responder = require('../../responder');

let lastResponseTime;
let buffer;

module.exports = async (req, res) => {
  const { origin } = req.headers;

  try {
    if (lastResponseTime && buffer) {
      const diff = moment().diff(lastResponseTime, 'seconds');

      if (diff < PROXY_REQUEST_DELAY) {
        responder.send(res, origin, buffer, 200);
        return;
      }
    }

    const response = await axios.get(`${SMARTHOME_CENTRAL_URL}/reports`);
    const { status, data } = response;

    lastResponseTime = moment();
    buffer = data;

    responder.send(res, origin, data, status);
  } catch (error) {
    console.log('Error', error);
    responder.reject(res, origin, HTTP_CODE.BAD_GATEWAY);
  }
};
