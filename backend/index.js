import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import tourRoute from "./routes/tours.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path  from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
    credentials: true
};

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (err) {
        console.log("DB Connection Failed", err);
        process.exit(1);
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


app.use('/api/users', userRoute);
app.use('/api/tours', tourRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/review', reviewRoute);


app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get('*' , (req , res ) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
})

const startServer = async () => {
    await connect();
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

startServer();
