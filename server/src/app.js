console.clear();

const PORT = process.env.PORT || 9000;

const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const { errorHandler, notFound404 } = require('./middlewares/middlewares');
const limiter = require('./helpers/limiter');
const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(router);
app.use(errorHandler);
app.use(notFound404);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
