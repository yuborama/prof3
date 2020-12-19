import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

import Config from "../config/config";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    await fetch(`${Config.url}/movies`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  return (
    <div className={styles.containerFull}>
      <span className={styles.titlePage}>Catalogo</span>

      <div className={styles.container}>
        {data.map((item) => (
          <Link href={`/pelicula/${item._id}`}>
            <div
              className={styles.movie}
              style={{
                backgroundImage: `url('${item.imagen}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className={styles.movieContainer}>
                <span className={styles.titleMovie}>{item.titulo}</span>
                <span className={styles.categoryMovie}>{item.categoria}</span>
              </div>
            </div>
          </Link>
        ))}
        <Link href="reserva">
          <a className={styles.buttonReservation}>Reservar Pelicula</a>
        </Link>
      </div>
    </div>
  );
}
