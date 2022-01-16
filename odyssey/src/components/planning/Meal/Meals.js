import React from "react";
import MealDay from "./MealDay";
import "../../component-styles/Meals.scss";

const Meals = () => {
  return (
    <main className="meal">
      <MealDay></MealDay>
      <MealDay></MealDay>
    </main>
  );
};

export default Meals;
