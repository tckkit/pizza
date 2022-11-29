import React, { useEffect, useState } from "react";
import img_placeholder from "../../assets/images/img-placeholder.png";
import * as ReactBootstrap from "react-bootstrap";
import axios from "axios";

// Material UI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Shopping Cart functions
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function Results() {
  useEffect(() => {
    fetchData();
  }, []);

  // Dummay Data
  const [listingsDummyData, setListingsDummyData] = useState();
  const [itemSchema, setItemSchema] = useState();
  const [displayData, setDisplayData] = useState();
  const [selectedCat, setSelectedCat] = useState([
    "pizza",
    "appetiser",
    "drinks",
    "snacks",
  ]);
  const [displayCat, setDisplayCat] = useState([
    "pizza",
    "appetiser",
    "drinks",
    "snacks",
  ]);

  // Fetch Data
  const fetchData = async () => {
    axios
      .get("http://localhost:5000/menu/")
      .then((res) => {
        const data = res.data;
        setListingsDummyData(data);
        setDisplayData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/Menu/Cat/")
      .then((res) => {
        const data = res.data;
        let catId = data.map(({ id }) => id);
        let catName = data.map(({ name }) => name);
        const categories = {};
        for (let i = 0; i < catId.length; i++) {
          categories[catId[i]] = catName[i];
        }
        setSelectedCat(catId);
        setDisplayCat(catId);
        setItemSchema(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckItem = (cat) => {
    let newSelectedCat = [...selectedCat];
    if (selectedCat.includes(cat)) {
      newSelectedCat.splice(selectedCat.indexOf(cat), 1);
      setSelectedCat(newSelectedCat);
      const newListing = listingsDummyData.filter((pizza) =>
        newSelectedCat.includes(pizza.categoryId)
      );
      setDisplayData(newListing);
      return;
    }
    newSelectedCat.push(cat);
    setSelectedCat(newSelectedCat);
    const newListing = listingsDummyData.filter((pizza) =>
      newSelectedCat.includes(pizza.categoryId)
    );
    setDisplayData(newListing);
    return;
  };

  // Cart functions useContext
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

  return (
    <div className="bigLisingContainer">
      <div className="filtercss">
        {itemSchema &&
          displayCat.map((cat, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  color="warning"
                  onClick={() => handleCheckItem(cat)}
                />
              }
              label={itemSchema[cat].toUpperCase()}
            />
          ))}
      </div>
      {false ? (
        <div className="spinnercss">
          <ReactBootstrap.Spinner animation="border" variant="secondary" />
        </div>
      ) : displayData && displayData.length > 0 ? (
        <div className="listings">
          {displayData.map((listing, i) => (
            <div class="pizzaContainer">
              <div className="image-100">
                <img
                  src={`${listing.imgSrc}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = img_placeholder;
                  }}
                  loading="lazy"
                  width="400"
                  height="400"
                  alt=""
                  className="image-4"
                />

                {/* Pizza Description */}
                <div className="pizzaDes">
                  {/* Pizza wordings */}
                  <div className="pizzaWordings">
                    <h3 className="pizzaTitlePrice">
                      <b>{listing.name}</b>
                      <span>${listing.price.toFixed(2)}</span>
                    </h3>
                    <h5>{listing.description}</h5>
                  </div>

                  {/* Add to cart */}
                  <div className="addToButton">
                    <Stack direction="row" spacing={2}>
                      {/* Add to cart button*/}
                      {getItemQuantity(listing.id) == 0 && (
                        <Button
                          variant="contained"
                          color="success"
                          size="large"
                          onClick={() => increaseCartQuantity(listing.id)}
                        >
                          Add to cart
                        </Button>
                      )}

                      {/* Multiple items */}
                      {getItemQuantity(listing.id) > 0 && (
                        <div className="quantityController">
                          <Button
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={() => decreaseCartQuantity(listing.id)}
                          >
                            -
                          </Button>
                          <span className="pizzaQuantity">
                            {getItemQuantity(listing.id)}
                          </span>
                          <Button
                            variant="contained"
                            size="large"
                            onClick={() => increaseCartQuantity(listing.id)}
                          >
                            +
                          </Button>
                        </div>
                      )}
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5 className="makeitcentre">No item found</h5>
      )}
    </div>
  );
}
