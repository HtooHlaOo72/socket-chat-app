const express=require('express');
const socket=require('socket.io');
//app-set-up
const app=express()

//server set up 
const server=app.listen(4000||process.env.PORT,()=>{
    console.log('server is running on port 4000');
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

const io=socket(server);
io.on('connection',(connection)=>{
    console.log(connection.id,' is connected...');
    connection.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    })
    connection.on('typing',name=>{
        console.log('typing',name);
        connection.broadcast.emit('typing',name);
    })

})