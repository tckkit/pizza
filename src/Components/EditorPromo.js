import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

// MUI
import Button from "@mui/material/Button";

export default function EditorPromo(props) {
  const expired = props.status;
  const listing = props.data;
  const index = props.indexNum ? props.indexNum : undefined;
  const [id, setId] = useState(listing.id); // id
  const [quota, setQuota] = useState(listing.countLimit); // countLimit
  const [code, setCode] = useState(listing.code); // code
  const [description, setDescription] = useState(listing.description); //description
  const [directDeduction, setDirectDeduction] = useState(
    listing.directDeduction
  ); // directDeduction
  const [percentageDiscount, setPercentageDiscount] = useState(
    listing.percentageDiscount
  ); // percentageDiscount

  // DELETE Item
  const deleteItem = async () => {
    axios
      .delete(`http://localhost:5000/Admin/Promo/${listing.id}`, {
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
      .post("http://localhost:5000/Admin/Promo", body, {
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
      .put(`http://localhost:5000/Admin/Promo/${id}`, body, {
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
    if (
      quota &&
      code &&
      description &&
      (directDeduction || percentageDiscount)
    ) {
      const body = {
        countLimit: Number(quota),
        code: code,
        description: description,
        directDeduction: Number(directDeduction),
        percentageDiscount: Number(percentageDiscount),
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

  return (
    <div className="editItemContainer">
      <div className="editPizzaLogoContainer">
        <TextField
          id="outlined-multiline-static"
          label="Quota"
          multiline
          rows={2}
          value={quota}
          disabled={expired}
          onChange={(e) => {
            setQuota(e.target.value);
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
              label="Promo Code"
              id="outlined-size-small"
              size="small"
              value={code}
              disabled={expired}
              onChange={(e) => {
                setCode(e.target.value);
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
              disabled={expired}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </div>
      </div>
      <div className="priceButtonContainer">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment">% Discount</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
            value={percentageDiscount}
            disabled={expired}
            onChange={(e) => setPercentageDiscount(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            $ Discount
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={directDeduction}
            disabled={expired}
            onChange={(e) => setDirectDeduction(e.target.value)}
          />
        </FormControl>
        {/* Reset Button */}
        <div className="saveDelContainer">
          {!expired && (
            <>
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
                disabled={
                  !quota ||
                  !code ||
                  !description ||
                  (!directDeduction && !percentageDiscount)
                }
              >
                Save
              </Button>
            </>
          )}

          {expired && (
            <>
              <Button
                variant="contained"
                color="error"
                size="small"
                disabled={true}
              >
                Expired
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
