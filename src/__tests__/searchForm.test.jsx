import { App } from '../App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


test('Buscar una serie  y que se muestre en pantalla', async() => {

    //Renderizo el componente: 
    render(<App />);

    //Obtener el botón y el input: 
    const button = screen.getByRole('button', { name: /Buscar/i });
    const input = screen.getByPlaceholderText(/Shameless, Breaking Bad.../i);

    //Simulo escribir en el input y hacer click en el botón: 
    fireEvent.change(input, {target: {value: 'Breaking Bad'}});
    fireEvent.click(button);

    //Espero a que lleguen los resultados:
    const results = await screen.findAllByText(/Breaking Bad/i); 
    // Comprobruebo que se encontró al menos un resultado
    expect(results.length).toBeGreaterThan(0);

}); 