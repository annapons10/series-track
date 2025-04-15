# Series Track

**Series Track** es una aplicación web desarrollada en React para ayudar a los usuarios a realizar un seguimiento de las series de televisión que están viendo. Permite buscar series, ver detalles sobre ellas y puntuar las que el usuario ha visto. Utiliza la API de TMDb para obtener la información de las series y **`localStorage`** para guardar las puntuaciones de cada usuario.

## Características

- **Búsqueda de Series**: Busca cualquier serie de televisión usando la API de TMDb.
- **Detalles de las Series**: Muestra detalles completos de la serie como sinopsis, actores, etc.
- **Sistema de Puntuación**: Los usuarios pueden puntuar las series que han visto utilizando un sistema de estrellas.
- **Persistencia de Puntuaciones**: Las puntuaciones de las series se guardan en el **`localStorage`** y persisten entre sesiones.
- **Interfaz Responsiva**: La aplicación está diseñada para ser completamente responsiva y fácil de usar en dispositivos móviles y escritorios.

## Tecnologías Usadas

- **React**: Para construir la interfaz de usuario.
- **TMDb API**: Para obtener información sobre series de televisión.
- **localStorage**: Para almacenar las puntuaciones de los usuarios.
- **React Hooks**: Para manejar el estado y los efectos dentro de la aplicación.
  - **useState**
  - **useEffect**
  - **useMemo**
  - **useCallback**
  - **useRef**
  - **debounce** 