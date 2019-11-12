const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors')
const knex = require('knex');

const PORT = process.env.PORT || 3000


//connect to database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      //add in password
      password : '***',
      database : 'movie'
    }
  });

db.select('*').from('users')
  //grab data, then console log it
  .then(data => {
      console.log(data)
  })

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
        //if passwors match then do this
        if (isValid){
            //return the user
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    console.log(user)
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



app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})


/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/movies --> GET = results


*/