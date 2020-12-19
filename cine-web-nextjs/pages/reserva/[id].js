import styles from "../../styles/reserva[id].module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Config from "../config/config";

export default function Home() {
  const [data, setData] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (id) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      };

      await fetch(`${Config.url}/reservationById`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      {data && (
        <div className={styles.containerReservation}>
          <img className={styles.imagenStyled} src={data.imagen} />
          <div className={styles.containerResevationSit}>
            <span className={styles.containerSitTitle}> {data.titulo}</span>
            <div className={styles.containerSit}>
              {data.salas.map((item, index) => (
                <div
                  className={
                    data.salas[index].estado ? "salaTrue" : "salaFalse"
                  }
                  onClick={(e) => {
                    data.salas[index].estado = !data.salas[index].estado;
                    if (data.salas[index].estado) {
                      e.target.className = "salaTrue";
                    } else {
                      e.target.className = "salaFalse";
                    }
                  }}
                >
                  {item.asiento}
                  {item.fila}
                </div>
              ))}
            </div>
            <div className={styles.containerButton}>
              <Link href="/">
                <a className={styles.buttonReservation}> {`Volver`}</a>
              </Link>
              <button
                onClick={async () => {
                  if (id) {
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        idMovie: id,
                        updateReservation: data.salas,
                      }),
                    };

                    await fetch(
                      "http://localhost:4000/updatereservation",
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        router.push("/reserva");
                      });
                  }
                }}
                className={styles.buttonReservationDone}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {!data && (
        <div>
          no se encuentra la pelicula
          <Link href="/">
            <a className={styles.buttonReservation}> {`Volver`}</a>
          </Link>
        </div>
      )}
    </div>
  );
}
