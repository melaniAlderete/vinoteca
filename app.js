function Producto (id, marca, bodega, variedad, varietal, precio) {
    this.id = id;
    this.marca = marca;
    this.bodega = bodega;
    this.variedad = variedad;
    this.varietal =varietal;
    this.precio = precio;
}

const producto1 = new Producto(01, "Las Perdices", "Viña Las Perdices", "Tinto", "Malbec",1480);
const producto2 = new Producto(02, "Perro Callejero", "Mosquita Muerta Wines", "Tinto", "Malbec",960);
const producto3 = new Producto(03, "Sapo De Otro Pozo", "Mosquita Muerta Wines", "Tinto", "Malbec",1970);
const producto4 = new Producto(04, "Sombrero", "Huentala Wines", "Tinto", "Cabernet franc",1050);
const producto5 = new Producto(05, "Territorio", "Amalaya", "Tinto", "Malbec", 1080);
const producto6 = new Producto(06, "El Enemigo", "Aleanna", "Tinto", "Malbec",3250);

const productos = [producto1, producto2, producto3, producto4, producto5, producto6];

function ordenar(key){
let productosAux = [...productos];
if (key == "-") {
    productosAux.sort((a, b) => a.precio - b.precio); 
} else if (key == "+") {
    productosAux.sort((a, b) => b.precio - a.precio);
}
return productosAux;
}

console.log(ordenar("-"));

function filtrar(bodega, variedad, varietal, precioMax, precioMin){
    if (precioMax == undefined){
        precioMax = Number.MAX_VALUE;
    }
    if (precioMin == undefined) {
        precioMin = 0;
    } 
    let filtro = (a, b) => {
        return a == b || b == undefined;
    }
    return productos.filter((p)=> filtro(p.bodega, bodega) && filtro(p.variedad, variedad) && filtro(p.varietal, varietal) && p.precio <= precioMax && p.precio >= precioMin);
}

console.log(filtrar("Mosquita Muerta Wines", "Tinto", undefined, 3000, undefined));

function total(contador, envio) {
    if (contador == 0) {
        alert("Su carrito esta vacío")
    } else {
        costo = contador + envio;
    }
    return costo;
}

function lista([]) {
    var carrito = ""; 
    for (const producto of items) {
        carrito = carrito+"-"+(producto.marca)+"\n";
    }
    alert("Su carrito:\n"+carrito);
}

function mostrar(mensaje) {
    console.log("Ingrese en la funcion mostrar")
    alert("El costo total de su carrito con envío incluido es: $"+mensaje);
    lista(productos);
}

const items = [];
var envio = 700;
var contador = 0;
var costo = 0;

let entrada = prompt("Seleccione los productos que va a comprar, una vez finalizado escriba ESC \n a) Las Perdices $1480 \n b) Perro Callejero $960 \n c) Sapo De Otro Pozo $1970 \n d) Sombrero $1050 \n e) Territorio $1080 \n f) El Enemigo $3250")
while (entrada != "ESC") {
    switch (entrada) {
        case "a":
            contador = contador + producto1.precio;
            items.push(producto1);
            break;
        case "b":
            contador = contador + producto2.precio;
            items.push(producto2);
            break;
        case "c":
            contador = contador + producto3.precio;
            items.push(producto3);
            break;
        case "d":
            contador = contador + producto4.precio;
            items.push(producto4);
            break;
        case "e":
            contador = contador + producto5.precio;
            items.push(producto5);
            break;
        case "f":
            contador = contador + producto5.precio;
            items.push(producto5);
            break;
        default:
            alert("Por favor ingrese una opción valida")
            break;
    }
    entrada = prompt("Seleccione los productos que va a comprar, una vez finalizado escriba ESC \n a) Las Perdices $1480 \n b) Perro Callejero $960 \n c) Sapo De Otro Pozo $1970 \n d) Sombrero $1050 \n e) Territorio $1080 \n f) El Enemigo $3250")
}

var costo = total(contador, envio);
mostrar(costo);