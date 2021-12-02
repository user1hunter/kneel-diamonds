import {
    getOrders,
    getMetals,
    getSizes,
    getStyles,
    getOrderBuilder,
    addCustomOrder,
  } from "./database.js";
  
  const buildOrderListItem = (order) => {
    const metals = getMetals();
  
    // Remember that the function you pass to find() must return true/false
    const foundMetal = metals.find((metal) => {
      return metal.id === order.metalId;
    });
  
    const sizes = getSizes();
  
    const foundSize = sizes.find((size) => size.id === order.sizeId);
  
    const styles = getStyles();
    const foundStyle = styles.find((style) => style.id === order.styleId);
  
    const totalCost = foundMetal.price + foundSize.price + foundStyle.price;
  
    const costString = totalCost.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  
    return `<li>
          Order #${order.id} cost ${costString} and was placed on ${order.timestamp}
      </li>`;
  };
  
  export const Orders = () => {
    /*
          Can you explain why the state variable has to be inside
          the component function for Orders, but not the others?
      */
    const orders = getOrders();
  
    let html = "<ul>";
  
    const listItems = orders.map(buildOrderListItem);
  
    html += listItems.join("");
    html += "</ul>";
  
    return html;
  };
  
  document.addEventListener("click", (event) => {
    if (event.target.id === "orderButton") {
      const builtOrder = getOrderBuilder();
      if (Object.keys(builtOrder).length >= 3) {
        addCustomOrder();
      }
    }
  });
