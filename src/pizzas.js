
export const pizzas = [
  {
    id: 1,
    name: "margarita",
    price: 800,
    img: "/images/margarita.jpeg",
    ingredients: ["tomate", "mozzarella", "albahaca"],
    coupon: { code: "MARG10", discount: 10 }
  },
  {
    id: 2,
    name: "pepperoni",
    price: 950,
    img: "/images/pepperoni.jpg",
    ingredients: ["pepperoni", "mozzarella", "salsa"],
    coupon: { code: "PEP15", discount: 15 }
  },
  {
    id: 3,
    name: "cuatro quesos",
    price: 1100,
    img: "/images/4quesos.jpeg",
    ingredients: ["mozzarella", "parmesano", "gorgonzola", "queso crema"],
    coupon: { code: "4Q20", discount: 20 }
  },
  {
    id: 4,
    name: "hawaiana",
    price: 1000,
    img: "/images/hawaiana.jpg",
    ingredients: ["jamón", "anana", "mozzarella"],
    coupon: { code: "HAW5", discount: 5 }
  },
  {
    id: 5,
    name: "napolitana",
    price: 900,
    img: "/images/napolitana.jpg",
    ingredients: ["tomate", "mozzarella", "ajo", "orégano"],
    coupon: { code: "NAPI12", discount: 12 }
  },
  {
    id: 6,
    name: "vegetariana",
    price: 850,
    img: "/images/vegetariana.jpeg",
    ingredients: ["pimiento", "cebolla", "aceitunas", "champiñones"],
    coupon: { code: "VEG8", discount: 8 }
  },
];

// Carrito de prueba con cantidad (count)
export const pizzaCart = [
  {
    id: 1,
    name: "margarita",
    price: 800,
    img: "/images/margarita.jpeg",
    count: 2,
    coupon: { code: "MARG10", discount: 10 }
  },
  {
    id: 2,
    name: "pepperoni",
    price: 950,
    img: "/images/pepperoni.jpg",
    count: 1,
    coupon: { code: "PEP15", discount: 15 }
  },
  {
    id: 3,
    name: "cuatro quesos",
    price: 1100,
    img: "/images/4quesos.jpeg",
    count: 3,
    coupon: { code: "4Q20", discount: 20 }
  },
];