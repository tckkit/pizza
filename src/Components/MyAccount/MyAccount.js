import React from "react";
import { useState, useEffect } from "react";
import HistoryOrder from "./HistoryOrder.js";
import axios from "axios";

export default function MyAccount() {
  useEffect(() => {
    fetchData();
  }, []);

  // Dummay Data
  const [listingsDummyData, setListingsDummyData] = useState();

  useEffect(() => {}, [listingsDummyData]);

  const accountId = localStorage.getItem("accountId");

  // Fetch Data
  const fetchData = async () => {
    axios
      .get(`http://localhost:5000/Member/History/${accountId}`)
      .then((res) => {
        const data = res.data;
        setListingsDummyData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edpark-intro">
      <div className="pageContainer">
        {listingsDummyData && listingsDummyData.length > 0 ? (
          listingsDummyData.map((listing, index) => (
            <HistoryOrder data={listing} index={index} />
          ))
        ) : (
          <>
            <h5 className="makeitcentre">No history found</h5>
          </>
        )}
      </div>
    </div>
  );
}
