function Producto(id, marca, bodega, variedad, varietal, precio, img) {
  this.id = id;
  this.marca = marca;
  this.bodega = bodega;
  this.variedad = variedad;
  this.varietal = varietal;
  this.precio = precio;
  this.img = img;
}

const producto1 = new Producto(
  01,
  "Las Perdices",
  "Viña Las Perdices",
  "Tinto",
  "Malbec",
  1480,
  "../images/lasperdices.png"
);
const producto2 = new Producto(
  02,
  "Perro Callejero",
  "Mosquita Muerta Wines",
  "Tinto",
  "Malbec",
  960,
  "../images/perrocallejero.png"
);
const producto3 = new Producto(
  03,
  "Sapo De Otro Pozo",
  "Mosquita Muerta Wines",
  "Tinto",
  "Malbec",
  1970,
  "../images/sapodeotropozo.png"
);
const producto4 = new Producto(
  04,
  "Sombrero",
  "Huentala Wines",
  "Tinto",
  "Cabernet franc",
  1050,
  "../images/sombrero.png"
);
const producto5 = new Producto(
  05,
  "Territorio",
  "Amalaya",
  "Tinto",
  "Malbec",
  1080,
  "../images/territorio.png"
);
const producto6 = new Producto(
  06,
  "El Enemigo",
  "Aleanna",
  "Tinto",
  "Malbec",
  3250,
  "../images/elenemigo.png"
);

const productos = [
  producto1,
  producto2,
  producto3,
  producto4,
  producto5,
  producto6,
];
let items = [];
const containerProductos = document.getElementById("products");

function crearCards(array) {
  containerProductos.innerHTML = "";
  array.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "productCard";
    div.id = `${producto.id}`;
    div.innerHTML = `<img src=${producto.img}>
                    <h3>${producto.marca}</h3>
                    <p class="price">$ ${producto.precio}</p>
                    <p><button type="button" class="cart">Añadir al Carrito <i class="bi bi-cart-fill"></i></button></p>`;
    containerProductos.append(div);
  });
  addCartButton();
}

crearCards(productos);

function addToCart(id) {
  for (let i = 0; i < productos.length; i++) {
    if (id == productos[i].id) {
      items.push(productos[i]);
    }
  }
  console.log(items);
}

function addCartButton() {
  const buttons = document.getElementsByClassName("cart");
  for (let i = 0; i < buttons.length; i++) {
    let productId = buttons[i].parentElement.parentElement.id;
    buttons[i].addEventListener("click", () => {
      addToCart(productId);
    });
  }
}

let select = document.getElementById("sort");

function getValue() {
  let key = select.options[select.selectedIndex].value;
  ordenar(key);
}

function ordenar(key) {
  let productosAux = [...productos];
  if (key == "-") {
    productosAux.sort((a, b) => a.precio - b.precio);
  } else if (key == "+") {
    productosAux.sort((a, b) => b.precio - a.precio);
  }
  crearCards(productosAux);
}

select.onchange = getValue;

function filtrar(bodega, variedad, varietal, precioMax, precioMin) {
  if (precioMax == undefined) {
    precioMax = Number.MAX_VALUE;
  }
  if (precioMin == undefined) {
    precioMin = 0;
  }
  let filtro = (a, b) => {
    return a == b || b == undefined;
  };
  return productos.filter(
    (p) =>
      filtro(p.bodega, bodega) &&
      filtro(p.variedad, variedad) &&
      filtro(p.varietal, varietal) &&
      p.precio <= precioMax &&
      p.precio >= precioMin
  );
}

console.log(
  filtrar("Mosquita Muerta Wines", "Tinto", undefined, 3000, undefined)
);

function total(contador, envio) {
  if (contador == 0) {
    alert("Su carrito esta vacío");
  } else {
    costo = contador + envio;
  }
  return costo;
}

function lista() {
  var carrito = [];
  for (const producto of items) {
    carrito = carrito + "-" + producto.marca + "\n";
  }
  alert("Su carrito:\n" + carrito);
}

function mostrar(mensaje) {
  console.log("Ingrese en la funcion mostrar");
  alert("El costo total de su carrito con envío incluido es: $" + mensaje);
  lista(productos);
}

var envio = 700;
var contador = 0;
var costo = 0;
