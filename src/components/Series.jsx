import { useState } from 'react' 

export function Series ({ seriesEncontradas, handleButtonInfo, serieSelected }) {
   //Estados para controlar el modal:
   const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <>
            <ul className='movies'>
                { seriesEncontradas?.map((serie) => (
                    <button key={ serie.id } type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalSerie1" onClick={ () => {  
                        handleButtonInfo(serie.id) 
                        setIsModalOpen(true) } } >
                        <li  className='movie'>
                            <h3>{ serie.name }</h3>
                            <p>{ serie.date }</p>
                            <img 
                            src={`https://image.tmdb.org/t/p/w200${serie.poster}`} 
                            alt={`Poster de ${serie.name}`} 
                            />
                        </li>
                    </button>
                
                ))}

            </ul>
            {/* Recibo la key de la serie clickada: */}
            { isModalOpen && serieSelected && (
                <>
               {/* Fondo transparente: */}
                <div></div>
                <div > {/* Este es el contenedor principal */}
                    <div className="modal" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content modal-container">
                        <div className="modal-header">
                            <h1 className="h1" >{ serieSelected.name }</h1>
                            <button type="button" className=" btn-close-modal" data-bs-dismiss="modal" aria-label="Close"
                            onClick={ () => setIsModalOpen(false) }> X </button>
                        </div>
                        <div className="modal-body">
                            <img 
                                src={`https://image.tmdb.org/t/p/w200${serieSelected.poster}`} 
                                alt={`Poster de ${ serieSelected.name }`} 
                            />
                            <p className='p-overview'> { serieSelected.overview } </p>
                            <p className='p-votos'> Media: {serieSelected.average } </p>
                            <p> Votos: { serieSelected.count } </p>

                            {/* Las estrellas para votar. */}
                            
                        </div> 
                        </div>
                    </div>
                    </div>
                
                </div> 
                </>
            )}
        </>
      
      
    )
}