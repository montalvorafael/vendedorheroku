//librerias
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import { Redirect } from "react-router";
import axios from "axios";
// Componentes
import Navbar from "../Comunes/navbar";
import { Separador } from "../Comunes/separador";
import LabelV from "../Comunes/label_vendedor";
import PedidosContainer from "./pedidos_container";
//css
import "./pedidos.css";
//Constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";

const cookies = new Cookies();

class Pedido extends Component {
  state = {
    logged: true,
    response: [], //Aqui se almacena para presentar todos los pedidos - pedidos: { user:{ ..., pedidos:[{}], ... }, ... } - estructura esperada
    filtro: [], //Para cuando se filtre-quizas no sea necesario
  };

  componentDidMount() {
    if (!cookies.get("token")) {
      this.setState({ logged: false });
    } else {
      document.title = "Pedidos";
      this.fetchPedidos();
      return;
    }
  }

  fetchPedidos = async () => {
    //
    await axios
      .get(Url.url_get_pedidos)
      .then(async (response) => {
        //
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${cookies.get("token")}`,
          },
        };

        let pedidos_info = await Promise.all(
          response.data.map(async (pedido) => {
            //
            let info = {};

            const user = await axios.get(
              Url.url_get_cliente + `/${pedido.id_cliente}`,
              config
            );

            const detallePedido = await axios.get(
              Url.url_get_detalle + `/${pedido.id}`,
              config
            );

            const comida = await axios.get(
              Url.url_crud_comida + `/${detallePedido.data.id_comida}`,
              config
            );

            info["user"] = user.data.username;
            info["id"] = user.data.id;
            let fecha_trans = this.transformarFecha(
              detallePedido.data.fecha_emitido
            );
            info["pedidos"] = [
              {
                notas: "No hay notas para mostrar",
                fecha: fecha_trans,
                hora: detallePedido.data.hora_entrega,
                direccion: "Direccion",
                estado: `${pedido.estado ? "Faltante" : "Entregado"}`,
                urlPic: comida.data.imagen,
                nombreComida: comida.data.nombre,
              },
            ];
            return info;
          })
        );
        this.limpiarData(pedidos_info);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  transformarFecha(fecha) {
    let info = fecha.split("T");
    let format = info[0].split("-");

    return `${format[2]}-${format[1]}-${format[0]}`;
  }

  limpiarData(pedidos) {
    let cleanInfo = [];

    for (var i = 0; i < pedidos.length; i++) {
      let user = pedidos[i].user;
      if (this.comprobarExistencia(user, cleanInfo)) {
        let index = this.getIndex(user, cleanInfo);
        cleanInfo[index].pedidos.push(pedidos[i].pedidos[0]);
      } else {
        cleanInfo.push(pedidos[i]);
      }
    }

    this.setState({ response: cleanInfo });
  }

  getIndex(user, pedidos) {
    for (var i = 0; i < pedidos.length; i++) {
      if (user === pedidos[i].user) return i;
    }
    return -1;
  }

  comprobarExistencia(user, pedidos) {
    for (var i = 0; i < pedidos.length; i++) {
      if (user === pedidos[i].user) return true;
    }
    return false;
  }

  filtrar = (e) => {
    e.preventDefault();
    console.log("Filtro");
  };

  render() {
    if (!this.state.logged) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar {...this.props} />
          <LabelV />
          <Separador nombre="Pedidos" />
          <div className="container-fluid pb-5 pt-3">
            <Row xs="1">
              <Col
                xl={{ size: "3", offset: "9" }}
                lg={{ size: "5", offset: "7" }}
                md={{ size: "5", offset: "7" }}
              >
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input
                      type="text"
                      name="filtro"
                      id="filtro"
                      placeholder="Buscar por..."
                      className="input-pedidos"
                    />
                  </FormGroup>
                  <Button className="btn-jamasana" onClick={this.filtrar}>
                    Buscar
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
          <PedidosContainer pedidos={this.state.response} />
          {/*Aqui se envia la lista de todos los usuarios con sus pedidos*/}
        </div>
      );
    }
  }
}
export default Pedido;
