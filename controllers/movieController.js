import connection from '../data/db.js';

   function index(req, res) {
     const sql = 'SELECT * FROM movies';

     connection.query(sql, (err, results) => {
       if (err)
         return res.status(500).json({
           error: 'Errore lato server INDEX function',
         });

       res.json(results);
     });
   }

   function show(req, res) {
     const { id } = req.params;

     const movieSql = 'SELECT * FROM movies WHERE id= ?';

     const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

     connection.query(movieSql, [id], (err, results) => {
       if (err)
         return res.status(500).json({
           error: 'Errore lato server SHOW function',
         });

       if (results.length === 0)
         return res.status(404).json({
           error: 'Movie not found',
         });

       const movie = results[0];

       connection.query(reviewsSql, [id], (err, reviewsResults) => {
         if (err)
           return res.status(500).json({
             error: 'Errore lato server SHOW function',
           });

         movie.reviews = reviewsResults;
         res.json(movie);
       });
     });
   }

   function destroy(req, res) {
     const { id } = req.params;

     const sql = 'DELETE FROM movies WHERE id = ?';

     connection.query(sql, [id], (err) => {
       if (err)
         return res.status(500).json({
           error: 'Errore lato server DESTROY function',
         });

       res.sendStatus(204);
     });
   }


   function storeReview(req, res) {
    const { id } = req.params;
  
    const { text, name, vote } = req.body;
  
    const sql =
      'INSERT INTO reviews ( text, name, vote, movie_id ) VALUES (?,?,?,?)';
  
    connection.query(sql, [text, name, vote, id], (err, results) => {
      if (err)
        return res.status(500).json({
          error: 'Database Errore StoreReview',
        });
  
      res.status(201);
      res.json({
        message: 'review Added',
        id: results.insertId,
      });
    });
  }

   export { index, show, destroy, storeReview };