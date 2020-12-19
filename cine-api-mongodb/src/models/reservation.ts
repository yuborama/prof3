import { model, Schema, Document, Types } from "mongoose";

export interface IReservation extends Document {
  titulo: string;
  categoria: string;
  imagen: string;
  salas: [{ asiento: string; fila: string; estado: string }];
}

const ReservationSchema = new Schema(
  {
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    imagen: { type: String, required: true },
    salas: [{ _id: false, asiento: String, fila: String, estado: Boolean }],
  },
  {
    timestamps: true,
  }
);

export default model<IReservation>("reservations", ReservationSchema);
