const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();
app.use(morgan(('dev')));
app.use(cors());
app.use(bodyParse.json({ limit:'500md' }));
readdirSync('./Routes').map((r)=>{
    app.use('/api', require('./Routes/'+r))
})

app.listen(8000, ()=>{
    console.log('server run ...');
})