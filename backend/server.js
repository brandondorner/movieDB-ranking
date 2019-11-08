const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors')

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

app.post('/register', async (req, res) => {
    //destructuring
    const { email, name, password } = req.body

    //password hashing
    //async await 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    database.users.push({
        id: '125',
        name : name,
        email : email,
        password: hashedPassword,
        joined : new Date()
    })
    res.json(database.users[database.users.length - 1])
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