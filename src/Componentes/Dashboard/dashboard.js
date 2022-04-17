//librerias
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import { PDFButton } from "@cosydev/react-pdf-exporter";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
//css
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
//componentes
import Navbar from "../Comunes/navbar";
import Label from "../Comunes/label_vendedor";
import { Separador } from "../../Componentes/Comunes/separador";
import { BarChart, LineChart, PieChart } from "./Charts";
// Cookies
const cookies = new Cookies();

const Dashboard = (_) => {
  // State
  const [logged, setLogged] = useState(true);
  const [chart1, setChart1] = useState({
    pie: true,
    bar: false,
    linear: false,
  });
  const [chart2, setChart2] = useState({
    pie: true,
    bar: false,
    linear: false,
  });

  const [dataChart1, setData1] = useState([12, 19, 3, 5, 20, 3]);
  const [dataChart2, setData2] = useState([12, 19, 3, 5, 20, 3]);

  const [toggleDropDown1, setDrop1] = useState(false);
  const [toggleDropDown2, setDrop2] = useState(false);

  // Antes de que cargue la view
  useEffect(() => {
    // Funciones
    const validLogged = () => {
      if (!cookies.get("token")) {
        setLogged(false);
      } else {
        document.title = "La JamaSana - Reportes";
      }
    };
    // Uso de funcion
    validLogged();
  });

  const pdf_config = {
    file_name: "jamasama",
    title: "JamaSama - Reporte Vendedor",
    color: "#63b045",
    transforms: {
      ajustMuiTables: false,
      relativeLabels: true,
      svgToCanvas: true,
    },
    no_download: false,
    mode: "default",
  };

  const toggleDrop = (noGraph) => {
    if (noGraph === "1") {
      setDrop1(!toggleDropDown1);
    } else {
      setDrop2(!toggleDropDown2);
    }
  };

  const barChart = (noGraph) => {
    if (noGraph === "1") {
      setChart1({ bar: !chart1.bar, linear: false, pie: false });
    } else {
      setChart2({ bar: !chart2.bar, linear: false, pie: false });
    }
  };
  const pieChart = (noGraph) => {
    if (noGraph === "1") {
      setChart1({ pie: !chart1.pie, bar: false, linear: false });
    } else {
      setChart2({ pie: !chart2.pie, bar: false, linear: false });
    }
  };
  const linearChart = (noGraph) => {
    if (noGraph === "1") {
      setChart1({ linear: !chart1.linear, pie: false, bar: false });
    } else {
      setChart2({ linear: !chart2.linear, pie: false, bar: false });
    }
  };

  if (logged) {
    return (
      <div>
        <Navbar />
        <Label />
        <Separador nombre="Reportes" />
        <div className="container-fluid export">
          <PDFButton
            className="btn btn-jamasana"
            pdf_config={pdf_config}
            target="#report"
          ></PDFButton>
          <div id="export-button"> Exportar a PDF </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-6 graficos">
              <div className="row">
                <div className="col-12">
                  <Dropdown
                    key="1"
                    isOpen={toggleDropDown1}
                    toggle={() => toggleDrop("1")}
                  >
                    <DropdownToggle caret className="dropButton">
                      Tipo de gráfico
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Gráficos disponibles</DropdownItem>
                      <DropdownItem
                        onClick={() => barChart("1")}
                        disabled={chart1.bar}
                      >
                        Bar
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => pieChart("1")}
                        disabled={chart1.pie}
                      >
                        Pie
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => linearChart("1")}
                        disabled={chart1.linear}
                      >
                        Line
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {chart1.bar && (
                <BarChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Comidas más vendidas"
                  data={dataChart1}
                />
              )}

              {chart1.pie && (
                <PieChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Comidas más vendidas"
                  data={dataChart1}
                />
              )}

              {chart1.linear && (
                <LineChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Comidas más vendidas"
                  data={dataChart1}
                />
              )}
            </div>
            <div className="col-md-12 col-lg-6 graficos">
              <div className="row">
                <div className="col-12">
                  <Dropdown
                    key="2"
                    isOpen={toggleDropDown2}
                    toggle={() => toggleDrop("2")}
                  >
                    <DropdownToggle caret className="dropButton">
                      Tipo de gráfico
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Gráficos disponibles</DropdownItem>
                      <DropdownItem
                        onClick={() => barChart("2")}
                        disabled={chart2.bar}
                      >
                        Bar
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => pieChart("2")}
                        disabled={chart2.pie}
                      >
                        Pie
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => linearChart("2")}
                        disabled={chart2.linear}
                      >
                        Linea
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              {chart2.bar && (
                <BarChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Valoración de comidas"
                  data={dataChart2}
                />
              )}

              {chart2.pie && (
                <PieChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Valoración de comidas"
                  data={dataChart2}
                />
              )}

              {chart2.linear && (
                <LineChart
                  id="supercool-canvas"
                  className="canvaschart"
                  label="Valoración de comidas"
                  data={dataChart2}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

/*
  toggleDrop(toggle, grap) {
    if (grap === "1") this.setState({ dropdownToggle: !toggle });
    if (grap === "2") this.setState({ dropdownToggle2: !toggle });
  }

  pieChartChoose(opt, grap) {
    if (grap === "1") this.setState({ type1: { pie: !opt } });
    if (grap === "2") this.setState({ type2: { pie: !opt } });
  }

  linearChartChoose(opt, grap) {
    if (grap === "1") this.setState({ type1: { linear: !opt } });
    if (grap === "2") this.setState({ type2: { linear: !opt } });
  }

  barChartChoose(opt, grap) {
    if (grap === "1") this.setState({ type1: { bar: !opt } });
    if (grap === "2") this.setState({ type2: { bar: !opt } });
  }

  render() {
    if (!this.state.logged) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar {...this.props} />
          <div id="report" className="pdf_print" pdf_title=" ">
            <Label />
            <Separador nombre="Reportes" />
            <div className="d-flex justify-content-center">
              <PDFButton
                className="btn btn-jamasana"
                pdf_config={pdf_config}
                target="#report"
              ></PDFButton>
            </div>
            <div className="mb-5 py-5">

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 col-lg-6 graficos">
                    <div className="row">
                      <div className="col-12">
                        <Dropdown
                          key="1"
                          isOpen={this.state.dropdownToggle}
                          toggle={() =>
                            this.toggleDrop(this.state.dropdownToggle, "1")
                          }
                        >
                          <DropdownToggle caret className="dropButton">
                            Tipo de gráfico
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>
                              Gráficos disponibles
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.barChartChoose(this.state.type1.bar, "1")
                              }
                              disabled={this.state.type1.bar ? true : false}
                            >
                              Bar
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.pieChartChoose(this.state.type1.pie, "1")
                              }
                              disabled={this.state.type1.pie ? true : false}
                            >
                              Pie
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.linearChartChoose(
                                  this.state.type1.linear,
                                  "1"
                                )
                              }
                              disabled={this.state.type1.linear ? true : false}
                            >
                              Line
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    {this.state.type1.bar && (
                      <BarChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Comidas más vendidas"
                        data={this.state.data1}
                      />
                    )}

                    {this.state.type1.pie && (
                      <PieChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Comidas más vendidas"
                        data={this.state.data1}
                      />
                    )}

                    {this.state.type1.linear && (
                      <LineChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Comidas más vendidas"
                        data={this.state.data1}
                      />
                    )}
                  </div>
                  <div className="col-md-12 col-lg-6 graficos">
                    <div className="row">
                      <div className="col-12">
                        <Dropdown
                          key="2"
                          isOpen={this.state.dropdownToggle2}
                          toggle={() =>
                            this.toggleDrop(this.state.dropdownToggle2, "2")
                          }
                        >
                          <DropdownToggle caret className="dropButton">
                            Tipo de gráfico
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>
                              Gráficos disponibles
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.barChartChoose(this.state.type2.bar, "2")
                              }
                              disabled={this.state.type2.bar ? true : false}
                            >
                              Bar
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.pieChartChoose(this.state.type2.pie, "2")
                              }
                              disabled={this.state.type2.pie ? true : false}
                            >
                              Pie
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                this.linearChartChoose(
                                  this.state.type2.linear,
                                  "2"
                                )
                              }
                              disabled={this.state.type2.linear ? true : false}
                            >
                              Linea
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    {this.state.type2.bar && (
                      <BarChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Valoración de comidas"
                        data={this.state.data2}
                      />
                    )}

                    {this.state.type2.pie && (
                      <PieChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Valoración de comidas"
                        data={this.state.data2}
                      />
                    )}

                    {this.state.type2.linear && (
                      <LineChart
                        id="supercool-canvas"
                        className="canvaschart"
                        label="Valoración de comidas"
                        data={this.state.data2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
*/

/*
class Dashboard extends Component {
  state = {
    logged: true,
    data1: [12, 19, 3, 5, 20, 3],
    data2: [12, 19, 3, 5, 10, 3],
    type1: {
      bar: true,
      pie: false,
      linear: false,
    },
    type2: {
      bar: true,
      pie: false,
      linear: false,
    },
    dropdownToggle: false,
    dropdownToggle2: false,
  };

  componentDidMount() {
    if (!cookies.get("token")) {
      this.setState({ logged: false });
    } else {
      document.title = "Reportes";
      return;
    }
  }

 * */

export default Dashboard;
