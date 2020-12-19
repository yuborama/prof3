import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import movieRoute from "./routes/movie.routes";
import reservationRoute from './routes/reservation.routes'

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", (req, res) => {
  res.send(`The api is at http://localhost:${app.get("port")}`);
});

app.use(movieRoute);
app.use(reservationRoute);

export default app;
