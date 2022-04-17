//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import Cookies from "universal-cookie";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

//componentes

import NavBar from "../Comunes/navbar";
import LabelVendedor from "../Comunes/label_vendedor";
import { Separador } from "../Comunes/separador";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

//constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";

const cookies = new Cookies();

const Home = (props) => {
  const [comidas, setComida] = useState([]);
  const [logged, setLogged] = useState(true);

  const comprobacion = () => {
    if (!cookies.get("token")) {
      setLogged(false);
    } else {
      document.title = "Comidas";
      return;
    }
  };

  useEffect(() => {
    comprobacion();
    loadComidas();
  }, []);

  const loadComidas = async () => {
    const result = await axios.get(Url.url_get_comidas);
    setComida(result.data.reverse());
    console.log(comidas);
  };

  const deleteComida = async (id) => {
    let token = cookies.get("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    await axios.delete(Url.url_crud_comida + `/${id}`, options);
    loadComidas();
  };

  if (!logged) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <NavBar {...props} />
        <LabelVendedor />
        <Separador nombre="Comidas" />
        <div className="py-4 container">
          <Link id="addhome" className="btn btn-light" to="/comidas/add">
            Añadir otra comida<Icon.Plus className="iconplus"></Icon.Plus>
          </Link>
          <Container id="containerComida">
            <Row>
              {comidas.map((comida, i) => (
                <Col key={i} className=" py-3" xs lg="4" md="6">
                  <Card body outline color="success">
                    <CardImg
                      top
                      src={Url.url_static + comida.imagen}
                      alt="Card image comida"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{comida.nombre}</CardTitle>
                      <CardText>
                        <span>
                          <Link
                            className="links-comida"
                            to={`/comidas/edit/${comida.id}`}
                          >
                            <Icon.Pencil
                              id="edit"
                              className="iconos"
                            ></Icon.Pencil>
                          </Link>
                        </span>
                        <span>
                          <label
                            className="links-comida"
                            onClick={() => deleteComida(comida.id)}
                          >
                            <Icon.DashCircleFill
                              id="delete"
                              className="iconos"
                            ></Icon.DashCircleFill>
                          </label>
                        </span>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
};

export default Home;
