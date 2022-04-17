/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory, useParams } from 'react-router-dom';
import {
  Container, Row, Col, FormGroup,
} from 'reactstrap';

// css
import './Vendedor.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// componentes
import NavBar from "../Comunes/navbar";
import LabelVendedor from "../Comunes/label_vendedor";
import { Separador } from "../../Componentes/Comunes/separador";

// constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";

const cookies = new Cookies();
const VendedorEdit = (props) => {
  const history = useHistory();
  const id  = cookies.get("userID")
  console.log('EL ID');
  console.log(id);
  const [vendedor, setVendedor] = useState({
    id_user: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  const {
    username, first_name, last_name, email,
  } = vendedor;

  const onInputChange = (e) => {
    setVendedor({ ...vendedor, [e.target.name]: e.target.value });
  };

  const loadVendedor = async () => {
    const token = cookies.get('token');
    console.log('TOKEN');
    console.log(token)
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const result = await axios.get(Url.url_vendedor + id, options);
    setVendedor(result.data);
  };

  useEffect(() => {
    loadVendedor();
  }, []);

  const actualizarVendedor = async (e) => {
    // e.preventDefault();
    const token = cookies.get('token');
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      id_user: vendedor.id_user,
      username: vendedor.username,
      first_name: vendedor.first_name,
      last_name: vendedor.last_name,
      email: vendedor.email,
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await axios
      .put(Url.url_vendedor + id, formData, options)
      .then((res) => {
        // console.log(res)
        alert('Usuario actualizado');
        history.push('/reportes');
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      });
  };

  return (
    <div>
      <NavBar {...props} />
      <LabelVendedor />
      <Separador nombre="Editar" />
      <div className="container">
        <Container>
          <Container id="form-cont">
            <form id="comiAdd">
              <Row>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Usuario:</label>
                    <input
                      id="inpnom"
                      required
                      className="form-control"
                      name="username"
                      value={username}
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Email:</label>
                    <input
                      required
                      className="form-control"
                      name="email"
                      type="text"
                      value={email}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Nombre:</label>
                    <input
                      required
                      className="form-control"
                      name="first_name"
                      type="text"
                      value={first_name}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Apellido:</label>
                    <input
                      required
                      className="form-control"
                      name="last_name"
                      type="text"
                      value={last_name}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </form>

            <div className="d-flex w-50 mb-5 mt-2 justify-content-around">
              <button
                onClick={() => actualizarVendedor()}
                className="btn btn-jamasama addbuts"
                to="/vendedor/add"
              >
                Actualizar
              </button>
              <button
                onClick={() => history.goBack()}
                className="btn btn-danger addbuts"
              >
                Cancelar
              </button>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default VendedorEdit;
