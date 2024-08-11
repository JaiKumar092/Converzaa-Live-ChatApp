const express = require('express');
const {accessChat,
    fetchChats,
    fetchGroups,
    createGroupChat,
    groupExit} =require("../Controllers/chatController")
const Router = express.Router();

const {protect} =require("../middlewares/authMiddlewares");

Router.route("/").post(protect,accessChat);
Router.route("/").get(protect,fetchChats);
Router.route("/createGroup").post(protect,createGroupChat);
Router.route("/fetchGroups").get(protect,fetchGroups);
Router.route("/groupExit").put(protect,groupExit);

module.exports =Router;