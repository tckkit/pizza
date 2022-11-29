import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HistoryOrder(props) {
  const listing = props.data;
  const orderNumber = props.index + 1;

  useEffect(() => {
    fetchData();
  }, []);

  // Dummay Data
  const [listingsDummyData, setListingsDummyData] = useState();

  // Fetch Data
  const fetchData = async () => {
    axios
      .get("http://localhost:5000/menu/")
      .then((res) => {
        const data = res.data;
        setListingsDummyData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = (id, title) => {
    const array = listingsDummyData.filter((item) => item["id"] == id);
    if (array.length == 0) return "Error";
    return array[0][title];
  };

  const getTotalCost = (id, quantity) => {
    const price = getDetails(id, "price");
    const total = price * quantity;
    return total.toFixed(2);
  };

  const convertISO = (isoDate) => {
    const date1 = new Date(isoDate);
    return date1.toLocaleString();
  };

  return (
    <div className="editItemContainer">
      <div className="orderNumberContainer">
        <div>
          <h3> Order </h3>
        </div>
        <div>
          <h3> #{orderNumber} </h3>
        </div>
      </div>

      <div className="orderItemDesContainer">
        <div className="desContainer">
          <div className="orderPizzaTitleContainer">
            <span>{convertISO(listing.creationDT)}</span>
          </div>
          <div className="orderPizzaTitleContainer">
            <span>Order ID: {listing.id}</span>
          </div>
          <div className="orderPizzaDesContainer">
            {listingsDummyData &&
              listing.items.slice(0, 4).map((item) => (
                <div className="orderedItemContainer">
                  <span>
                    {getDetails(item.productId, "name")} x {item.qty}
                  </span>
                  <span> ${getTotalCost(item.productId, item.qty)}</span>
                </div>
              ))}
            {listing.items.length > 4 && (
              <div className="orderedItemContainer">
                <span> ... </span>
                <span> ... </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="totalOrderPrice">
        <h4>Total:</h4>
        <h4>${listing.totalPrice}</h4>
      </div>
    </div>
  );
}
