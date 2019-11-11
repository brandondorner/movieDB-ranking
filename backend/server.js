const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors')
const knex = require('knex');

//connect to database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      //add in password
      password : '*****',
      database : 'movie'
    }
  });

// SELECT * FROM users;
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

const database = {
    users: [
        {
            id: '123',
            name : 'john',
            email : 'john@mail',
            password: 'cookies',
            joined : new Date()
        },
        {
            id: '124',
            name : 'sakky',
            email : 'sally@mail',
            password: 'icecream',
            joined : new Date()
        }
    ]
}

//function for comparing passwords
const comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}


app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    //if req email and password match a user in our database then send them the site
    //if they do not match, send an error
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){

        // res.json('success')
        res.json(database.users[0])
    }else{
        res.status(400). json('error logging in')
    }
})

//whenever someone registers
app.post('/register', async (req, res) => {
    //destructuring
    const { email, name, password } = req.body

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



app.listen(3000, () => {
    console.log('app running on port 3000')
})


/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/movies --> GET = results


*/