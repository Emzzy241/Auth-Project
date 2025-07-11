const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter.js')
const postsRouter = require('./routers/postsRouter.js')

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) // our app is extended with the url encoded data

mongoose
    .connect(process.env.MONGO_URL).then(() => {
        console.log('database connected')
    }).catch(err => {
        console.log(err)
    })

app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.get('/', (req, res) => {
    res.json({ message: "Hello from the server" })
})



app.listen(process.env.PORT, () => {
    console.log('listening....')
})

console.log('Hello')