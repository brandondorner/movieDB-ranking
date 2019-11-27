const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors')
const knex = require('knex');

const PORT = process.env.PORT || 3000


//connect to database
const db = knex({
    client: 'pg',
    connection: {
        //heroku setup
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
  });


  //heroku setup

//   const path = require('path');
//   //Static file declaration
//   app.use(express.static(path.join(__dirname, 'moviedb/build')));
//   //production mode
//   if(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, 'moviedb/build')));
//   app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'moviedb/build/index.html'));  })}
//   //build mode
//   app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/moviedb/public/index.html'));})


  //server isnt running. when done locally port 3001 sends requests and stuff to port 3000. right now with heroku we are sending requests to the front end which doesnt work
  //need to get server running (or find where server is running) and post/get to that
  

//options
//make two different folders to upload (would have some long wake times unless you can ping both upon start of client)(also would have to figure out all  node dependcy crap messing up again)
//could test with local server set up
//could have front end on my personal site (idk with react how that would work)(would also have to change code up a bunch like locations, idk actually)


const app = express();
//parsing in json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//using cors  
app.use(cors())

app.get('/', (req, res) => {
    // SELECT * FROM moviedata LIMIT(10);
    db.select('*').from('moviedata').limit(10)
    .then(data => res.json(data))
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body
    //if register credentials are blank then return error
    if (!email || !password){
        return res.status(400).json('incorrect form submission')
    }

    //SELECT email, hash FROM login
    //WHERE email = ${req.body.email} 
   db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        //check if passwords match
        const isValid = bcrypt.compareSync(password, data[0].hash);
        //if passwords match then do this
        if (isValid){
            //return the user
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})



//whenever someone registers
app.post('/register', async (req, res) => {
    //destructuring
    const { email, name, password } = req.body
    //if register credentials are blank then return error
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }

    //password hashing
    //async await 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //adding info to login and users tables in database
    //transaction makes it where if one part fails then nothing is added to the db
    db.transaction(trx => {
        //INSERT INTO login (hash, email) VALUES hashedPassword, email;
        trx.insert({
            hash: hashedPassword,
            email: email
        })
        .into('login')
        //returns email then passes it down as loginEmail
        .returning('email')
        .then(loginEmail =>{
            //insert register data into users table and returns all of new user data
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name
            })
            .then(user => {
                //returns user instead of user within an array
                res.json(user[0])
            })
        })
        //commit and check for error
        .then(trx.commit)
        .catch(trx.rollback)
    })
    //if err (email isn't unique, return err)
    .catch(err => res.status(400).json('Unable to register. Email may already be regsitered.'))
})


app.post('/query', (req, res) => {
    const { yearStart, yearEnd, sortBy, order, limit } = req.body
    const title = req.body.title.toUpperCase()

    db.select('*').from('moviedata')
    .where('movie_year', '>', yearStart).andWhere('movie_year', '<', yearEnd)
    .andWhere("title", "like", `%${title}%`)
    .limit(limit)
    .orderBy(sortBy, order)
    .then(data => res.json(data))
    //send back db.select req.body etc etc through data res.json(data)
})



app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

