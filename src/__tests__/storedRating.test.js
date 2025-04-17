//Test vitest para verificar que se actualizan y se guardan correctamente las puntuaciones en localStorage: 
import { renderHook, act } from '@testing-library/react'
import { useRating } from '../hooks/useRating'; 
import { beforeEach } from 'vitest';

//Hacer un mock del localStorage:
const localStorageMock = (() => {
    let store = {}; 

    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString()
        }),
        clear: () => {
            store = {}
        },
    }
})(); //<----La ejecuto inmediatamente para que se guarde correctamente.

//Inyectar el localStorage mockeado para que jsdom no use el localStorage que existe en su entorno :
Object.defineProperty(window, 'localStorage', {
    value:localStorageMock,
});

//Nombre y estructura a un conjunto de pruebas relacionadas with describe(): 
describe('useRating', () => {
    //Se ejecuta antes de cada prueba para que empece con vacío: 
    beforeEach(() => {
        window.localStorage.clear()
    }); 

    it('Debería guardar la puntuación en localStorage al cambiarla', () => {
        //Creo una serieSelected:
        const serieSelected = { id: 1, name: 'Stranger Things'}; 
        //Se la paso a useRating renderizándoel hook y en result tengo el return de useRating: 
        const { result } = renderHook(() => useRating( {serieSelected} )); 

        //Simular un cambio de estado o efectos en el componente: 
        act(() => {
            result.current.handleRatingChange(4); 
        }); 

        //Verificar que localStorage ha sido llamado con los parámetros correctos: 
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            '1',4
        ); 
        
    })


})