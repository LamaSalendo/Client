import React from "react";
import { Item } from "../../Types";

function ItemPage({ name }: Item) {
  console.log(name);
  return <div>{name}</div>;
}

export default ItemPage;
