let pizzas = [
  {
    "name": "Classic Supreme",
    "crust": "Thin",
    "toppings": {
      "meats": [ 'Sausage', 'Pepperoni' ],
      "nonMeats": [ 'Green Peppers', 'Mushrooms', 'Black Olives', 'Onions' ]
    },
    "sauce": "Tomato",
    "size": 14,
    "price": 1000,
    "custom": false
  },
  {
    "name": "Chicago",
    "crust": "Deep Dish",
    "toppings": {
      "meats": [ 'Pepperoni' ],
      "nonMeats": [ 'Banana Peppers', 'Green Peppers', 'Mushrooms', 'Black Olives', 'Onions' ]
    },
    "sauce": "Robust Tomato",
    "size": 12,
    "price": 1500,
    "custom": false
  },
  {
    "name": "Classic Pepperoni",
    "crust": "Regular",
    "toppings": {
      "meats": [ 'Pepperoni' ],
      "nonMeats": []
    },
    "sauce": "Tomato",
    "size": 12,
    "price": 1000,
    "custom": false
  }
];

let createPizzas = () => {

  let pizzaCount = Pizza.find().count();

  if (pizzaCount < 1) {
    for (let i = 0; i < pizzas.length; i++) {
      let pizza = pizzas[i];

      Pizza.insert(pizza);
    }
  }
};

Modules.server.createPizzas = createPizzas;
