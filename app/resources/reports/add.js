const axios = require('axios');
const CONFIG = require('../../config');
const { SMARTHOME_CENTRAL_URL } = CONFIG.CONSTANTS;
const responder = require('../../responder');

module.exports = async (req, res) => {
  const { body, headers } = req;
  const { origin } = headers;

  try {
    const response = await axios.post(`${SMARTHOME_CENTRAL_URL}/reports`, body);
    const { status, data } = response;

    responder.send(res, origin, data, status);
  } catch (error) {
    console.log('Error', error);
    responder.reject(res, origin, HTTP_CODE.BAD_GATEWAY);
  }
};
