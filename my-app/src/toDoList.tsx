import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
    const [numRemainingItems, setNumRemainingItems] = useState(0);
    const [items, setItems] = useState(dummyGroceryList);
    const { name } = useParams();
  
    function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
      const checkbox = e.target as HTMLInputElement;
      const itemName = checkbox.name;
  
      const updatedItems = items.map(item =>
        item.name === itemName ? { ...item, isPurchased: checkbox.checked } : item
      );
  
      setItems(updatedItems);
  
      const purchasedCount = updatedItems.filter(item => item.isPurchased).length;
      setNumRemainingItems(purchasedCount);
    }
  

 return (
   <div className="App">
     <div className="App-body">
     <h1>{name}'s To Do List</h1>
       Items bought: {numRemainingItems}
       <form action=".">
         {items.map((item) => ListItem(item, handleCheckboxClick))}
       </form>
     </div>
   </div>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div>
     <input
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
       data-testid={`checkbox-${item.name}`}
     />
     {item.name}
   </div>
 );
}