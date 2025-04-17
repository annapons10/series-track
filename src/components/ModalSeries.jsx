import { useState } from 'react';
import { useRating } from '../hooks/useRating';
//Icons estrellas: 
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Rating from 'react-rating';


export default function ModalSeries({ setIsModalOpen, serieSelected }) {
    //Custom hook para las clasificaciones:
    const { rating, handleRatingChange } = useRating({ serieSelected });
    //Estado para añadir transición al cerrar el modal :
    const [isClose, setIsClose] = useState(false); 

    const handdleClosingModal = () => {
        //Se cierra el componente, se re-renderiza, lee el valor y aplica la transición en class condicional: 
        setIsClose(true);

        setTimeout(() => {
            setIsModalOpen(false)
        }, 500)
    }

    return (
        <>
            {/* Fondo transparente: */}
            <div className='fondo-transparent'></div>
            <div className='modal-series' > {/* Este es el contenedor principal */}
                <div className="modal" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className={`${isClose ? 'close-modal' : 'open-modal'} modal-content modal-container`}>
                            <div className="modal-header">
                                <h1 className="h1" >{serieSelected.name}</h1>
                                <button type="button" className=" btn-close-modal" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => handdleClosingModal()}> X </button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${serieSelected.poster}`}
                                    alt={`Poster de ${serieSelected.name}`}
                                />
                                <p className='p-overview'> {serieSelected.overview} </p>
                                <p className='p-votos'> Media: {serieSelected.average} </p>
                                <p> Votos: {serieSelected.count} </p>

                                {/* Las estrellas para votar. */}
                                {/* Se verá lo que hay en estado gestionado por el useEffect, cada vez que cambie, se llamará al método para actualizar el localStorage:  */}
                               <Rating initialRating={rating} onChange={handleRatingChange}
                                    emptySymbol={<FaRegStar size={24} />}
                                    fullSymbol={<FaStar size={24} />} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}