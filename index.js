const express = require("express");
const app = express();
const connect = require("./src/config/db");
const usercontroller = require("./src/controllers/user.controller");
const moviecontroller = require("./src/controllers/movie.controller");

app.use(express.json());
require("dotenv");


const port = process.env.PORT || 8080;


app.use("/user", usercontroller);
app.use("/movie", moviecontroller);


app.listen(port, async()=> {
    try{
        await connect();

        console.log(`Listening to my port on ${port}`);

    } catch (error){
        console.log({error: error.message});

    }
    
})
