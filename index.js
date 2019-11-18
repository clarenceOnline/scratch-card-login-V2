const express = require('express');
const codes = require('./routes/codes');

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));

app.use('/api/codes', codes);


app.listen(port, () => console.log(`Server running on ${port}`));