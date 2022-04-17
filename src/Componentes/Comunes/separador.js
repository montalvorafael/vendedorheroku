//librerias
import React from "react";
//css
import './comunes.css';

export const Separador = (props) => {
	return (
		<div className="container-fluid">
			<p className="separador r-vista r-fuente-color">
				{" "}
				<s></s> {props.nombre} <s></s>
				{" "}
			</p>
		</div>
	);
};

export const SeparadorPedidos = (props) => {
	return (
		<div className="container-fluid">
			<p className="separador p-vista p-fuente-color">
				{" "}
				<s></s>Nombre de usuario: {props.nombre} <s></s>
				{" "}
			</p>
		</div>
	);
};

