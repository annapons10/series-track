//Funcion que simula la lógica de lo que quiero testear: 
function getSortedSeries(sort, seriesEncontradas) {
    return sort ? 
        [...seriesEncontradas].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }) : seriesEncontradas;
} 

//Escribir prueba, que cuando sort es true, ordena, si es false, no ordena : 

describe('getSortedSeries', () => {
    it('Debería ordenar las series por fecha si sort es true', () => {
        //Simulo series: 
        const series = [
            {name: 'Serie A', date:'2022-01-01'},
            {name: 'Serie B', date:'2023-01-01'},
            {name: 'Serie C', date:'2021-01-01'}
        ];
        //Hago la llamada:
        const sortedSeries = getSortedSeries(true, series);
        //Compruebo que están ordenadas por fecha: 
        expect(sortedSeries).toEqual([
            {name: 'Serie B', date:'2023-01-01'},
            {name: 'Serie A', date:'2022-01-01'},
            {name: 'Serie C', date:'2021-01-01'}
        ]);
    });

    it('Deberia devolver las series sin ordenar si sort es false', () => {
        //Simulo series: 
        const series = [
            {name: 'Serie A', date:'2022-01-01'},
            {name: 'Serie B', date:'2023-01-01'},
            {name: 'Serie C', date:'2021-01-01'}
        ];

        const sortedSeries  = getSortedSeries(false, series);

        expect(sortedSeries).toEqual([
            {name: 'Serie A', date:'2022-01-01'},
            {name: 'Serie B', date:'2023-01-01'},
            {name: 'Serie C', date:'2021-01-01'}
        ]); 
    })

}); 