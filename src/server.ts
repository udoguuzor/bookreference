import express,{Express} from "express"
import "dotenv/config"
import connectDB from "./config/dataBase";
import { userRouter } from "./Routes/userRoutes";
import { bookRouter } from "./Routes/BookRoutes";
import { mwLoggin } from "./mwLoggin/mwloggin";

const app:Express = express();
app.use(express.json());
app.use(mwLoggin)
app.use("/api/user",userRouter)
app.use("/api/books",bookRouter)
const PORT = process.env.PORT;
connectDB()




app.listen(PORT, ()=>{
    console.log(`App is listening to http://localhost:${PORT}`)
})



