import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  // Sample initial cart state (replace with your data/API)
  const [cartItems, setCartItems] = useState([
    {
      image: shirt,
      title: "T-shirt with multiple colors",
      Typography: "Size: Medium , color: blue, Material fabrica",
      price: "$29.99",
      seller: "Artel market",
    },
    {
      image: bag,
      title: "Jeans Bag for Collge/ university",
      Typography: "Size: 36`*16` , color: blue, Material: jeans",
      price: "$16.99",
      seller: "Artel market",
    },
    {
      image: bluelamp,
      title: "Lamp for showcasing and night light",
      Typography: "Size: small, color: Every color",
      price: "$19.00",
      seller: "Artel market",
    },
  ]);

  // Update quantity (+/-)
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Prevent quantity < 1
          : item
      )
    );
  };

  // Remove item
  const removeItem = (itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.1; // 10% tax example
  const shipping = subtotal > 100 ? 0 : 5; // Free shipping over $100
  const total = subtotal + taxes + shipping;

  // Validate cart before checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Proceed to checkout logic
  };

  return (
    <Grid container spacing={3}>
      {/* Cart Items */}
      <Grid item xs={12} md={8}>
        {cartItems.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                {/* Product Image */}
                <Grid item xs={3}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", borderRadius: "4px" }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={6}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Grid>

                {/* Quantity Controls */}
                <Grid item xs={3}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography mx={1}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => removeItem(item.id)}
                    color="error"
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {/* Order Summary */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Grid container>
              <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
                <Typography>Taxes:</Typography>
                <Typography>Shipping:</Typography>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography>${subtotal.toFixed(2)}</Typography>
                <Typography>${taxes.toFixed(2)}</Typography>
                <Typography>${shipping.toFixed(2)}</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
