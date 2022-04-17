import React from 'react';
import Background from '../../Imagenes/banner.jpg';
import logo from '../../Imagenes/logo.png';

const Banner = () => {
  const styles = {
    backgroundImage: `url(${Background})`,
    display: 'flex',
    height: '200px',
    marginBottom: '30px',
    fontSize: '30px',
    color: '#4FD053',
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
  };

  return [
    <div style={styles}>
      <img src={logo} width="150" height="150" alt="description of" />
    </div>];
};

export default Banner;
