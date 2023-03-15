const express = require("express")
const app = express();

const {User, Show}  = require("./models/index")

const port = 3000;

const {db} = require("./db");

const userRouter = require("./users");
const showRouter = require("./shows");



app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/shows", showRouter);

app.listen(port, () => {
	db.sync();
	console.log(`Server listening at http://localhost:${port}`);
})
