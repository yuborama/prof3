import { Request, Response } from "express";
import Reservation, { IReservation } from "../models/reservation";
import User, { IUser } from "../models/user";

export const addReservation = async (req: Request, res: Response) => {
  const { titulo, categoria, imagen, salas }: IReservation = req.body;

  if (!titulo || !categoria || !imagen || !salas) {
    return res.status(400).json({ msg: "Please. Send all info" });
  }
  const reservation = await Reservation.findOne({ titulo: titulo });
  if (reservation) {
    return res.status(400).json({ msg: "The movie already exists" });
  }

  const newReservation = new Reservation(req.body);

  await newReservation.save();

  return res.status(200).json({ msg: "movie added correctly" });
};

export const updateReservation = async (req: Request, res: Response) => {
  const { idMovie, updateReservation } = req.body;

  if (!idMovie || !updateReservation) {
    return res.status(400).json({ msg: "Please. Send all info" });
  }
  try {
    await Reservation.findOne({ _id: idMovie });

    await Reservation.findByIdAndUpdate(idMovie, { salas: updateReservation });

    return res.status(200).json({ msg: "movie update correctly" });
  } catch (error) {
    return res.status(400).json({ msg: "The movie not exists" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { cedula, nombre, reservas, idMovie, updateReservation } = req.body;

  if (!idMovie || !updateReservation || !cedula || !nombre || !reservas) {
    return res.status(400).json({ msg: "Please. Send all info" });
  }

  try {
    await Reservation.findOne({ _id: idMovie });

    try {
      const UserSearch = await User.findOne({ email: cedula });
      await User.findByIdAndUpdate(UserSearch._id, {
        reservas: reservas,
      });
      await Reservation.findByIdAndUpdate(idMovie, {
        salas: updateReservation,
      });
      return res.status(200).json({ msg: "User Update Correctly" });
    } catch (error) {
      const newUser = new User({
        nombre,
        cedula,
        email: cedula,
        reservas: reservas,
      });
      newUser.save();
      await Reservation.findByIdAndUpdate(idMovie, {
        salas: updateReservation,
      });
      return res.status(200).json({ msg: "User Created correctly" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "The movie not exists" });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  const getAllReservation = await Reservation.find({});

  return res.status(200).send(getAllReservation);
};

export const getByIdReservations = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const getByIdReservation = await Reservation.findOne({ _id: id });
    return res.status(200).send(getByIdReservation);
  } catch (error) {
    return res.status(400);
  }
};
