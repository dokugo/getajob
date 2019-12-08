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
  // limit parallel running puppeteer jobs amount
  if (Object.keys(locksStorage).length > 10) return { status: 'BUSY' };

  let lockState;

  try {
    lockState = await acquire(id);

    if (lockState === 'locked') return { status: 'IN_PROCESS' };

    const result = await trySearch(searchKeywords, response);

    if (result && result.length) {
      return { status: 'DATA_FOUND', data: result };
    } else {
      return { status: 'DATA_NOT_FOUND' };
    }
  } catch (error) {
    return { status: 'ERROR', error: error };
  } finally {
    if (lockState === 'acquired') await release(id);
  }
};

const trySearch = async (searchKeywords, response) => {
  try {
    const result = await crawl(searchKeywords);

    return result;
  } catch (error) {
    return { status: 'CRAWLER_ERROR', error: error };
  }
};

module.exports = mutex;
