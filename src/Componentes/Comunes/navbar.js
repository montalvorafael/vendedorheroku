import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "reactjs-navbar";
import logo from "../../Imagenes/logo.png";
import Loader from "react-loader-spinner";
import {
  faClipboard,
  faUtensils,
  faChartPie,
  faCogs,
  faUserCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "reactjs-navbar/dist/index.css";
const cookies = new Cookies();
class Navbar2 extends Component {
  state = {
    isLoading: false,
  };
  render() {
    return (
      <Navbar
        logo={logo}
        loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
        isLoading={this.state.isLoading}
        closeCallback={() => {
          alert("hi");
        }}
        menuItems={[
          {
            title: "Reportes",
            icon: faChartPie,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              window.location.href = "/reportes";
            },
          },
          {
            title: "Pedidos",
            icon: faClipboard,
            isAuth: true,
            onClick: () => {
              window.location.href = "/pedidos";
            },
          },
          {
            title: "Administración",
            icon: faCogs,
            isAuth: true,
            subItems: [
              {
                title: "Comidas",
                icon: faUtensils,
                isAuth: true,
                onClick: () => {
                  window.location.href = "/comidas";
                },
              },
              {
                title: "Editar perfil",
                icon: faUser,
                isAuth: true,
                onClick: () => {
                  window.location.href = "/editar";
                },
              },
            ],
          },
          {
            title: "Cerrar Sesión",
            icon: faUserCircle,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              // alert("I need another cup of coffee...");
              cookies.remove("username");
              cookies.remove("user");
              cookies.remove("token");
              window.location.href = "/";
            },
          },
        ]}
      />
    );
  }
}

export default Navbar2;
