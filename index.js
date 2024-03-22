const express = require("express");
const cors = require("cors");
const mongoConnection = require("./connection");
const postRouter= require('./routes/posts');
const userRouter= require('./routes/user');

require('dotenv').config()

const app = express();
app.use(cors());

mongoConnection(process.env.URI)

app.use(express.json({limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/posts',postRouter)//all the routes inside posts.js start with /posts prefix
app.use('/user', userRouter)
app.listen(process.env.PORT)