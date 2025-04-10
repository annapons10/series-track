import mockData from '../mocks/with-results.json'

export function Series ({ seriesEncontradas }) {
   // const series = mockData.results;

    return(
        
        <ul className='movies'>
            { seriesEncontradas?.map((serie) => (
                <li key={ serie.id }  className='movie'>
                    <h3>{ serie.name }</h3>
                    <p>{ serie.date }</p>
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${serie.poster}`} 
                      alt={`Poster de ${serie.name}`} 
                    />
                </li>
            ))}

        </ul>
      
      
    )
}