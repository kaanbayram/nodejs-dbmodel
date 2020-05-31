const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const fs = require('fs');

const config = require('config');
const jwt = require('jsonwebtoken');


const forms = require('./routes/api/forms');

const waitingjobs = require('./routes/api/waitingjobs');

const items = require('./routes/api/items');

const wears = require('./routes/api/wears');

const users = require('./routes/api/users');

const auth = require('./routes/api/auth');

//const auth_user = require('./routes/api/auth/user');


const app = express();


app.use(express.json());


const db = config.get('mongoURI');

//const certFileBuf = fs.readFileSync('C:\Users\kbayram\Desktop\reacttype\node_modules\mongoose\lib\error\serverSelection')

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    sslValidate:false,
    useCreateIndex: true,
    // authMechanism: 'MONGODB-X509',
    // authSource :'$external'
}).then(()=> console.log('MongoDB Connected...')).catch(
    err => console.log(err)
);


app.use('/api/forms', forms);
app.use('/api/waitingjobs', waitingjobs);
app.use('/api/items', items);
app.use('/api/wears', wears);
app.use('/api/users', users);
app.use('/api/auth', auth);
// app.use('/api/auth', auth_user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port '+ port));