import styles from "../../styles/reserva[id].module.css";
import { useEffect, useState, createRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Config from "../../config/config";

export default function Home() {
  const [data, setData] = useState();
  const [reservas, setReservas] = useState([]);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const inputName = createRef();
  const inputCedula = createRef();
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
        .then((dataRes) => {
          setData(dataRes);
        });
    }
  }, []);

  return (
    <>
      {modal && (
        <div className={styles.modal}>
          <input
            className={styles.input}
            ref={inputName}
            placeholder="Inserte su Nombre"
          />
          <input
            className={styles.input}
            ref={inputCedula}
            placeholder="Inserte su Cedula"
          />
          <button
            className={styles.buttonReservationDone}
            onClick={async () => {
              const nombre = inputName.current.value;
              const cedula = inputCedula.current.value;
              const asientosTemp = reservas;
              console.log(asientosTemp);
              if (id && nombre != "" && cedula != "") {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    nombre: nombre,
                    cedula: cedula,
                    idMovie: id,
                    updateReservation: data.salas,
                    reservas: [{ idPelicula: id, asientos: asientosTemp }],
                  }),
                };
                await fetch(`${Config.url}/updateUser `, requestOptions)
                  .then((response) => response.json())
                  .then((data) => {
                    setModal(false);
                    router.push("/reserva");
                  });
              } else {
                alert("Por favor ingrese todos los datos");
              }
            }}
          >
            Guardar
          </button>
        </div>
      )}
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
                      const tempData = data;
                      const reserva = reservas;
                      tempData.salas[index].estado = !tempData.salas[index]
                        .estado;
                      setData(tempData);
                      reserva.push({
                        asiento: tempData.salas[index].asiento,
                        fila: tempData.salas[index].fila,
                      });
                      setReservas(reserva);
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
                    setModal(!modal);
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
    </>
  );
}
