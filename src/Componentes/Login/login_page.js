//librerias-NuevaRamaOlympus
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Redirect } from "react-router";

//css
import "./login.css";
//Constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";
import { Link } from "react-router-dom";
const cookies = new Cookies();

const LoginPage = (_) => {
  //
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [msgError, setMsgError] = useState("");
  const [error, setError] = useState(false);
  const [logged, setLogged] = useState(false);

  

  useEffect(() => {
    // Funciones
    const validLogged = () => {
      if (cookies.get("token")) {
        setLogged(true);
      }
    };

    // Uso de funciones
    validLogged();
  });

  const inputsChangesHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registro = () => {
    window.location.href = './registro';
  };

  
  
  const login = async (e) => {
    //
    e.preventDefault();
    await axios
      .post(Url.url_login, user, { "Content-Type": "application/json" })
      .then((response) => {
        switch (response.status) {
          case 200:
            cookies.set("token", response.data["Auth-token"], { path: "/" });
            cookies.set("userID", response.data["id"], { path: "/" });            
            setLogged(true);
            break;
          case 404:
            setError(true);
            setMsgError("El usuario no corresponde a vendedor");
            break;
          case 400:
            setError(true);
            setMsgError("Usuario o contraseña inválidos");
            break;
          default:
            setError(true);
            setMsgError("Error al intentar ingresar, intentelo mas tarde.");
        }
      })
      .catch((error) => {
        setError(true);
        setMsgError("Error al conectar con el servidor");
        console.error(`Error en login - ${error}`);
      });
  };

  if (logged) {
    return <Redirect to="/reportes" />;
  } else {
    return (
      <div>
        <form onSubmit={login}>
          <div id="login_desktop">
            <div className="d-flex flex-column justify-content-center  text-center">
              <div className="p-2 pt-5 bd-highlight">
                <h1 className="title-style">Bienvenido a LaJamaSana</h1>
              </div>
              <div className="p-2 bd-highlight">
                <img
                  src="https://i.imgur.com/zUIOEXt.png"
                  className="responsive-image"
                  alt="logo-jamasana"
                />
              </div>
              <div className="p-2 pt-4 bd-highlight">
                <h1 className="title-style">Vendedor</h1>
              </div>
              {error === true && (
                <div className="contenedor-error p-1 w-45 d-flex align-self-center justify-content-center">
                  <span>{msgError}</span>
                </div>
              )}
              <div className="pt-4 bd-highlight">
                <div className="d-flex justify-content-center">
                  <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                    <p className="text-start">Usuario:</p>
                  </div>
                  <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={inputsChangesHandler}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="bd-highlight">
                <div className="d-flex justify-content-center">
                  <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                    <p className="text-start">Contraseña:</p>
                  </div>
                  <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={inputsChangesHandler}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="p-2 pt-3  bd-highlight">
                <input
                  type="submit"
                  className="btn btn-jamasama w-20"
                  value="Ingresar"
                ></input>
                <input
                  type="submit"
                  className="btn btn-jamasama w-20 ml-5"
                  value="Registrar"
                  onClick={registro}
                />
                <p className="text-start mt-4">¿Olvidaste tu contraseña? <Link to={'/mail-recovery'}><span>Recuperarla</span></Link></p>
              </div>
            </div>
          </div>

          <div id="login_mobile">
            <div className="d-flex flex-column justify-content-center  text-center">
              <div className="p-2 pt-5 bd-highlight">
                <h1 className="title-style">Bienvenido a LaJamaSana</h1>
              </div>
              <div className="p-2 bd-highlight">
                <img
                  src="https://i.imgur.com/zUIOEXt.png"
                  className="responsive-image"
                  alt="logo-jamasana"
                />
              </div>
              <div className="p-2 pt-4 bd-highlight">
                <h1 className="title-style">Vendedor</h1>
              </div>
              {error === true && (
                <div className="contenedor-error p-1 w-75 d-flex align-self-center justify-content-center">
                  <span>{msgError}</span>
                </div>
              )}
              <div className="pt-3 bd-highlight">
                <div className=" px-5  w-100 bd-highlight justify-content-start">
                  <p className="text-start">Usuario:</p>
                </div>
              </div>
              <div className=" bd-highlight">
                <div className="px-5 w-100 bd-highlight justify-content-start">
                  <input
                    type="text"
                    className="form-control"
                    id="usernameM"
                    name="username"
                    value={user.username}
                    onChange={inputsChangesHandler}
                  ></input>
                </div>
              </div>
              <div className="pt-4 bd-highlight">
                <div className=" px-5  w-100 bd-highlight justify-content-start">
                  <p className="text-start">Contraseña:</p>
                </div>
              </div>
              <div className="bd-highlight">
                <div className="px-5 w-100 bd-highlight justify-content-start">
                  <input
                    type="password"
                    className="form-control"
                    id="passwordM"
                    name="password"
                    value={user.password}
                    onChange={inputsChangesHandler}
                  ></input>
                </div>
              </div>

              <div className="p-2 pt-5  bd-highlight">
                <input
                  type="submit"
                  className="btn btn-jamasama w-50"
                  value="Ingresar"
                ></input>
              </div>
              <div className="p-2 pt-5  bd-highlight">
                <input
                  type="submit"
                  className="btn btn-jamasama w-50"
                  value="Registrar"
                  onClick={registro}
                />
                <p className="text-start mt-4">¿Olvidaste tu contraseña? <Link to={'/mail-recovery'}><span>Recuperarla</span></Link></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginPage;
