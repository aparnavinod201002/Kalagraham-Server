require('dotenv').config()
const express = require('express')
const cors =require('cors')

const router= require('./Router/router')
require('./DB/Connection')
const KalagrahamServer = express()
KalagrahamServer.use(cors())

KalagrahamServer.use(express.json())


KalagrahamServer.use(router)
KalagrahamServer.use('/uploads',express.static('./uploads'))
const PORT = 3000 || process.env.PORT

KalagrahamServer.listen(PORT,()=>{
    console.log(`KalagrahamServer Started Running at PORT:${PORT}`);
    
})
KalagrahamServer.get('/',(req,res)=>{
    res.send("<h1 style=color:red>KalagrahamServer is Started Running and wait for Client Request</h1>")
})