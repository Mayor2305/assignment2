const {Pool}=require('pg');
var pool;
pool=new Pool({
  connectionString: process.env.DATABASE_URL
});


  const getUsers=(request,response)=>{
  pool.query('SELECT * FROM usr ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};


    const createUser=(request,response)=>{
      const {uname,lname,uage,uid,uheight}=request.body;
      pool.query('INSERT INTO usr (name ,last_name ,age ,id, height) VALUES ($1,$2,$3,$4,$5) ',[uname,lname,uage,uid,uheight],(error,results)=>{
        if (error)
        throw error;
        response.status(201).send(`user added SUCCESSFULLY `);

})
  };

  const updateUser = (request, response) => {
    const id = request.params.id;
    const {uname,lname,uage,uid,uheight}=request.body;

    pool.query('UPDATE usr SET name = $1, last_name = $2 , age=$3 ,height=$4 WHERE id = $3',[uname, lname, id, uage,uheight],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  };

  const deleteUser = (request, response) => {
    var uid=request.params.id;

    pool.query('DELETE FROM usr WHERE id = $1', [uid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${uid}`)
    })
  };

  module.exports = {
getUsers,
createUser,
updateUser,
deleteUser,
}
