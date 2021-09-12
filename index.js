const express=require('express');
const socket=require('socket.io');
//app-set-up
const app=express()

//server set up 
const server=app.listen(process.env.PORT||4000,()=>{
    //console.log('server is running on port 4000');
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

const io=socket(server);
io.on('connection',(connection)=>{
    console.log(connection.id,' is connected...');
    connection.on('chat',(data)=>{
        io.sockets.emit('chat',data);
        console.log('room_id',data.room);

    })
    connection.on(`typing`,data=>{
        //console.log('typing',data.name,data.room);
        connection.broadcast.emit(`typing`,data);
    })

})