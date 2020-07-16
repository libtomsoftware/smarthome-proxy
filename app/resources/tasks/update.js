const axios = require('axios');
const CONFIG = require('../../config');
const { HTTP_CODE, SMARTHOME_CENTRAL_URL } = CONFIG.CONSTANTS;
const responder = require('../../responder');

module.exports = async (req, res) => {
  const { query, headers, body } = req;
  const { origin } = headers;
  const { pin } = query;

  console.warn('Passing through request to update task', body);

  try {
    const response = await axios.post(
      `${SMARTHOME_CENTRAL_URL}/tasks?pin=${pin}`,
      body
    );
    const { status, data } = response;

    console.warn(`Task ${body.id} added, responding with ${data}`);

    responder.send(res, origin, data, status);
  } catch (error) {
    console.log('Error', error);
    responder.reject(res, origin, HTTP_CODE.BAD_GATEWAY);
  }
};
