// import modules
import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()


// app
const app = express();


// db
const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));


// middleware
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));



// routes
import testRoutes from "./routes/test.js";
import userRoute from "./routes/userRoute.js"

// for testing purposes
app.use("/", testRoutes);

// use the userRoute for routes starting with '/users'
app.use("/users", userRoute);



// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);