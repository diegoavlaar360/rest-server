const express = require('express')
const cors = require('cors')
const db = require('../database/connection.js');

const {authorRouter, bookRouter, genreRouter, userRouter} = require('../routes');

class Server{
    constructor(){
        this.app = express();
        this.port = '8000';
        this.connectdb();
        this.middlewares();
        this.routes();
    }
    
    async connectdb() {
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }    
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('The server is running');
        })
    }

    routes(){
        this.app.use('/author', authorRouter);
        this.app.use('/book', bookRouter);
        this.app.use('/genre', genreRouter);
        this.app.use('/user', userRouter);
        db.sync({force:true});
    }
}

module.exports = Server;