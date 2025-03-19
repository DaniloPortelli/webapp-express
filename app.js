import express from "express";


    const app = express();
    const port = process.env.SERVER_PORT || 3000;
    import cors from 'cors';

    import movieRouter from './routes/movieRouter.js' 

    app.use(cors());

    app.use( '/movies' , movieRouter ) 

    app.use(express.json())

    app.listen( port, () => {
        console.log( `Server in funzione sulla porta: ${port}` )
    } )