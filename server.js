const express = require('express');
const bodrParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const corsPlugin = require('cors')
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'root12345',
        database: 'smartbrain'
    }
});

const app = express();

app.use(bodrParser.json());
app.use(corsPlugin());


app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req,res) => {
    signin.handleSignin(req,res,db,bcrypt)
})

//advanced way of doing

// app.post('/signin', (req,res) => signin.handleSignin(db,bcrypt))

app.post('/register', (req,res) => {
    register.handleRegister(req,res,db,bcrypt)
})

app.get('/profile/:id', (req,res) => {
    profile.handleProfileGet(req,res,db)
})

app.put('/image', (req,res) => {
    image.handleImage(req,res,db)
})

app.post('/imageurl', (req,res) => {
    image.handleApiCall(req,res)
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})