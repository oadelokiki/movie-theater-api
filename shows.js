const {User, Show}  = require("./models/index")

const express = require("express")
const showRouter = express.Router();

showRouter.use((req,res,next) => {
        console.log("show route used");
        next()
})

showRouter.get("/", async (req,res) => {
	let shows = await Show.findAll();
        res.send(shows)

});

showRouter.get("/:showId", async  (req,res) => {
	let show = await Show.findAll({where: 
		{id: req.params.showId}
	})
        res.send(show)

});

showRouter.delete("/:showId", async  (req,res) => {
        let show = await Show.findAll({where:
                {id: req.params.showId}
        })
	await show[0].destroy();
	console.log("show deleted");
        res.send("rip")

});

showRouter.get("/genres/:genreId", async (req, res) => {
	let shows = await Show.findAll({where:
                {genre: req.params.genreId}
        })

	res.send(shows)
})

showRouter.put("/:showId/watched", async (req,res) => {
	let newrating;
	
	let oldRating = await Show.findAll({
		where: {
			id: req.params.showId
		}
	});
	
	console.log(oldRating);

	oldRating = oldRating[0]
	
	if(oldRating.rating == 0){
		newrating = 1
	}else{
		newrating = 0
	}

	oldRating.set({rating: newrating});

	console.log(oldRating.rating);
	await oldRating.save();
	
	console.log(oldRating.rating);
	res.send(oldRating);

})

showRouter.put("/:showId/updates", async (req,res) => {
       
    

        let oldRating = await Show.findAll({
                where: {
                        id: req.params.showId
                }
        });

        console.log(oldRating);

        oldRating = oldRating[0]

	let newrating;
	
	console.log(oldRating.status)

        if(oldRating.status == "on-going"){
		newrating = "canceled"
	}else{
		newrating = "on-going"


	}

	oldRating.set({status: newrating});

        console.log(oldRating.status);
        await oldRating.save();

        console.log(oldRating.status);
        res.send(oldRating);

})


module.exports = showRouter;
