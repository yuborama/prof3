import { Router } from "express";
import {
  addMovie,
  getMovie,
  getByIdMovie,
} from "../controllers/movie.controller";
const router = Router();

router.post("/addmovie", addMovie);
router.get("/movies", getMovie);
router.post("/movie", getByIdMovie);

export default router;
