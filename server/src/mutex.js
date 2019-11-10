const crawl = require('./crawler');

const locksStorage = {};

const acquire = async id => {
  if (!locksStorage[id]) {
    locksStorage[id] = id;

    console.log(`Lock acquired for ${locksStorage[id]}`);
    return 'acquired';
  } else {
    console.log(`Already locked for ${locksStorage[id]}`);
    return 'locked';
  }
};

const release = async id => {
  console.log(`Lock released from ${locksStorage[id]}`);
  delete locksStorage[id];
};

const mutex = async (id, searchKeywords, res) => {
  // console.log('locksStorage: ', locksStorage);

  // limit parallel running puppeteer instances amount
  if (Object.keys(locksStorage).length > 100) {
    console.log(locksStorage);

    res.status(503).json({
      status: 'error',
      message: 'Server is busy.'
    });
    return;
  }

  let lockState;

  try {
    lockState = await acquire(id);

    if (lockState === 'locked') {
      res.statusMessage = 'Enhance Your Calm';
      res.status(420).json({
        status: 'error',
        message: 'Previous request is still processing.'
      });
      return;
    }

    const result = await trySearch(searchKeywords, res);
    console.log(result);

    if (result && result.length) {
      res.status(200).json({
        status: 'OK',
        message: 'Data successfully delivered.',
        data: result
      });
    } else {
      res.status(200).json({ status: 'OK', message: 'Found nothing.' });
    }
  } catch (error) {
    res.status(409).json({
      status: 'error',
      message: error.message
    });
  } finally {
    if (lockState === 'acquired') {
      await release(id);
    }
  }
};

const trySearch = async (searchKeywords, res) => {
  try {
    const result = await crawl(searchKeywords);

    // seems unutilized
    /*     if (!result) {
      res.status(500).json({
        status: 'error',
        message: 'Couldn't get data.'
      });
    } */

    return result;
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: `Couldn't get data. ${error.message}`
    });
  }
};

module.exports = mutex;
