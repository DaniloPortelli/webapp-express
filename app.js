import express from "express";


    const app = express();
    const port = process.env.SERVER_PORT || 3000;

    import movieRouter from './routes/movieRouter.js' 


    app.use( '/movies' , movieRouter ) 

    app.listen( port, () => {
        console.log( `Server in funzione sulla porta: ${port}` )
    } )