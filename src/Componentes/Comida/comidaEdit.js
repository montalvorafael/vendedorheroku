//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "./comida.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//componentes
import NavBar from "../Comunes/navbar";
import LabelVendedor from "../Comunes/label_vendedor";
import { Separador } from "../Comunes/separador";

//constantes
import * as Url from "../../Recursos/Constantes/HTTP/http-url";
import { isNumeric } from "jquery";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const cookies = new Cookies();
const EditComida = (props) => {
  let history = useHistory();
  var cats_ids = new Map();
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [comida, setComida] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [mapa, setMapa] = useState([]);
  const [ids, setIds] = useState([]);
  const {
    nombre,
    descripcion,
    precio,
    calorias_totales,
    macronutrientes,
    id_categoria,
    imagen,
  } = comida;

  const onInputChange = (e) => {
    setComida({ ...comida, [e.target.name]: e.target.value });
  };

  const changeImage = () => {
    document.getElementById("img-ch").hidden = true;
  };

  useEffect(() => {
    document.title = "Editar comida";

    const loadComida = async () => {
      let token = cookies.get("token");
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      const result = await axios.get(Url.url_crud_comida + `/${id}`, options);
      setComida(result.data);
    };

    const loadCategorias = async () => {
      let cats = [];
      let ids = [];
      const result = await axios.get(Url.url_get_categorias);
      result.data.map((cat) => {
        cats.push(cat["nombre"]);
        cats_ids.set(cat["nombre"], parseInt(cat["id"]));
      });
      setMapa(cats_ids);
      setCategorias(cats);
      setIds(ids);
    };

    loadCategorias();
    loadComida();
  }, []);

  const onSubmit = async () => {
    let token = cookies.get("token");

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    let data = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      calorias_totales: calorias_totales,
      macronutrientes: macronutrientes,
      id_categoria: isNumeric(id_categoria)
        ? id_categoria
        : mapa.get(id_categoria),
      id_vendedor: comida.id_vendedor,
      estado: comida.estado,
    };

    if (files.length > 0) {
      data = { ...data, imagen: files[0].file };
    }

    const form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    await axios
      .put(Url.url_crud_comida + `/${id}`, form, options)
      .then((_) => history.push("/comidas"))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <NavBar {...props} />
      <LabelVendedor />
      <Separador nombre="Comidas" />
      <Container style={{ height: "500px" }}>
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
                    value={nombre}
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
                    required
                    className="form-control"
                    name="descripcion"
                    value={descripcion}
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
                    value={macronutrientes}
                    type="text"
                    onChange={(e) => onInputChange(e)}
                    form="comidaAdd"
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
                    name="calorias_totales"
                    className="form-control"
                    value={calorias_totales}
                    type="number"
                    onChange={(e) => onInputChange(e)}
                    step="0.01"
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
                    value={precio}
                    step="0.01"
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
                    name="id_categoria"
                    onChange={(e) => onInputChange(e)}
                  >
                    {categorias.map((cate, i) =>
                      id_categoria === cate ? (
                        <option selected key={i} value={cate}>
                          {cate}
                        </option>
                      ) : (
                        <option key={i} value={cate}>
                          {cate}
                        </option>
                      )
                    )}
                  </select>
                </Col>
              </FormGroup>
            </Col>
            <Col sm="6">
              <label>Imagen: </label>
              <div className="img-add-2" id="img-ch">
                <img id="addimg" src={Url.url_static + imagen} alt={nombre} />
              </div>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                name="files"
                labelIdle='Arrastra una imagen o <span class="filepond--label-action">Busca</span>'
                onaddfile={() => changeImage()}
              />
            </Col>
          </Row>
        </form>
      </Container>
      <Container className="mb-5">
        <Row>
          <Col>
            <button
              className="btn btn-success col-sm-2 offset-8"
              onClick={() => onSubmit()}
            >
              Confirmar
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

export default EditComida;
