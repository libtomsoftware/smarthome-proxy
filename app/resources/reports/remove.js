const axios = require('axios');
const CONFIG = require('../../config');
const { SMARTHOME_CENTRAL_URL } = CONFIG.CONSTANTS;
const responder = require('../../responder');

module.exports = async (req, res) => {
  const { headers, params, query } = req;
  const { origin } = headers;
  const { id } = params;
  const { pin } = query;

  try {
    const response = await axios.delete(
      `${SMARTHOME_CENTRAL_URL}/reports/${id}?pin=${pin}`
    );
    const { status, data } = response;

    responder.send(res, origin, data, status);
  } catch (error) {
    console.log('Error', error);
    responder.reject(res, origin, HTTP_CODE.BAD_GATEWAY);
  }
};
