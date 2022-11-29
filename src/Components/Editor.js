import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import img_placeholder from "../assets/images/img-placeholder.png";
import axios from "axios";

// MUI
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Editor(props) {
  useEffect(() => {
    fetchData();
  }, []);

  const listing = props.data;
  const index = props.indexNum ? props.indexNum : undefined;
  const [id, setId] = useState(listing.id);
  const [icon, setIcon] = useState(listing.imgSrc);
  const [title, setTitle] = useState(listing.name);
  const [description, setDescription] = useState(listing.description);
  const [price, setPrice] = useState(listing.price);
  const [cat, setCat] = useState(listing.categoryId);
  const [itemSchema, setItemSchema] = useState();

  // Fetch Data
  const fetchData = () => {
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
        setItemSchema(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE Item
  const deleteItem = async () => {
    axios
      .delete(`http://localhost:5000/Admin/Product/${listing.id}`, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      })
      .then(() => {
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Post Data
  const postData = async (body) => {
    axios
      .post("http://localhost:5000/Admin/Product/New", body, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      })
      .then((res) => {
        props.removeItem(index);
        const data = res.data;
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Put Data
  const putData = async (body) => {
    body["id"] = id;
    axios
      .put(`http://localhost:5000/Admin/Product/${id}`, body, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      })
      .then((res) => {
        const data = res.data;
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePizza = () => {
    if (title && cat && description && price && icon) {
      const body = {
        name: title,
        categoryId: cat,
        description: description,
        price: price,
        imgSrc: icon,
      };

      if (!id) {
        // Post Request
        postData(body);
      }
      if (id) {
        putData(body);
      }

      return;
    }
    console.log("Please fill in all information.");
  };

  // Remove Item
  const removeItem = () => {
    if (!listing.id) {
      props.removeItem(index);
      props.refresh();
      return;
    }
    deleteItem();

    return console.log("Removed Item");
  };

  const handleCategoryChange = (e) => {
    setCat(e.target.value);
  };

  return (
    <div className="editItemContainer">
      <div className="editPizzaLogoContainer">
        <img
          src={icon || img_placeholder}
          className="editPageItemIcon"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = img_placeholder;
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Logo SRC"
          multiline
          rows={2}
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value);
          }}
        />
      </div>
      <div className="itemDesContainer">
        <div className="pizzaTitleContainer">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: 700 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Title"
              id="outlined-size-small"
              size="small"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Box>
        </div>
        <div className="pizzaDesContainer">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: 780 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </div>
      </div>
      <div className="priceButtonContainer">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            label="Cat"
            onChange={handleCategoryChange}
          >
            {itemSchema &&
              Object.keys(itemSchema).map((key, index) => (
                <MenuItem value={key} key={index}>
                  {itemSchema[key]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        {/* Reset Button */}
        <div className="saveDelContainer">
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={!listing.id && index == undefined}
            onClick={() => removeItem()}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => savePizza()}
            disabled={!title || !cat || !description || !price || !icon}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
