import React, { useEffect, useState } from "react";
import DetailPizza from "../components/DetailPizza";
import Header from "../components/Header";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas/p001");
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPizza();
  }, []);

  return (
    <div>
      <Header />
      <DetailPizza pizza={pizza} />
    </div>
  );
};

export default Pizza;
