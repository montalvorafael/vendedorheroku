//librerias
import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardText,
} from "reactstrap";
//css
import "./pedidos.css";
// Constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";

class PedidoU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notas: props.notas,
      fecha: props.fecha,
      hora: props.hora,
      direccion: props.direccion,
      urlPic: props.urlPic,
      estado: props.estado,
      nombreComida: props.nombreComida,
    };
  }

  render() {
    return (
      <div className="container-fluid px-5 py-3 w-90">
        <Row xs="1">
          <Col
            md={{ size: "4", offset: "1" }}
            lg={{ size: "3", offset: "2" }}
            className="py-3 "
          >
            <Card>
              <CardImg
                top
                width="100%"
                src={Url.url_static + this.state.urlPic}
                alt="Comida"
              ></CardImg>
              <CardBody>
                <CardTitle className="font-size-lg">
                  {this.state.nombreComida}
                </CardTitle>
                <CardText>Estado: {this.state.estado}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" lg="5" xs className="py-3">
            <div className="container">
              <div className="form-group row align-bottom-content">
                <label
                  htmlFor="fecha_entrega"
                  className="col-sm-6 col-form-label col-form-label-md"
                >
                  Fecha de entrega:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-md input-pedidos"
                    disabled={true}
                    value={this.state.fecha}
                  />
                </div>
              </div>
              <div className="form-group row align-top-content">
                <label
                  htmlFor="hora_entrega"
                  className="col-sm-6 col-form-label col-form-label-md"
                >
                  Hora de entrega:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-md input-pedidos"
                    disabled={true}
                    value={this.state.hora}
                  />
                </div>
              </div>
              <div className="form-group row align-top-content">
                <label
                  htmlFor="direccion"
                  className="col-sm-6 col-form-label col-form-label-md"
                >
                  Dirección:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-md input-pedidos"
                    disabled={true}
                    value={this.state.direccion}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid h-50">
              <div className="form-group h-100">
                <label
                  className="text-secondary font-italic font-size-lg"
                  htmlFor="notas"
                >
                  Notas
                </label>
                <textarea
                  className="form-control h-50 input-pedidos"
                  id="notas"
                  value={this.state.notas}
                  disabled={true}
                ></textarea>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PedidoU;
