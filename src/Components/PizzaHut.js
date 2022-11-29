import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import Button from "@mui/material/Button";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
//Success Modal
import Modal from "react-modal";
import success from "../assets/images/success.png";

export default function PizzaHut() {
  useEffect(() => {
    fetchData();
  }, []);

  // Dummay Data
  const [listingsDummyData, setListingsDummyData] = useState();

  // Add a new pizza
  const [newPizzaAmount, setNewPizzaAmount] = useState([]);
  const addPizza = () => {
    const newIndex = newPizzaAmount.length + 1;
    setNewPizzaAmount((prevState) => [...prevState, newIndex]);
  };

  const removePizza = (index) => {
    const currArr = [...newPizzaAmount];
    const arrIndex = currArr.indexOf(index);
    if (arrIndex > -1) {
      currArr.splice(arrIndex, 1);
    }
    setNewPizzaAmount(currArr);
  };

  // New Pizza Form Teamplate JSON
  const templatePizza = {
    id: null,
    image: null,
    company_name: null,
    description: null,
    price: null,
    cat: null,
  };

  // Fetch Data
  const fetchData = () => {
    axios
      .get("http://localhost:5000/menu/")
      .then((res) => {
        const data = res.data;
        setListingsDummyData(data);
        // setDisplayData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Copid Link Success Message Modal
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const modal2Style = {
    overlay: {
      position: "fixed",
      top: "12%",
      left: "20%",
      right: "20%",
      bottom: "90%",
      backgroundColor: "rgba(72, 72, 72, 0.75)",
    },
    content: {
      position: "absolute",
      top: "10%",
      left: "40%",
      right: "40%",
      bottom: "50%",
      border: "2px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "10px",
      outline: "none",
      padding: "20px",
    },
  };

  return (
    <div className="edpark-intro">
      {/* Payment Success Modal */}
      <Modal isOpen={modal2IsOpen} style={modal2Style} className="modal2Style">
        <div className="buttonImgContainer2">
          <img src={success} loading="lazy" width="30" height="30" />
          <div className="successName">
            <span>Saved</span>
          </div>
        </div>
      </Modal>
      <div className="pageContainer">
        {/* Every Edit Item Container */}
        {listingsDummyData && listingsDummyData.length > 0 ? (
          listingsDummyData.map((listing, index) => (
            <Editor
              data={listing}
              refresh={() => {
                fetchData();
                setModal2IsOpen(true);
                setTimeout(() => {
                  setModal2IsOpen(false);
                }, 2000);
              }}
            />
          ))
        ) : (
          <div className="spinnercss">
            <ReactBootstrap.Spinner animation="border" variant="secondary" />
          </div>
        )}
        {newPizzaAmount.map((index) => (
          <Editor
            data={templatePizza}
            key={index}
            indexNum={index}
            removeItem={removePizza}
            refresh={() => {
              fetchData();
              setModal2IsOpen(true);
              setTimeout(() => {
                setModal2IsOpen(false);
              }, 2000);
            }}
          />
        ))}
        <div className="addNewButton">
          <Button
            variant="contained"
            color="success"
            onClick={() => addPizza()}
          >
            Add an item
          </Button>
        </div>
      </div>
    </div>
  );
}
