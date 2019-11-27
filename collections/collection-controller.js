'use-strict'
var express = require('express')
var route = express.Router();
var invoke = require('../app/invoke-transaction')
var query = require('../app/query')


function getErrorMessage(field) {
	var response = {
		success: false,
		message: field + ' field is missing or Invalid in the request'
	};
	return response;
}

route.post('/postObject',async function(req,res){
    var keyOrId = req.query.keyOrId
    if (!keyOrId) {
		res.json(getErrorMessage('\'keyOrId\''));
		return;
	}
 var data = JSON.stringify(req.body)
 console.log("req  --> ",data)
    var result = await invoke.invokeChaincode(['peer0.org1.example.com','peer0.org2.example.com'],'mychannel','mycc','insertOrUpdateData',[keyOrId,data],req.username,req.orgname);
    console.log('postdata response --> ',result)
    res.send(result)
});

route.get('/getAllData',async function(req,res){
    console.log("creds===>",req.username , req.orgname)
    var result = await query.queryChaincode('peer0.org1.example.com','mychannel','mycc',[''],'getAllData',req.username,req.orgname);
    console.log("getAllData ------> ",result)
    res.send(JSON.parse(result))
});

route.get('/getDataByKey',async function(req,res){
    
    var result = await query.queryChaincode('peer0.org1.example.com','mychannel','mycc',[req.query.key],'getDataByKey',req.username,req.orgname);
    console.log("getDataByKey ------> ",result)
    res.send(JSON.parse(result))
});

route.get('/getHistoryForRecord',async function(req,res){
    
    var result = await query.queryChaincode('peer0.org1.example.com','mychannel','mycc',[req.query.key],'getHistoryForRecord',req.username,req.orgname);
    console.log("getHistoryForRecord ------> ",result)
    
    res.send(JSON.parse(result))
});
module.exports = route;