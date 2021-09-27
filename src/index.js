const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('OK');
})

require('./controllers/marketController')(app);

app.listen(port, () => {
    console.log("[ server ] started");
    console.log("[ port ]", port);
});