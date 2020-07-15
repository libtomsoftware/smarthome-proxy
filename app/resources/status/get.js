const axios = require('axios');
const moment = require('moment');
const CONFIG = require('../../config');
const { PROXY_REQUEST_DELAY, SMARTHOME_CENTRAL_URL } = CONFIG.CONSTANTS;
const responder = require('../../responder');

let lastResponseTime;
let buffer;
let diff;

module.exports = async (req, res) => {
  const { query, headers } = req;
  const { origin } = headers;
  const { id, type, name } = query;

  try {
    if (lastResponseTime && buffer) {
      diff = moment().diff(lastResponseTime, 'seconds');

      if (diff < PROXY_REQUEST_DELAY) {
        responder.send(res, origin, buffer, 200);
        return;
      }
    }

    const response = await axios.get(
      `${SMARTHOME_CENTRAL_URL}/status?id=${id}&type=${type}&name=${name}`
    );
    const { status, data } = response;

    lastResponseTime = moment();
    buffer = data;

    responder.send(res, origin, data, status);
  } catch (error) {
    console.log('Error', error);
    responder.reject(res, origin, HTTP_CODE.BAD_GATEWAY);
  }
};
