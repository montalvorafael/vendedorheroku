/* eslint-disable no-plusplus */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable guard-for-in */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// librerias

import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import {
  Container, Row, Col, FormGroup,
} from 'reactstrap';

// css
import 'bootstrap/dist/css/bootstrap.min.css';

// componentes
import LabelVendedor from '../componentes_comunes/banner';
import Separador from '../componentes_comunes/separador';
import registerIcon from '../../Imagenes/registerIcon.png';

// constantes
// import * as Url from '../../Recursos/Constantes/HTTP/http-url';
// import { Component } from 'react/cjs/react.production.min';

// const cookies = new Cookies();

 

const VendedorAdd = () => {

  const history = useHistory();

  const [vendedor, setVendedor] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    cedula: '',
    edad: '',
    direccion: '',
  });

  const onInputChange = (e) => {
    setVendedor({ ...vendedor, [e.target.name]: e.target.value });
  };

  function datosLlenos() {
    const data = {
      username: vendedor.username,
      password: vendedor.password,
      email: vendedor.email,
      first_name: vendedor.first_name,
      last_name: vendedor.last_name,
      cedula: vendedor.cedula,
      edad: vendedor.edad,      
      posee_vehiculo : document.getElementById("checkboxBu").checked,
      direccion: vendedor.direccion
    };
    // console.log(data)
    if(vendedor.username === '' || vendedor.email === '' || vendedor.password === '' || vendedor.password2 === '' ||vendedor.first_name=== '' || vendedor.last_name === '' || vendedor.cedula  === '' || vendedor.edad === '' || vendedor.edad  === '' || vendedor.direccion === ''  ){
      alert("No ha llenado todos los datos!")
    }else if(vendedor.password.length <8){
      alert("La contrasena debe tene al menos 8 digitos")
    }else if(!(vendedor.password===vendedor.password2)){
      alert("Las contrasenas no coinciden!")

    }else{
      ValidarDatos(data)
      // crearVendedor(data)
    }

  }

  const ValidarDatos = async (data) =>{
    const token = 'ef5ea9da4c96618c11cc5d0cc38e8e73dda6375c'
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },

    };
    
    function alerta(id){
      alert("El " + id+ " ingresado ya existe, intente con otro");
    }
    await axios
      .get('http://localhost:8000/usuarios/allvendedor',  options)
      .then((res) => {
        const db = res.data
        let condicion = true
        for( let userdb of db){
          const usuariodb = userdb.username          
          const correodb = userdb.email
          if (data.username === usuariodb){ 
            alerta("usuario","username")
            condicion = false
          }else if(data.email === correodb){
            alerta("correo", "correo")
            condicion = false
          }
        }
        console.log(data)
        if(condicion){
          crearVendedor(data)
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
    });
  }

  const crearVendedor = async (data) => {
    const token = 'ef5ea9da4c96618c11cc5d0cc38e8e73dda6375c'
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);

    }  
    console.log("hola")
    console.log(data)
    console.log(formData + "   fromdata")
    await axios
      .post('http://localhost:8000/usuarios/registrar_vendedor', formData, options)
      .then((res) => {
        console.log(res);
        window.alert("Usuario creado Exitosamente");
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      });
  };

  return (
    <div>
      <LabelVendedor />
      <Separador nombre="Registro" />
      <div className="container">
        <Container>
          <Container id="form-cont">
            <Row>
              <Col>
                <form id="comiAdd">
                  <Row>
                    <Col className="py-1" xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Nombre:</label>
                        <input
                          required
                          className="form-control"
                          name="first_name"
                          type="text"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Apellido:</label>
                        <input
                          required
                          className="form-control"
                          name="last_name"
                          type="text"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="py-1" xs="6" xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Cedula:</label>
                        <input
                          required
                          className="form-control"
                          name="cedula"
                          type="text"
                          maxLength="10"
                          pattern="\d{10}"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="6" xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Direccion:</label>
                        <input
                          required
                          className="form-control"
                          name="direccion"
                          type="text"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="py-1" xs xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Usuario:</label>
                        <input
                          required
                          className="form-control"
                          name="username"
                          type="text"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs="6" xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>F. Nacimiento:</label>
                        <input
                          required
                          className="form-control"
                          name="edad"
                          type="date"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className='d-xl-none'>
                  <Col xs="6" xl="10">
                        <FormGroup className="groupf mb-3">
                        <label>Email:</label>
                        <input
                          required
                          className="form-control"
                          name="email"
                          type="email"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className="groupf mb-3">
                        <label>Contraseña:</label>
                        <input
                          required
                          className="form-control"
                          name="password2"
                          type="password"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>  
                    </Col>
                    <Col xs xl="10">
                    <FormGroup className="groupf mb-3">
                        <label>Conf. Contraseña:</label>
                        <input
                          required
                          className="form-control"
                          name="password"

                          type="password"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="py-1" xs="6" xl="10">
                      <FormGroup className="groupf mb-3">
                      <label>Posee vehiculo:</label>                         
                            <input
                                required
                                id = "checkboxBu"
                                name="checkbox"
                                type="checkbox"
                            /> 
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </Col>
              <Col className="col d-xl-block d-none">
                <img src={registerIcon} width="381" height="381" alt="descri" />
                <Row>
                    <Col className="py-1" xs xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Email:</label>
                        <input
                          required
                          className="form-control"
                          name="email"
                          type="email"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="py-1" xs xl="10">
                    <FormGroup className="groupf mb-3">
                        <label>Contraseña:</label>
                        <input
                          required
                          className="form-control"
                          name="password2"
                          type="password"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>  
                    </Col>
                    <Col className="py-1" xs="6" xl="10">
                      <FormGroup className="groupf mb-3">
                        <label>Repita la Contraseña:</label>
                        <input
                          required
                          className="form-control"
                          name="password"

                          type="password"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                      </Col>
                  </Row>
              </Col>
            </Row>
            <Row className="justify-content-center">
                  <div className="d-flex w-25 mt-5 mb-5 mt-2 justify-content-around">
                    <button
                      onClick={() => datosLlenos()}
                      className="btn btn-jamasama addbuts mr-3"
                      to="/vendedor/add"
                    >
                      Registrarse
                    </button>
                    <button
                      onClick={() => history.push('/')}
                      className="btn btn-danger addbuts"
                    >
                      Cancelar
                    </button>
                  </div>
                </Row>
          </Container>
        </Container>
      </div>
    </div>
  );
};
export default VendedorAdd;
