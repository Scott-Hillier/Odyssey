import React, { useEffect } from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
import { useState } from "react";
import {
  updateMealCard,
  deleteMeal,
  getMealsForTrip,
  getNutrition,
} from "../../../Helpers/apiHelpers";
import { formatTripMealsData } from "../../../Helpers/dataHelpers";

const SAVE = "SAVE";
const SAVED = "SAVED";

const MealCard = (props) => {
  const mealItemArray = [];
  const [newItemState, setNewItemState] = useState({
    name: "",
    quantity: "",
  });
  const [saveState, setSaveState] = useState(SAVE);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  let nutritionString = "";
  let newItemString = "";
  // const [newItemStringState, setNewItemStringState] = useState("");
  let previousItemString = "";

  for (const mealItemKey in props.mealState.mealItems) {
    newItemString =
      props.mealState.mealItems[mealItemKey].mealItemQuantity +
      " " +
      props.mealState.mealItems[mealItemKey].mealItemName;
    if (newItemString !== previousItemString) {
      nutritionString += ", " + newItemString;
    }
    previousItemString =
      props.mealState.mealItems[mealItemKey].mealItemQuantity +
      " " +
      props.mealState.mealItems[mealItemKey].mealItemName;
    mealItemArray.push(
      <MealItem
        key={mealItemKey}
        itemState={props.mealState.mealItems[mealItemKey]}
        edit={props.edit}
        setMealState={props.setMealState}
        mealId={props.mealState.mealId}
        dayId={props.dayId}
        tripId={props.tripId}
        totalWeight={totalWeight}
        totalCalories={totalCalories}
        setTotalWeight={setTotalWeight}
        setTotalCalories={setTotalCalories}
        setSaveState={setSaveState}
      ></MealItem>
    );
  }

  useEffect(() => {
    if (nutritionString.length > 0) {
      console.log("hsjkbddfhs");
      getNutrition(nutritionString).then((response) => {
        setTotalWeight(response.data.weight);
        setTotalCalories(response.data.calories);
      });
    }
  }, [nutritionString]);

  return (
    <div className={"mealCard"}>
      {props.edit === "edit" ? (
        <div className={"meal-card-title"}>
          <input
            className="meal-card-title-input"
            value={props.mealState.mealName}
            onChange={(e) => {
              setSaveState(SAVE);
              props.setMealState((prev) => {
                const newState = { ...prev };
                newState[props.dayId].meals[props.mealState.mealId] = {
                  ...newState[props.dayId].meals[props.mealState.mealId],
                  mealName: e.target.value,
                };

                return newState;
              });
            }}
          ></input>
          <button
            className="meal-card-title-button"
            onClick={() => {
              deleteMeal(props.mealState.mealId).then(() => {
                getMealsForTrip(props.tripId).then((res) => {
                  props.setMealState(formatTripMealsData(res.data));
                });
              });
            }}
          >
            X
          </button>
        </div>
      ) : (
        <p>{props.mealState.mealName}</p>
      )}

      <table>
        <tbody className="meal-table">
          <tr className="meal-table-titles">
            <th className={"delete"}></th>
            <th className="meal-item-title">Items</th>
            <th className="meal-quantity-title">Quantity</th>
            {/* <th className="meal-quantity-title">≈Weight</th>
            <th className="meal-quantity-title">≈Calories</th> */}
          </tr>
          {mealItemArray}
          <tr className="meal-table-items">
            <td className={"delete"}></td>
            <td>
              {props.edit === "edit" && (
                <input
                  className="meal-card-new-item"
                  placeholder="New Item"
                  value={newItemState.name}
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                ></input>
              )}
            </td>
            <td>
              {props.edit === "edit" && (
                <input
                  className="meal-card-new-quantity"
                  placeholder="Quantity"
                  type={"text"}
                  value={newItemState.quantity}
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, quantity: e.target.value };
                    });
                  }}
                ></input>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {props.edit === "edit" && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaveState(SAVE);
              props.setMealState((prev) => {
                const newState = { ...prev };
                newState[props.dayId].meals[props.mealState.mealId].mealItems =
                  {
                    ...newState[props.dayId].meals[props.mealState.mealId]
                      .mealItems,
                  };
                const newKey =
                  -Object.keys(
                    newState[props.dayId].meals[props.mealState.mealId]
                      .mealItems
                  ).length - 1;
                newState[props.dayId].meals[props.mealState.mealId].mealItems[
                  newKey
                ] = {
                  mealItemName: newItemState.name,
                  mealItemQuantity: newItemState.quantity,
                  mealItemId: newKey,
                };
                return newState;
              });
              setNewItemState({
                name: "",
                quantity: "",
              });
            }}
          >
            <button className="meal-card-add-save">Add Item</button>
          </form>
          {saveState === SAVE && (
            <button
              className="meal-card-add-save"
              onClick={(e) => {
                e.preventDefault();
                setSaveState(SAVED);
                updateMealCard(
                  props.dayId,
                  props.mealState.mealId,
                  props.mealState.mealName,
                  props.mealState.mealItems
                );
              }}
            >
              Save Card
            </button>
          )}
          {saveState === SAVED && (
            <button className="meal-card-add-save">Saved!</button>
          )}
        </>
      )}
      <div className="nutrition-info">
        Est. Weight: {(totalWeight / 1000).toFixed(2)} kg
      </div>
      <div className="nutrition-info">
        Est. Calories: {totalCalories.toFixed(0)} cal
      </div>
    </div>
  );
};

export default MealCard;
