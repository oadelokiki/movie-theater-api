const {User, Show}  = require("./models/index")

const express = require("express");

const userRouter = express.Router();
userRouter.use((req,res,next) => {
        console.log("user route used");
        next()
})

userRouter.get("/", async (req, res) =>{
	let rvalue = await User.findAll();
	console.log(rvalue);
	res.send("bubbye");
})

userRouter.get("/:userId/", async (req,res) => {
        //userId comes from req params
        let result = await User.findAll({
		where : {
			id: req.params.userId
		}
	});
	 
        res.send(result[0]);
});

userRouter.get("/:userId/shows", async(req,res) => {
        //userId comes from req params
	
	let result = await Show.findAll({
		where: {
			userId:Number( req.params.userId)
		}
	}, {
                include: [User]
        });

	console.log(result);
        res.send(result)
});


userRouter.put("/:userId/shows/:showId", async (req,res) => {
        //userId comes from req params
        //include Server side verification
        //should add / update a show
	console.log(req.params)

	let thisuser = await User.findAll({
                where : {
                        id:Number( req.params.userId)
                }
        });

	console.log(thisuser)

	if(thisuser.length < 1){
		res.send("user does not exist")
	}

	let oldshow = await Show.findAll({
                where : {
                        id: req.params.showId
                }
        }, {include: [User]});

		
	console.log(oldshow[0]);

	if (oldshow.length < 1){
		//add new show
		let newshow = await Show.create({
			id: req.params.showId,			
			User: thisuser[0], 
			
			userId : req.params.userId
		}, {include: [User]});
		
		console.log(newshow);
		res.send(newshow);
	}

	else{
		oldshow = oldshow[0]
		console.log("before" )
			console.log(oldshow);
		
		oldshow.set({userId: req.params.userId});

		oldshow.user = thisuser[0];
		await oldshow.save();
	
		console.log("post updated")
			console.log(thisuser);

		console.log([oldshow.userId])
		res.send(oldshow);
		//update userid of show
	}

});

module.exports = userRouter
