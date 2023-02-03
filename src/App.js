import React, { useState } from 'react';
import Headers from './Components/Headers';
import CustomForm from './Components/CustomForm';
import Footer from './Components/Footer';
import Container from 'react-bootstrap/Container';

function App(){

  return (
    <Container>
      <Headers/>
      <CustomForm/>
      <Footer/>
    </Container>
  );
}

export default App;
