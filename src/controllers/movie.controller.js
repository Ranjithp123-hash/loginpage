const isAdminAuthorized = require("../middleware/auth.middleware");
const Movie = require("../model/movie.models");
const express = require("express");
const Router = express.Router();


Router.post("/create", isAdminAuthorized,async(req,res)=> {
    try {
        const {moviename, category, actors} = req.body;

        const movie = await Movie.create({moviename, category, actors});

        res.send({movie})


    } catch (error) {

        res.send({error: error.message});
    }

 })


 Router.get("/movielist", async(req,res)=> {
    try {
        const movie = await Movie.find();

        res.send({movie})

    } catch (error) {

        res.send({error: error.message});
    }

 }) 



 module.exports = Router;