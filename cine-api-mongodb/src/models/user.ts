import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  cedula: string;
  reservas: [
    { idPelicula: string; asientos: [{ asiento: string; fila: string }] }
  ];
}

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    unique: false,
    required: true,
  },
  reservas: [
    {
      _id: false,
      idPelicula: String,
      asientos: [{ _id: false, asiento: String, fila: String }],
    },
  ],
});

export default model<IUser>("Users", UserSchema);
