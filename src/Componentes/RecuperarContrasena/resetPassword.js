import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
// css
import "./recovery.css";

// componentes
import LabelVendedor from '../componentes_comunes/banner';
import Separador from '../componentes_comunes/separador';

const ResetPassword = () => {
    const history = useHistory();

    const [vendedor, setVendedor] = useState({
        password: '',
        passwordConf: ''
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

    function validaciones() {
        const data = {
            password: vendedor.password,
            passwordConf: vendedor.passwordConf
        }
        console.log(data)

        if(vendedor.password ==='' || vendedor.passwordConf === ''){
            alert("Debe llenas los parametros!")
        }else if(vendedor.password.length <8 || vendedor.passwordConf.length <8){
            alert("La contrasena debe tener al menos 8 digitos!")
        }else if(!(vendedor.password ===vendedor.passwordConf)){
            alert("Las contrasenas no coinciden")
        }else{
            console.log("si")
            cambioPassword()
        }
    }    

    const cambioPassword = async () => {
            const data = {
                username: getCookie("user_name"),
                password: vendedor.password

            }
            console.log(data)
            const token = 'ef5ea9da4c96618c11cc5d0cc38e8e73dda6375c'
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'form-data',
                    Authorization: `Token ${token}`,
                },
            };
    
            const formData = new FormData();
    
            for (const key in data) {
                formData.append(key, data[key]);
            }  
    
            await axios
                .put('http://localhost:8000/recuperacion/cambio_contrasena', formData, options)
                .then((res) => {
                    window.alert("cambio exitoso");
                    history.push('/');
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.toString());
                });
    }
        
    

    
   
    return(
        <div>
            <div id="recovery_desktop">
                <LabelVendedor />
                <Separador nombre="Nueva contraseña" />
                <div className="container">
                </div>
                <form id="mailrecovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-4 bd-highlight">
                            <div className="d-flex justify-content-center">
                            <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                                <p className="text-start">Ingrese la nueva contraseña:</p>
                            </div>
                            <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                                <input
                                type="text"
                                className="form-control"
                                id="newPassword"
                                name="password"
                                onChange={(e) => onInputChange(e)}  
                                
                                ></input>
                            </div>
                            </div>
                        </div>
                        <div className="pt-4 bd-highlight">
                            <div className="d-flex justify-content-center">
                                <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                                    <p className="text-start">Vuelva a ingresar la nueva contraseña:</p>
                                </div>
                                <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="newPasswordConf"
                                    name="passwordConf" 
                                    onChange={(e) => onInputChange(e)}                               
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 pt-3  bd-highlight">
                            <input
                                type="submit"
                                className="btn btn-jamasama w-20 ml-5"
                                defaultValue="Cambiar contraseña"
                                // onClick={() => history.push('/')} 
                                onClick={() => validaciones()}
                            />

                        </div>
                    </div>

                   

                </form>
            </div>
             
            <div id="recovery_mobile">
                <LabelVendedor />
                <Separador nombre="Nueva contraseña" />
                <div className="container">
                </div>
                <form id="mailrecovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-3 bd-highlight">
                            <div className=" px-5  w-100 bd-highlight justify-content-start">
                                <p className="text-start">Ingrese la nueva contraseña:</p>
                            </div>
                            <div className=" bd-highlight">
                                <div className="px-5 w-100 bd-highlight justify-content-start">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="newPassword"
                                    name="password"     onChange={(e) => onInputChange(e)}                               
                                    ></input>
                                </div>
                            </div>    
                        </div>
                        <div className="pt-3 bd-highlight">
                            <div className=" px-5  w-100 bd-highlight justify-content-start">
                                <p className="text-start">Vuelva a ingresar la nueva contraseña:</p>
                            </div>
                            <div className=" bd-highlight">
                                <div className="px-5 w-100 bd-highlight justify-content-start">
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="newPasswordConf"
                                    name="passwordConf" onChange={(e) => onInputChange(e)}                                   
                                    ></input>
                                </div>
                            </div>    
                        </div>
                        
                        <div className="p-2 pt-5  bd-highlight">
                            <input
                                // type="submit"
                                className="btn btn-jamasama w-50"
                                defaultValue="Cambiar contraseña"
                                // onClick={() => history.push('/')} 
                                onClick={() => validaciones()}
                            />

                        </div>
                    </div>

                   

                </form>
            </div>
        </div>
        
    )
}

export default ResetPassword;