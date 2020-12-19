import { Router } from "express";
import {
  addReservation,
  updateReservation,
  getAllReservations,
  getByIdReservations,
} from "../controllers/reservation.controller";
const router = Router();

router.post("/addreservation", addReservation);
router.post("/updatereservation", updateReservation);
router.get("/reservations", getAllReservations);
router.post("/reservationById", getByIdReservations);

export default router;
