import express from 'express'

import dotenv from "dotenv"

import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express();
const PORT = 8080;

app.use('/', (req, res) => {
    res.send('API is running')
})

app.listen(PORT, () => console.log(`server started on PORT  ${PORT}`))

