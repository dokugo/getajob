exports.notFound404 = (request, response) => {
  response.status(404).send({ message: `Unknown endpoint.`, status: 'error' });
};

exports.errorHandler = (error, request, response, next) => {
  console.error(error.message);
  return response
    .status(500)
    .send({ message: `Internal server error.`, status: 'error' });
};
