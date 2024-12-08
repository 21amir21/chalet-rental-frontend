import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

const PaypalPayment = () => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
  };

  const styles = {
    shape: "rect",
    layout: "vertical",
  };

  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state; // Retrieve booking data

  const onCreateOrder = async (data, actions) => {
    try {
      const response = await fetch("http://localhost:5000/payments/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chaletTitle: bookingData.chaletTitle,
          chaletDesc: bookingData.chaletDescription,
          totalPrice: bookingData.totalPrice,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const orderId = result.orderId; // Get the orderId from the response
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: bookingData.totalPrice.toString(),
                },
              },
            ],
          })
          .then((orderData) => {
            return orderData.id; // Return the PayPal order ID
          });
      } else {
        throw new Error("Failed to create order on the backend");
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  const handleSubmitBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log("Booking successfully added!");
        navigate(`/bookings/${bookingData.customerId}/trips`);
      }
    } catch (err) {
      console.error("Submit Booking Failed.", err.message);
    }
  };

  // hanshof
  const onApprove = async () => {
    console.log("Payment approved. Completing booking...");
    await handleSubmitBooking();
  };

  const onError = (error) => {
    console.error("PayPal Error", error);
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Select Your Plan
        </h2>
        <div className="mb-6">
          <div className="flex justify-between items-center py-3 px-4 border rounded-md mb-2">
            <p className="text-gray-700">
              <strong>Free:</strong> Limited features
            </p>
            <span className="text-sm text-gray-500">0.00 USD</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 border rounded-md bg-gray-50">
            <p className="text-gray-700">
              <strong>Pro:</strong> Access all features
            </p>
            <span className="text-sm text-gray-800 font-medium">50.00 USD</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={styles}
              createOrder={onCreateOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default PaypalPayment;
