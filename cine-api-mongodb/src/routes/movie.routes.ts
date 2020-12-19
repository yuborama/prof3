import { Router } from "express";
import { addMovie, getMovie } from "../controllers/movie.controller";
const router = Router();

router.post("/addmovie", addMovie);
router.get("/movies", getMovie);

export default router;
