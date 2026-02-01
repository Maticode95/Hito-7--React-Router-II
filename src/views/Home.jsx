import React, { useEffect, useState } from "react";
//import { pizzas } from "../pizzas";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";

const Home = () => {

  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPizzas();
    }, []);

    console.log(pizzas)

  return (
    <div>
      <Header />

      <div className="container mt-4">
        <div className="row">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-md-4 d-flex justify-content-center">
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                img={pizza.img}
                ingredients={pizza.ingredients}
                coupon={pizza.coupon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
