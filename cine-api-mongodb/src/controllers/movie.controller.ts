import { Request, Response } from "express";
import Movie, { IMovie } from "../models/movie";

export const addMovie = async (req: Request, res: Response) => {
  const { titulo, categoria, imagen, description }: IMovie = req.body;

  if (!titulo || !categoria || !imagen || !description) {
    return res.status(400).json({ msg: "Please. Send all info" });
  }
  const movie = await Movie.findOne({ titulo: titulo });
  if (movie) {
    return res.status(400).json({ msg: "The movie already exists" });
  }

  const newMovie = new Movie(req.body);

  await newMovie.save();

  return res.status(200).json({ msg: "movie added correctly" });
};

export const getMovie = async (req: Request, res: Response) => {
  const getAllMovies = await Movie.find({});

  return res.status(200).send({ data: getAllMovies });
};

export const getByIdMovie = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const getByIdMovie = await Movie.findOne({ _id: id });
    return res.status(200).send(getByIdMovie);
  } catch (error) {
    return res.status(400);
  }
};
