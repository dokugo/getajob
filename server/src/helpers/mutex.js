const crawl = require('../crawler/crawler');

const locksStorage = {};

const acquire = async id => {
  if (!locksStorage[id]) {
    locksStorage[id] = id;

    // console.log(`Lock acquired for ${locksStorage[id]}`);
    return 'acquired';
  } else {
    // console.log(`Already locked for ${locksStorage[id]}`);
    return 'locked';
  }
};

const release = async id => {
  // console.log(`Lock released from ${locksStorage[id]}`);
  delete locksStorage[id];
};

const mutex = async (id, searchKeywords, response) => {
  // console.log('locksStorage: ', locksStorage);

  // limit parallel running puppeteer instances amount
  if (Object.keys(locksStorage).length > 10) {
    // console.log(locksStorage);

    return response.status(503).json({
      status: 'error',
      message: 'Server is busy.'
    });
  }

  let lockState;

  try {
    lockState = await acquire(id);

    if (lockState === 'locked') {
      response.statusMessage = 'Enhance Your Calm';
      return response.status(420).json({
        status: 'error',
        message: 'Previous request is still processing.'
      });
    }

    const result = await trySearch(searchKeywords, response);
    // console.log(result);

    if (result && result.length) {
      response.status(200).json({
        status: 'OK',
        message: 'Data successfully delivered.',
        data: result
      });
    } else {
      response.status(200).json({ status: 'OK', message: 'Found nothing.' });
    }
  } catch (error) {
    response.status(409).json({
      status: 'error',
      message: error.message
    });
  } finally {
    if (lockState === 'acquired') {
      await release(id);
    }
  }
};

const trySearch = async (searchKeywords, response) => {
  try {
    const result = await crawl(searchKeywords);

    // unutilized
    /*     if (!result) {
      response.status(500).json({
        status: 'error',
        message: 'Couldn't get data.'
      });
    } */

    return result;
  } catch (error) {
    response.status(500).json({
      status: 'error',
      message: `Couldn't get data. ${error.message}`
    });
  }
};

module.exports = mutex;
