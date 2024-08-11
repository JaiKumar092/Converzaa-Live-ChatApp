const express=require('express');
const dotenv=require("dotenv");
const cors =require("cors");
const {default: mongoose } =require("mongoose");
const userRoutes =require("./Routes/userRoutes");
const chatRoutes =require("./Routes/chatRoutes");
const messageRoutes =require("./Routes/messageRoutes");
const {notFound,errorHandler} =require("./middlewares/errorMiddleware")
const app=express();
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessstatus: 200
};
app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDb= async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to Db");
    }
    catch(err){
        console.log("Server is not connected to the Database",err.message);
    }
};
connectDb();

app.get("/",(req,res)=>{
    res.send("Api is running")
})

app.use("/user",userRoutes);
app.use("/chat",chatRoutes);
app.use("/message",messageRoutes);

app.use(notFound);
app.use(errorHandler);

// console.log(process.env.MONGO_URI)

const PORT = process.env.PORT || 5000;

const Server = app.listen(PORT,()=>{
    console.log("server running at:"+PORT);
})

const io= require("socket.io")(Server,{
    cors:{
        origin:"*",
    },
    pingTimeout:60000,
});

io.on("connection",(socket)=>{
    socket.on("setup",(user)=>{
        socket.emit("connected");
    });

    socket.on("join chat",(room)=>{
        socket.join(room);
    })

    socket.on("new message",(newMessageStatus)=>{
        var chat=newMessageStatus.chat;
        if(!chat.users){
            return console.log("chat.users are not defined");
        }
        chat.users.forEach((user)=>{
            if(user._id==newMessageStatus.sender._id) return;
            socket.in(user._id).emit("message recieved",newMessageRecieved);
        });
    });
});