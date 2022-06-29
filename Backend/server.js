const express = require('express');
const app = express();
const connectDB = require("./config/config")
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')

connectDB();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res, next)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to my crud api"
    })
})

const userRouter = require('../Backend/routes/userRoute')


app.use(express.json());
app.use(cors())
app.use('/api', userRouter);
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});