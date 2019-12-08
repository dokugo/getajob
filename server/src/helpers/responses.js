const responses = (state, response) => {
  switch (state.status) {
    case 'BUSY':
      return response.status(503).json({
        status: 'error',
        message: 'Server is busy.'
      });

    case 'IN_PROCESS':
      response.statusMessage = 'Enhance Your Calm';
      return response.status(420).json({
        status: 'error',
        message: 'Previous request is still processing.'
      });

    case 'DATA_FOUND':
      return response.status(200).json({
        status: 'OK',
        message: 'Data successfully delivered.',
        data: state.data
      });

    case 'DATA_NOT_FOUND':
      return response.status(200).json({
        status: 'OK',
        message: 'Found nothing.'
      });

    case 'MUTEX_ERROR':
      return response.status(409).json({
        status: 'error',
        message: state.error.message
      });

    case 'CRAWLER_ERROR':
      return response.status(500).json({
        status: 'error',
        message: `Couldn't get data. ${state.error.message}`
      });

    default:
      return response.status(404).json({
        status: 'error',
        message: `Cannot GET resource. ${state.error.message}`
      });
  }
};

module.exports = responses;
