const express = require('express');
const logger = require('morgan');

const app = express();

//routes import
const usersRouter = require('./routes/users');


// can be removed
app.use(logger('dev'));
//

app.use(express.json());

//routing
app.use('/user', usersRouter);


app.listen(4000,()=>console.log("serving on port 4000"))