import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Cookies from "universal-cookie";

// css
import "./recovery.css";


// componentes
import LabelVendedor from '../componentes_comunes/banner';
import Separador from '../componentes_comunes/separador';
// import { Link } from 'react-bootstrap-icons';
const cookies = new Cookies();


const MailRecovery = () =>{
    const history = useHistory();

    const [vendedor, setVendedor] = useState({
        correo: ''
    });

    const onInputChange = (e) => {
        setVendedor({ ...vendedor, [e.target.name]: e.target.value });
    };

    function validacines(){
        const data = {
            correo: vendedor.correo
        }

        if (vendedor.correo ===''){
            alert("No ha ingresado email!")
        }else{
            peticion(data) 
        }
    };

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

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

   
    const peticion = async (datos) =>{
        const token = 'd99948f0fa5f7e5e8ff3e31ef096b76f8d94eb4c'
        const options = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Token ${token}`,
            }
        };

        await axios
        .get('http://localhost:8000/usuarios/allvendedor',  options)
        .then((res) => {
            const db = res.data
            let condicion = false
            for( let userdb of db){        
                const correoDataBase = userdb.email
                if(datos.correo === correoDataBase){
                    condicion = true
                    //Cookie para obtener el nombre de usuario
                    setCookie("user_name",userdb.username,30);  
                    var userName=getCookie("user_name");
                    console.log(userName)                    
                }
            }
            if(condicion){
                enviarCodigo(datos)
                // history.push('/mail-recovery/code-recovery')
            }else{
                alert("No existe un usuario con este correo")  
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error.toString());
        });
    };

    const enviarCodigo = async (data) => {
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
            .post('http://localhost:8000/recuperacion/', formData, options)
            .then((res) => {
                window.alert("Recibira un codigo en su correo");
                // history.push('/');
                // AQUI ENVIAR A LA OTRA

                history.push('/mail-recovery/code-recovery')
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
                <Separador nombre="Recuperar contraseña" />
                <div className="container">
                </div>
                <form id = "mailrecovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-4 bd-highlight">
                            <div className="d-flex justify-content-center">
                                <div className="p-2 px-5 py-3 w-25 bd-highlight justify-content-start">
                                    <p className="text-start">Ingrese su correo electronico:</p>
                                </div>
                                <div className="p-2 px-5 w-25 bd-highlight justify-content-start">
                                    <input
                                    type="correo"
                                    className="form-control"
                                    id="emailrecovery"
                                    name="correo"
                                    placeholder='correo@electronico.com'
                                    onChange={(e) => onInputChange(e)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 pt-3  bd-highlight">                        
                            <input
                            // type="submit"
                            className="btn btn-jamasama w-20 ml-5"
                            value="Enviar"
                            // onClick={() => history.push('/mail-recovery/code-recovery')}
                            onClick={() => validacines()}
                            />
                        </div>


                    </div>
                    
                
                </form>
            </div>
            
            <div id="recovery_mobile">
                <LabelVendedor />
                <Separador nombre="Recuperar contraseña" />
                <div className="container">
                </div>
                <form id = "mailrecovery" className="d-flex flex-column justify-content-center  text-center">
                    <div className="d-flex flex-column justify-content-center  text-center">
                        <div className="pt-3 bd-highlight">
                            
                            <div className=" px-5  w-100 bd-highlight justify-content-start">
                                <p className="text-start">Ingrese su correo electronico:</p>
                            </div>
                            <div className=" bd-highlight">
                                <div className="px-5 w-100 bd-highlight justify-content-start">
                                    <input
                                    type="correo"
                                    className="form-control"
                                    id="emailrecovery"
                                    name="correo"
                                    placeholder='correo@electronico.com'
                                    onChange={(e) => onInputChange(e)}
                                    ></input>
                                </div>
                            </div>
                                
                            
                        </div>
                        <div className="p-2 pt-5  bd-highlight">                        
                            <input
                            // type="submit"
                            className="btn btn-jamasama w-50"
                            value="Enviar"
                            // onClick={() => history.push('/mail-recovery/code-recovery')}
                            onClick={() => validacines()}
                            />
                        </div>


                    </div>
                    
                
                </form>
            </div>

        </div>
    )
}

export default MailRecovery;