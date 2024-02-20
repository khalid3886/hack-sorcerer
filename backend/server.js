const express = require('express')
const cors=require('cors')
const app = express()
const {connection}=require('./db')
const {userRouter}=require("./route/user.route")
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {transports,format}=require('winston')
const expressWinston=require('express-winston')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')
app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/peerjs', peerServer);
app.use(expressWinston.logger({
  transports:[
      // new transports.Console({
      //     json:true,
      //     colorize:true,
      //     level:"error"
      // })
      new transports.File({
          json:true,
          level:"warn",
          filename:"warninglogs.log"
      })
  ],
  format: format.combine(
      format.colorize(),
      format.json(),
      format.prettyPrint()
  ),
  msg: "HTTP {{req.method}} {{req.url}}",
  statusLevels:true
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    
    // messages
    socket.on('message', (message) => {
    
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||8080,async()=>{
  console.log('server is running')
  try{
    await connection
    console.log('connected to db')
}
catch(err)
{
    console.log(err)
}
})
