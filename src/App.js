import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {


  // state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    
    const consultarApi = async () => {

        if(consultar) {

      const appId = '81505b49a847b4eeabd054fdc7e07489';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
      guardarConsultar(false);


                
        if(resultado.cod === "404"){
          guardarError(true);
        } else {
          guardarError(false);
        }

      }
      
    }
    consultarApi();

  }, [consultar]);



  let componente;

  if(error) {
    componente = <Error mensaje = "No hay resultados" />
  } else {
    componente = <Clima
                resultado = {resultado}
                />
  }



  return (
    <Fragment>
      <Header
        titulo = 'Clima React App'
      />

      <div className="contenedor-form">
          <div className="container">
            <div className="row">
                <div className="col m6 s12">
                      <Formulario
                        busqueda = {busqueda}
                        guardarBusqueda = {guardarBusqueda}
                        guardarConsultar = {guardarConsultar}
                      />
                </div>

                <div className="col m6 s12">
                     {componente}
                </div>
            </div>
          </div>
      </div>
    </Fragment>
  );
}

export default App;
