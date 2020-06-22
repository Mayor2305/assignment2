const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./queries')
const PORT = process.env.PORT || 5000

const {Pool}=require('pg');
var pool;
pool=new Pool({
  connectionString: process.env.DATABASE_URL
});

  var app=express()

    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(express.static(path.join(__dirname, 'public')))
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.get('/', (req, res) => res.render('pages/index'))

    app.get('/', (request,response)=>{
      response.json({info:'Node.js,Express, and Postgres API'})
    })

    app.get('/getUsers', db.getUsers)
    app.get('/usr/:id', (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM usr WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error;
      }
      var results={'rows':result.rows};
      response.render('pages/db',results);
    })
  });
    app.post('/usr', db.createUser)
    app.put('/usr/:id', db.updateUser)
    app.delete('/usr/:id', db.deleteUser)
    app.get('/database',(req,res)=>{
      var getUsersQuery = 'SELECT * FROM usr';
      pool.query(getUsersQuery,(error, result)=>{
        if(error)
         res.end(error);


        })
      })
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
