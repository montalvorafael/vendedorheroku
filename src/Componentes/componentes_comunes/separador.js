/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import './separador.css';

const Separador = (props) => (
  <div>
    <p className="separador fuente-color">
      {' '}
      <s id="s1" />
      {' '}
      {props.nombre}
      {' '}
      <s id="s2" />
      {' '}
    </p>
  </div>
);

export default Separador;
