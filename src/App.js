//librerias
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Componentes
import Dashboard from "./Componentes/Dashboard/dashboard";
import LoginPage from "./Componentes/Login/login_page";
import ComidasHome from "./Componentes/Comida/comidaHome";
import AddComida from "./Componentes/Comida/comidaAdd";
import EditComida from "./Componentes/Comida/comidaEdit";
import Pedidos from "./Componentes/Pedidos/pedidos_home";
import VendedorAdd from './Componentes/Registro/VendedorAdd';
import MailRecovery from "./Componentes/RecuperarContrasena/mailRecovery";
import CodeRecovery from "./Componentes/RecuperarContrasena/codeRecovery";
import ResetPassword from "./Componentes/RecuperarContrasena/resetPassword";
import VendedorEdit from "./Componentes/Editar/VendedorEdit";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <LoginPage {...props} />} />

        <Route exact path="/registro" render={(props) => <VendedorAdd {...props} />} />

        <Route exact path="/editar" render={(props) => <VendedorEdit {...props} />} />

        <Route exact path="/mail-recovery" render={(props) => <MailRecovery {...props} />}/>

        <Route exact path="/mail-recovery/code-recovery" render={(props)=> <CodeRecovery {...props} />}/>

        <Route exact path="/mail-recovery/code-recovery/reset-password" render={(props) => <ResetPassword {...props} />}/>

        <Route
          exact
          path="/reportes"
          render={(props) => <Dashboard {...props} />}
        />

        <Route
          exact
          path="/pedidos"
          render={(props) => <Pedidos {...props} />}
        />

        <Route
          exact
          path="/comidas"
          render={(props) => <ComidasHome {...props} />}
        />

        <Route
          exact
          path="/comidas/add"
          render={(props) => <AddComida {...props} />}
        />

        <Route
          exact
          path="/comidas/edit/:id"
          render={(props) => <EditComida {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
