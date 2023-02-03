import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

/* FUNCIÓN QUE CREA UN CARD */
const card = (character) => {
  return (
    <Col key={character.id} className="col-4">
      <Card style={{ textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }} >
        <Card.Img variant="top" src={character.image} />
        <Card.Body >
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <span className="row text-sm-start" > {character.species}</span>
            <span className="row text-sm-start" >{character.origin.name}</span>
            <span className="row text-sm-start" >{character.gender}</span>
            <span className="row text-sm-start" >{character.type}</span>
          </Card.Text>
          <Button variant="outline-primary">View</Button>{' '}
        </Card.Body>
      </Card>
    </Col>);
};

/* FUNCIÓN QUE CREARA LOS CARDS */
const cards = (characters) => {
  // RECORRER LISTA INGRESADA
  const cards = characters.map((character) => (
    //INVOCAR FUNCIÓN PARA GENERAR UN CARD
    card(character)
  ));
  return (<Row id="characters" className="g-4">{cards}</Row>);
};



// FUNCIÓN QUE CREA UN COMPONENTE CUSTOMFORM
export const CustomForm = () => {

  /* LLAMADO DE API PERSONAJES RICK & MORTY*/
  const apiRickAndMortyCharacter = async () => {
    // Documentacion API https://rickandmortyapi.com/documentation
    const url = 'https://rickandmortyapi.com/api/character';
    const response = await fetch(url)
    const data = await response.json()
    const arr = data.results.sort((a, b) => {
      //  ORDENAR POR NOMBRE DE LA A A LA Z
      if (a.name < b.name) {
        return -1;
      }
    });
    setCharacters(arr);
    setCopyCharacter(arr);
  };

  // CREACIÓN LISTADO DE PERSONAJES
  const [characters, setCharacters] = useState([]);
  const [copyCharacter, setCopyCharacter] = useState([]);

  // CREACIÓN HOOK
  useEffect(() => {
    apiRickAndMortyCharacter();
  }, []);

  // FUNCIÓN PARA FILTRAR PERSONAJES
  const filter = (value) => {
    console.log('value: ', value);
    // INPUT VACIO CARGA LISTA COPIADA
    if (value === undefined || value === '') {
      setCharacters(copyCharacter.slice(0));
    } else {
      // USAR UNA COPIA DE LA LISTA PARA FILTRAR
      const copy = copyCharacter.slice(0);
      // LISTA CON ELEMENTOS FILTRADOS
      let filtrada = [];
      // SE APLICA FILTRO PARA BUSCAR CONTENIDO DENTRO DE LA PROPIEDA NOMBRE OMITIENDO MAYUSCULAS Y MINUSCULAS
      filtrada = copy.filter(character => character.name.toUpperCase().includes(value.toUpperCase().trim()));
      // SI EL FILTRO NO ENCUENTRA ELEMENTOS SE DEFINE EL FILTRO COMO ARREGLO VACIÓ
      if (filtrada === undefined) {
        filtrada = [];
      }else{
        filtrada.sort((a, b) => {
          //  ORDENAR POR NOMBRE DE LA A A LA Z
          if (a.name < b.name) {
            return -1;
          }
        });
      }
      // SE ACTUALIZA ARREGLO DE PERSONAJES
      setCharacters(filtrada)
    }
  };

  // CREACIÓN DE COMPONENTE CUSTOMFORM
  return (
    <div style={{ maxWidth: "1024px", margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
      <Form >
        <Row className="g-2 bg-dark text-white py-2">
          <Col md>
            <h4>Buscador de Personajes (Rick & Morty)</h4>
          </Col>
          <Col md>
            <Form.Control type="text" placeholder="Buscar un colaborador"
              name='buscarColaborador' onChange={(e) => { filter(e.target.value) }} />
          </Col>
        </Row>
        {cards(characters)}
      </Form>
    </div>
  );
};

export default CustomForm;