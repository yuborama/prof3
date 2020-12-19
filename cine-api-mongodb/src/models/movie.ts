import { model, Schema, Document } from "mongoose";

export interface IMovie extends Document {
  titulo: string;
  categoria: string;
  imagen: string;
  description: string;
}

const MovieSchema = new Schema(
  {
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    imagen: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IMovie>("movies", MovieSchema);
