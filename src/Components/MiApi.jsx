  
  
  /* LLAMADO DE API PERSONAJES RICK & MORTY*/
  const apiPersonajesRickYMorti = async () => {
    // Documentacion API https://rickandmortyapi.com/documentation
    const url = 'https://rickandmortyapi.com/api/character';
    const response = await fetch(url);
    const data = await response.json();
    const arr = data.results.sort((a, b) => {
      //  ORDENAR POR NOMBRE DE LA A A LA Z
      if (a.name < b.name) {
        return -1;
      }
    });
    return arr;
  };
