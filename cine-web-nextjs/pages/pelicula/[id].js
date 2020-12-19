import styles from "../../styles/reserva[id].module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Config from "../../config/config";

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

      await fetch(`${Config.url}/movie`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
            <div className={styles.containerSitTitleContainer}>
              <span className={styles.containerSitTitle}> {data.titulo}</span>
              <span className={styles.containerSitTitleCategory}>
                {data.categoria}
              </span>
            </div>
            <span className={styles.containerSitTitleDesc}>{data.description}</span>

            <div className={styles.containerButton}>
              <Link href="/">
                <a className={styles.buttonReservation}> {`Volver`}</a>
              </Link>
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
