const express = require('express');
const connectDb = require('./config/db')
const app = express();

connectDb();

app.use(express.json({ extended: false}));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = 5000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));