//librerias
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

//componentes
import NavBar from "../Comunes/navbar";
import LabelVendedor from "../Comunes/label_vendedor";
import { Separador } from "../Comunes/separador";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const cookies = new Cookies();

const AddComida = (props) => {
  var categorias_server = [];
  var cat_id = new Map();

  let history = useHistory();
  const [comida, setComida] = useState({
    nombre: "",
    descripcion: "",
    macronutrientes: "",
    estado: true,
    calorias: 0,
    precio: 0,
    imagen: null,
    categoria: 0,
  });

  const [files, setFiles] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [mapa, setMapa] = useState([]);
  const [inicio, setInicio] = useState([]);

  useEffect(() => {
    document.title = "Añadir comida";
    loadCategorias();
  }, []);

  const onInputChange = (e) => {
    setComida({ ...comida, [e.target.name]: e.target.value });
  };

  const loadCategorias = async () => {
    let beginning = "";
    let y = 0;
    const result = await axios.get(Url.url_get_categorias);
    for (let element of result.data) {
      categorias_server.push(element["nombre"]);
      cat_id.set(element["nombre"], element["id"]);
      if (y === 0) {
        beginning = element["nombre"];
        y += 1;
      }
    }
    setCategoria(categorias_server);
    setMapa(cat_id);
    setInicio(beginning);
  };

  const setCategorias = (e) => {
    setInicio(e.target.value);
  };

  const onSubmit = async () => {
    let token = cookies.get("token");

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    let data = {
      nombre: comida.nombre,
      descripcion: comida.descripcion,
      precio: comida.precio,
      calorias_totales: comida.calorias,
      macronutrientes: comida.macronutrientes,
      id_categoria: mapa.get(inicio),
      id_vendedor: parseInt(cookies.get("user")),
      imagen: files[0].file,
      estado: comida.estado,
    };

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    await axios
      .post(Url.url_crud_comida, formData, options)
      .then((_) => {
        alert("Comida agregada con exito");
        history.push("/comidas");
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
      <Separador nombre="Comidas" />
      <Container>
        <form id="comiAdd">
          <Row>
            <Col sm="6">
              <FormGroup>
                <Col sm="4">
                  <label>Nombre: </label>
                </Col>
                <Col sm="8">
                  <input
                    required
                    name="nombre"
                    className="form-control"
                    type="text"
                    onChange={(e) => onInputChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm="4">
                  <label>Descripción: </label>
                </Col>
                <Col sm="8">
                  <textarea
                    id="descrip"
                    required
                    className="form-control"
                    name="descripcion"
                    type="text"
                    onChange={(e) => onInputChange(e)}
                    form="comiAdd"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm="4">
                  <label>Macronutientes: </label>
                </Col>
                <Col sm="8">
                  <input
                    required
                    name="macronutrientes"
                    className="form-control"
                    type="text"
                    onChange={(e) => onInputChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm="4">
                  <label>Valor energético: </label>
                </Col>
                <Col sm="8">
                  <input
                    required
                    name="calorias"
                    className="form-control"
                    type="number"
                    onChange={(e) => onInputChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm="4">
                  <label>Precio: </label>
                </Col>
                <Col sm="8">
                  <input
                    required
                    name="precio"
                    className="form-control"
                    type="number"
                    onChange={(e) => onInputChange(e)}
                    step="0.1"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm="4">
                  <label>Categoria: </label>
                </Col>
                <Col sm="8">
                  <select
                    className="form-control"
                    required
                    name="categoria"
                    onChange={(e) => setCategorias(e)}
                  >
                    {categorias.map((cate, i) => (
                      <option key={i} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </Col>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Col sm="3">
                  <label>Imagen: </label>
                </Col>
                <Col sm="9"></Col>
              </FormGroup>
              <FilePond
                required
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                name="files"
                labelIdle='Arrastre una imágen o <span class="filepond--label-action">Busca</span>'
              />
            </Col>
          </Row>
        </form>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col>
            <button
              className="btn btn-success col-sm-2 offset-8"
              onClick={() => onSubmit()}
            >
              Agregar
            </button>
          </Col>
          <Col>
            <button
              className="btn btn-danger offset-2"
              onClick={() => history.goBack()}
            >
              Cancelar
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AddComida;
