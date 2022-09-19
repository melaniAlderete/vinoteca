const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cartOverlay");
let cartButton = document.getElementById("cartButton");
let closeCart = document.getElementById("closeCart");
let clean = document.getElementById("clean");
let pay = document.getElementById("pay");
let cartFooter = document.getElementsByClassName("cartFooter")[0];
const cardItems = document.getElementById("cartItems");

function cartCard() {
  let carrito =
    localStorage.getItem("cart") == null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  cardItems.innerHTML = "";
  if (carrito.length == 0) {
    cardItems.innerHTML = `<h3>El carrito esta vacío</h3>`;
    cartFooter.setAttribute("hidden", true);
  } else {
    cartFooter.removeAttribute("hidden");
  }
  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "cartItem";
    div.id = `${producto.id}`;
    div.innerHTML = `<img src=${producto.img}>
                    <div>
                    <h4>${producto.marca}</h4>
                    <h5>$ ${producto.precio}</h5>
                    </div>
                    <div class="opcionesCarrito">
                    <i class="bi bi-plus-lg"></i>
                    <p>${producto.unidades}</p>
                    <i class="bi bi-dash-lg"></i>
                    <i class="bi bi-trash3"></i>
                    </div>`;
    cardItems.append(div);
  });
  addFunction();
}

function addFunction() {
  const increase = document.getElementsByClassName("bi-plus-lg");
  const decrease = document.getElementsByClassName("bi-dash-lg");
  const trash = document.getElementsByClassName("bi-trash3");
  for (let i = 0; i < increase.length; i++) {
    let productId = increase[i].parentElement.parentElement.id;
    increase[i].addEventListener("click", () => {
      increaseButton(productId);
    });
  }
  for (let i = 0; i < decrease.length; i++) {
    let productId = decrease[i].parentElement.parentElement.id;
    decrease[i].addEventListener("click", () => {
      decreaseButton(productId);
    });
  }
  for (let i = 0; i < trash.length; i++) {
    let productId = trash[i].parentElement.parentElement.id;
    trash[i].addEventListener("click", () => {
      trashButton(productId);
    });
  }
}

function increaseButton(productId) {
  let carrito =
    localStorage.getItem("cart") == null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < carrito.length; i++) {
    if (productId == carrito[i].id) {
      carrito[i].unidades += 1;
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(carrito));
      totalCost(carrito[i]);
      cartNumbers();
    }
  }
  cartCard();
}

function decreaseButton(productId) {
  let carrito =
    localStorage.getItem("cart") == null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < carrito.length; i++) {
    if (productId == carrito[i].id) {
      if (carrito[i].unidades > 1) {
        carrito[i].unidades -= 1;
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(carrito));
        decreaseCost(carrito[i]);
        decreaseCartNumbers();
      }
    }
  }
  cartCard();
}

function trashButton(productId) {
  let carrito =
    localStorage.getItem("cart") == null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < carrito.length; i++) {
    if (productId == carrito[i].id) {
      deleteCost(carrito[i]);
      deleteCartNumbers(carrito[i]);
      carrito.splice(i, 1);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(carrito));
    }
  }
  cartCard();
}

function totalCost(producto) {
  let totalCost = localStorage.getItem("totalCost");
  let costo = typeof totalCost == "object" ? 0 : parseInt(totalCost);
  costo += producto.precio;
  localStorage.setItem("totalCost", costo);
  document.querySelector("#totalCost").textContent = costo;
}

function decreaseCost(producto) {
  let totalCost = localStorage.getItem("totalCost");
  let costo = typeof totalCost == "object" ? 0 : parseInt(totalCost);
  costo -= producto.precio;
  localStorage.setItem("totalCost", costo);
  document.querySelector("#totalCost").textContent = costo;
}

function deleteCost(producto) {
  let totalCost = localStorage.getItem("totalCost");
  let costo = typeof totalCost == "object" ? 0 : parseInt(totalCost);
  costo -= producto.precio * producto.unidades;
  localStorage.setItem("totalCost", costo);
  document.querySelector("#totalCost").textContent = costo;
}

function cartNumbers() {
  let cantidad = localStorage.getItem("numCart");
  cantidad = parseInt(cantidad);
  if (cantidad) {
    localStorage.setItem("numCart", (cantidad += 1));
    document.querySelector("#quantity").textContent = cantidad;
  } else {
    localStorage.setItem("numCart", 1);
    document.querySelector("#quantity").textContent = 1;
  }
}

function decreaseCartNumbers() {
  let cantidad = localStorage.getItem("numCart");
  cantidad = parseInt(cantidad);
  if (cantidad) {
    localStorage.setItem("numCart", (cantidad -= 1));
    document.querySelector("#quantity").textContent = cantidad;
  }
}

function deleteCartNumbers(producto) {
  let cantidad = localStorage.getItem("numCart");
  cantidad = parseInt(cantidad);
  if (cantidad) {
    localStorage.setItem("numCart", (cantidad -= producto.unidades));
    document.querySelector("#quantity").textContent = cantidad;
  }
}

function showCart() {
  cartCard();
  document.querySelector("#totalCost").textContent =
    localStorage.getItem("totalCost");
  cartOverlay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
}

function hideCart() {
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
}

function cleanCart() {
  localStorage.clear();
  location.reload();
}

function getRandomNum() {
  return Math.round(Math.random() * (10000 - 1000) + 1000);
}


function checkoutMail(email, Toast) {
  let products = [];
  let carrito = JSON.parse(localStorage.getItem("cart"));
  carrito.forEach((carrito) => {
    products.push(" "+carrito.marca+" x"+ carrito.unidades);
  })
  let params = {
    random_number: getRandomNum(),
    total: parseInt(localStorage.getItem("totalCost")),
    carrito: products.toString(),
    to_mail: email,
  };
  if (params.to_mail != "") {
    emailjs.send("service_aq7mtds", "template_jwvmd3n", params).then((res) => {
      Toast.fire({
        icon: "success",
        title:
          "Gracias! Dentro de poco te vamos a estar mandando el detalle de tu compra!",
      });
    }, (error)=>{
      Toast.fire({
        icon: "error",
        title:
          "Oops... Algo salió mal! error:"+error.status,
      });
    });
  } 
}


async function startPayment() {
  let totalCost = parseInt(localStorage.getItem("totalCost"));
  	const email  = await Swal.fire({
  title: 'Ingrese su dirección de email',
  input: 'email',
  inputLabel: 'para continuar con la compra',
  inputPlaceholder: 'Ingrese su dirección de email'
})
  Swal.fire({
    icon: 'warning',
    title: 'Esta por ser redireccionado a la página de MERCADO PAGO para abonar el monto de $ '+totalCost,
  }).then(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      width: 500,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    });

    payment(totalCost)
      .then(() => {
       hideCart();
       checkoutMail(email.value, Toast);
       setTimeout(cleanCart, 8000);
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: "Hubo un error con tu compra y no pudo ser procesada.",
        });
        console.log(error);
      });
  });
}

async function payment(cost) {
  let wnd = window.open("https://mpago.la/13NDtZg", "_blank");
  let later = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  };

  await later().then(() => {
    wnd.close();
  });

  return Promise.resolve();
}

cartButton.onclick = showCart;
closeCart.onclick = hideCart;
clean.onclick = cleanCart;
pay.onclick = startPayment;

function onLoadCantidad() {
  let cantidad = localStorage.getItem("numCart");
  document.querySelector("#quantity").textContent = cantidad;
};

onLoadCantidad();
