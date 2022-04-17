# La Jama Sana - Componente Web

Este componente esta destinado para el uso de los vendedores.

## Inicio de la aplicación

Para iniciar la aplicación de forma local se hace uso del siguiente comando dentro de la carpeta del proyecto:

```bash
npm install && npm start
```

Puerto por defecto 3000. <br><br>
Dirección local: [localhost:3000](http://localhost:3000)

## Build

Para generar una build de la aplicación se requiere ejecutar el comando:

```bash
npm run build
```

## Despliegue

Para hacer el despliegue de la aplicación se usa _Digital Ocean_ y se ingresa por medio de google, las credenciales de la cuenta de google son:
- inge.soft.2021@gmail.com - Email 
- 165.22.12.210 - IP
- root - Usuario para ingresar al droplet de _Digital Ocean_

Para la configuración del subdominio se usa _Godaddy_ con las credenciales:

- Ingesoft2021 - Usuario

Antes de clonar el proyecto dentro del droplet se debe hacer una build de la aplicación localmente y se debe subir a la rama <strong>build</strong> del repositorio.

Las aplicaciones se encuentran en la ruta <strong>~/webapps</strong> del droplet.

El contenido de la carpeta <strong>~/webapps/lajamasana_vendedor/build</strong> que se genera debe ser colocada dentro de la ruta <strong>/var/www/vendedor-jamaSana</strong>.

El servidor web usado es <strong>Nginx</strong>.


Dominio asignado: [jamasana-vendedor.ing-soft2021.com](jamasana-vendedor.ing-soft2021.com)

Puerto: 3000

## Distribución de carpetas

La aplicación se desarrollo usando REACTJS y haciendo uso de los componentes funcionales, a continuación se muestra la distribución de carpetas y que almacena cada una:

- <strong>App.js: </strong> Este archivo contiene todas las rutas de la aplicación, si se crea una nueva vista ingresar aqui la nueva ruta.
- <strong>Recursos/: </strong> Esta carpeta contiene todas las url usadas para la conexión con el backend.
- <strong>Imagenes/: </strong> En esta carpeta estan todas las imagenes usadas en la aplicación, por el momento solo esta el logo y el fondo de la pantalla login.
- <strong>Componentes/: </strong> Dentro de esta carpeta se encuentran todos los componentes usados en la aplicación, todos estas separados en carpetas y cada carpeta contiene un archivo .js y .css.

## Notas

- La versión de nodejs usada es: 14.17.4
- La versión de npm usada es: 7.21.1

## Faltantes

- Se necesita implementar la funcionalidad de cambiar estado en los pedidos ya completados.
