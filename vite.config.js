import { defineConfig } from "vite"; 
import react from '@vitejs/plugin-react'

//Función proporcionada por Vite para facilitar la configuración de los archivos de configuración de Vite. Retorna un objeto de config. 
export default defineConfig (
    {
        base:'/Series/',
        plugins: [react(), ],
        test: {
            globals:true, 
            environment: 'jsdom'
        }
    }
)