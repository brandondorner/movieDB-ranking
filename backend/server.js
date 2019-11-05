const express = require('express');

const app = express();
//parsing in json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name : 'john',
            email : 'john@mail',
            password: 'chips',
            entries: 0,
            joined : new Date()
        },
        {
            id: '124',
            name : 'sakky',
            email : 'sally@mail',
            password: 'icecream',
            entries: 0,
            joined : new Date()
        }
    ]
}


app.get('/', (req, res) => {
    res.json('index')
})

app.post('/signin', (req, res) => {
    //if req email and password match a user in our database then send them the site
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){

        res.json('success')
    }else{
        res.status(400). json('error logging in')
    }
})

app.post('/register', (req, res) => {
    //destructuring
    const { email, name, password } = req.body
    database.users.push({
        id: '125',
        name : name,
        email : email,
        password: password,
        entries: 0,
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