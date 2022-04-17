const url_server = "http://localhost:8000";
// URL generales
const url_user = `${url_server}/usuarios`;
const url_productos = `${url_server}/productos`;
export const url_usuarios = '/usuarios/';
// Imagenes
export const url_static = `${url_server}/static`;
// Usuarios
export const url_login = `${url_user}/login_vendedor`;
// Comidas
export const url_get_comidas = `${url_productos}/allcomidas`;
export const url_crud_comida = `${url_productos}/comida`;
// Categorias
export const url_get_categorias = `${url_productos}/allcategorias`;
export const url_get_categoria = `${url_productos}/categoria`;
// Pedidos
export const url_get_pedidos = `${url_productos}/allpedidos`;
export const url_get_detalle = `${url_productos}/detallepedido`;
// Usuarios
export const url_get_cliente = `${url_user}/cliente`;
export const url_vendedor = `${url_server + url_usuarios}vendedor/`
//Registro
export const url_registrar_vendedor = `${url_server} ${url_usuarios}registrar_vendedor`;
export const url_valicacion_vendedor= `${url_user}/allvendedor`;
