//librerias
import React, { Component } from "react";
//componentes
import { SeparadorPedidos } from "../Comunes/separador";
import PedidoU from "./pedido";

class PedidosContainer extends Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.pedidos.map((usuario) => (
          <div key={usuario.id} className="h-50">
            <SeparadorPedidos nombre={usuario.user} key={usuario.id} />
            {usuario.pedidos.map((pedido, index) => (
              <PedidoU {...pedido} key={index} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default PedidosContainer;
