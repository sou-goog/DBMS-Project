const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db = require('./models');



// Routers ( Middle Wares? )

// All requests are written in file './routes/Users'
// all requests originating from 'localhost:3001/signup' are automatically routed to /server/routes/Users.js 
const userRouter = require('./routes/Users');
app.use('/users', userRouter);

const bookRouter = require('./routes/Books');
app.use('/books', bookRouter);

const searchRouter = require('./routes/Search');
app.use('/search', searchRouter);

db.sequelize.sync(/*{alter: true}*/).then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001.");
    })
})