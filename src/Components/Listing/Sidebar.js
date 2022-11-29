import React from "react";
import { useState, useEffect } from "react";

// Material UI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// Shopping Cart functions
import { useShoppingCart } from "../../context/ShoppingCartContext";

// Stripe
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

//Success Modal
import Modal from "react-modal";
import success from "../../assets/images/success.png";

export default function Sidebar() {
  // Dummay Data
  const [listingsDummyData, setListingsDummyData] = useState();
  const [discountCodeData, setDiscountCodeData] = useState();

  // Discount code
  const [discountCode, setDiscountCode] = useState(null);

  // Cart functions and variables
  const { cartItems, removeFromCart, setCartItems } = useShoppingCart();
  const resetCart = () => {
    setCartItems([]);
    setDiscount(0);
    setDiscountCodeError(false);
    setDiscountCode(null);
  };

  const getDetails = (id, title) => {
    const array = listingsDummyData.filter((item) => item["id"] == id);
    return array[0][title];
  };

  let totalPrice = 0;
  const [discount, setDiscount] = useState(0);
  const [discountCodeError, setDiscountCodeError] = useState(false);

  const getTotalCost = (id, quantity) => {
    const price = getDetails(id, "price");
    const total = price * quantity;
    totalPrice = totalPrice + total;
    return total.toFixed(2);
  };

  const applyDiscount = (discountCodeApply) => {
    setDiscountCodeError(false);
    if (discountCodeApply == null || discountCodeApply == undefined) {
      setDiscountCodeError(false);
      setDiscount(0);
      return;
    }

    setDiscountCode(discountCodeApply);

    const filterDiscountCodeData = discountCodeData.filter(
      (discountCodeArr) =>
        discountCodeArr.code == String(discountCodeApply) &&
        discountCodeArr.countLimit > 0
    );

    let discountAmount = 0;
    if (filterDiscountCodeData.length > 0) {
      const percentage = filterDiscountCodeData[0].percentageDiscount;
      const amount = filterDiscountCodeData[0].directDeduction;

      if (amount !== 0) {
        discountAmount = amount;
      }
      if (percentage !== 0) {
        discountAmount = (totalPrice * percentage) / 100;
      }
    } else {
      setDiscountCodeError(true);
      return setDiscount(0);
    }
    let finalDiscountAmount = discountAmount.toFixed(2);
    if (finalDiscountAmount >= totalPrice) {
      finalDiscountAmount = totalPrice;
    }
    totalPrice = totalPrice - finalDiscountAmount;
    return setDiscount(finalDiscountAmount);
  };

  useEffect(() => {
    applyDiscount(discountCode);
  }, [cartItems]);

  useEffect(() => {
    fetchData();
    getAccountInfo();
  }, []);

  const [accountId, setAccountId] = useState(localStorage.getItem("accountId"));

  useEffect(() => {
    getAccountInfo();
  }, [accountId]);

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

    axios
      .get("http://localhost:5000/Menu/Promo")
      .then((res) => {
        const data = res.data;
        setDiscountCodeData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get account details (firstName, lastName)
  const getAccountInfo = async () => {
    if (accountId) {
      axios
        .get(`http://localhost:5000/Member/Pofile/${accountId}`)
        .then((res) => {
          const data = res.data;
          setFirstName(data.fristName);
          setLastName(data.lastName);
          setAccountEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Post Order
  const postOrder = async (body) => {
    axios
      .post("http://localhost:5000/Order", body)
      .then((res) => {
        const data = res.data;
        console.log(data, "response_from_post_order");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nullConverter = (item) => {
    if (item == "") return null;
    return item;
  };

  const placeOrder = () => {
    if (totalPrice) {
      const orderCart = cartItems;
      const postOrderCart = orderCart.map((item) => ({
        productId: item.id,
        qty: item.quantity,
      }));

      console.log(postOrderCart, "postOrderCart");

      const body = {
        items: nullConverter(postOrderCart),
        totalPrice: nullConverter(totalPrice),
        memberId: nullConverter(accountId), // or String Nullable
        promotionCode: nullConverter(discountCode), // or String Nullable
        address: nullConverter(address), // Nullable
        contactNumber: nullConverter(contactNumber), // Nullable
      };
      postOrder(body);
      return console.log(body, "requestBody");
    }
    console.log("Please fill in all information.");
  };

  //Stripe function//
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car",
  });

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

  // Order Summary
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: "12%",
      left: "25%",
      bottom: "90%",
      backgroundColor: "rgba(72, 72, 72, 0.75)",
    },
    content: {
      position: "absolute",
      top: "10%",
      bottom: "50%",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "10px",
      outline: "none",
      padding: "20px",
    },
  };

  // Contact Form
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [accountEmail, setAccountEmail] = useState();

  // Stripe setup
  async function handleToken(token, addresses) {
    placeOrder();
    setModalIsOpen(false);
    resetCart();
    setModal2IsOpen(true);
    setTimeout(() => {
      setModal2IsOpen(false);
    }, 5000);
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    if (status.status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="cartcart">
      <div className="cartContainer filter w-col w-col-3">
        {/* Title */}
        <div className="titleContainer">
          <h3 className="heading-5 filtering">My Shopping Cart</h3>
        </div>

        {/* Items */}
        <div className="itemsContainer">
          {listingsDummyData && cartItems && cartItems.length > 0 ? (
            cartItems.map((listing, i) => (
              <>
                <div className="itemContainer">
                  {/* Item title */}
                  <div className="cartItemsContainer">
                    <span>
                      <b>{getDetails(listing.id, "name")}</b>
                    </span>
                    <span className="quantity">x {listing.quantity}</span>
                  </div>

                  {/* price and delete button */}
                  <div className="priceDelContainer">
                    <span className="singlePrice">
                      {" "}
                      ${getTotalCost(listing.id, listing.quantity)}{" "}
                    </span>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon
                        fontSize="small"
                        onClick={() => removeFromCart(listing.id)}
                      />
                    </IconButton>
                  </div>
                </div>
              </>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* Discount */}
        {discount !== 0 && (
          <div className="discountContainer">
            <span className="totalDiscountTitle">Discount:</span>
            <span className="totalDiscount">$ ({discount})</span>
          </div>
        )}

        {/* Total Price */}
        <div className="priceContainer">
          <span className="totalPriceTitle">Total:</span>
          <span className="totalPrice">
            $ {(totalPrice - discount).toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <div className="buttonContainer">
          {/* Discount code section */}
          <div className="discountCodeContainer">
            <TextField
              error={discountCodeError}
              id="discountCode"
              label="Discount code"
              type="search"
              size="small"
              fullWidth
              inputProps={{ min: 0, style: { textAlign: "start" } }}
              value={discountCode}
              onBlur={() => {
                applyDiscount(discountCode);
              }}
              onChange={(e) => {
                setDiscountCode(e.target.value);
              }}
            />
          </div>
          {/* Pay and Reset Button */}
          <div className="payResetContainer">
            {/* Reset Button */}
            <div className="payContainer">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => resetCart()}
                >
                  Reset
                </Button>
              </Stack>
            </div>

            {/* Pay Button */}
            <div className="payContainer">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={totalPrice <= 0}
                  onClick={() => {
                    if (totalPrice > 0) {
                      setModalIsOpen(true);
                    }
                  }}
                >
                  Order
                </Button>
              </Stack>
            </div>
          </div>
          {/* Payment Success Modal */}
          <Modal
            isOpen={modal2IsOpen}
            style={modal2Style}
            className="modal2Style"
          >
            <div className="buttonImgContainer2">
              <img src={success} loading="lazy" width="30" height="30" />
              <div className="successName">
                <span>Order placed</span>
              </div>
            </div>
          </Modal>

          {/* Fill in Form Modal */}
          <Modal isOpen={modalIsOpen} style={modalStyle} className="modalStyle">
            {/* Order Summary Title */}
            <div className="orderSummaryContainer">
              <div className="summaryTitleContainer">
                <span>Your Contacts</span>
              </div>

              {/* Every ordered item */}
              <div className="orderedItemsContainer">
                <div className="textFieldContainer">
                  <TextField
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                    className="textField"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="textFieldContainer">
                  <TextField
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                    className="textField"
                    name="LastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="textFieldContainer">
                  <TextField
                    id="standard-basic"
                    label="Address"
                    variant="standard"
                    className="textField"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="textFieldContainer">
                  <TextField
                    id="standard-basic"
                    label="Contact Number"
                    variant="standard"
                    className="textField"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Discount and Total Price */}
              <div className="discountTotalContainer">
                <div className="discountApplyContainer">
                  <div className="subTotalAmount">
                    <h5>Sub-total Amount:</h5>
                    <h5>$ {totalPrice.toFixed(2)}</h5>
                  </div>
                  <div className="deductedAmount">
                    <h5>Discount deduction:</h5>
                    <h5>$ ({discount})</h5>
                  </div>
                  <div className="totalAmount">
                    <h5>Total:</h5>
                    <h5>$ {(totalPrice.toFixed(2) - discount).toFixed(2)}</h5>
                  </div>
                </div>
                <div className="makePaymentContainer">
                  {/* Reset Button */}
                  <div className="payContainer">
                    <Stack direction="row" spacing={2}>
                      <div>
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          onClick={() => setModalIsOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Stack>
                  </div>

                  {/* Pay Button */}
                  <div className="payContainer">
                    <Stack direction="row" spacing={2}>
                      {" "}
                      <StripeCheckout
                        stripeKey="pk_test_51KDoS7KMUKzKlen5mhcEHgX4tMjt1pTkiEbYx2xXMghzfKkLyOxsvkAfAJNJRLQq8y45Pf7MShkdlW9Jjo8d6qvD00KwfD4GUV"
                        token={handleToken}
                        amount={(totalPrice - discount) * 100}
                        name={"Pizza Hut Limited"}
                        email={accountEmail || "user@gmail.com"}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="large"
                          disabled={
                            !firstName ||
                            !lastName ||
                            !address ||
                            !contactNumber
                          }
                        >
                          Pay
                        </Button>
                      </StripeCheckout>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
