import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Cookies from "universal-cookie";
// css
import "./recovery.css";

// componentes
import LabelVendedor from '../componentes_comunes/banner';
import Separador from '../componentes_comunes/separador';
const cookies = new Cookies();

const CodeRecovery = () => {
    const history = useHistory();

    const [vendedor, setVendedor] = useState({
        codigo: ''
    });

    const onInputChange = (e) => {
        setVendedor({ ...vendedor, [e.target.name]: e.target.value });
    };
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // var userName=getCookie("user_name");
    function validaciones(){
        const data = {
            codigo: vendedor.codigo,
            username: getCookie("user_name")
        }
        console.log(data)

        if (vendedor.codigo===''){
            alert("Debe ingresar el codigo!")
        }else{
            enviarCodigo(data) 
        }
    };

    const enviarCodigo = async (data) => {
        console.log("datos " + data )
        const token = 'ef5ea9da4c96618c11cc5d0cc38e8e73dda6375c'
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${token}`,
            },
        };

        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }  

        await axios
            .post('http://localhost:8000/recuperacion/codigo', formData, options)
            .then((res) => {
                window.alert("Codigo Correcto!");
                // history.push('/');
                // AQUI ENVIAR A LA OTRA

                history.push('/mail-recovery/code-recovery/reset-password')
                console.log(data)
            })
            .catch((error) => {
                console.log(error);
                // alert(error.toString());
                alert("El codigo no coincide al enviado al correo!")
            });
    }
    return(
        <div>
            <div id="recovery_desktop">
                <LabelVendedor />
                <Separador nombre="Codigo de recuperacion" />
                <div className="container">
                </div>
                <form id = "code-Recovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-4 bd-highlight">
                            <div className="d-flex justify-content-center">
                            <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                                <p className="text-start">Ingrese el codigo enviado a su correo: </p>
                            </div>
                            <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                                <input
                                type="text"
                                className="form-control"
                                id="codigo"
                                name="codigo"              onChange={(e) => onInputChange(e)}
                                              
                                ></input>
                            </div>
                            </div>
                        </div>

                        <div className="p-2 pt-3  bd-highlight">                        
                            <input
                            // type="submit"
                            className="btn btn-jamasama w-20 ml-5"
                            value="Enviar código"
                            // onClick={() => history.push('/mail-recovery/code-recovery/reset-password')}
                            onClick={() => validaciones()}
                            />
                        </div>
                    </div>   
                </form>
            </div>
           
            <div id="recovery_mobile">
                <LabelVendedor />
                <Separador nombre="Codigo de recuperacion" />
                <div className="container">
                </div>
                <form id = "code-Recovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-3 bd-highlight">
                            
                            <div className=" px-5  w-100 bd-highlight justify-content-start">
                                <p className="text-start">Ingrese el codigo enviado a su correo: </p>
                            </div>
                            <div className=" bd-highlight">
                                <div className="px-5 w-100 bd-highlight justify-content-start">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="codigo"
                                    name="codigo"          onChange={(e) => onInputChange(e)}                          
                                    ></input>
                                </div>
                            </div>
                            
                            
                        </div>

                        <div className="p-2 pt-5  bd-highlight">                        
                            <input
                            // type="submit"
                            className="btn btn-jamasama w-50"
                            value="Enviar código"
                            // onClick={() => history.push('/mail-recovery/code-recovery/reset-password')}
                            onClick={() => validaciones()}
                            />
                        </div>
                    </div>   
                </form>
            </div>
        </div>
    )
}

export default CodeRecovery;