require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoCon = require('./connection/mongoDB');
const socketConnection = require('./connection/socketConnection')
const app = express()
const server = require('http').createServer(app);
 io = require('socket.io')(server); 
socketConnection()
mongoCon();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


const port = process.env.PORT || '5000'
server.listen(port, () => console.log('Listening port on...!!!', port))


process
    .on('unhandledRejection', (reason, p) => {
        console.log(reason)
        console.log(p)
        console.log(
            reason,
            'Unhandled Rejection at Promise >> ',
            new Date(),
            ' >> ',
            p,
        );
    })
    .on('uncaughtException', (err) => {
        console.log(err)
        console.log('Uncaught Exception thrown', new Date(), ' >> ', '\n', err);
    });


