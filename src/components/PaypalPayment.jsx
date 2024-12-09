import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

const PaypalPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state; // Access the state object passed via navigate

  // const customerId = useSelector((state) => state?.user?._id);

  const handlePayNow = async () => {
    console.log("Pay Now clicked");
    // Add logic for handling payment
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
      const redirectUrl = await response.json();
      console.log(redirectUrl);
      // navigate(`/bookings/${customerId}/trips`);
      // navigate(redirectUrl);
      window.location.href = redirectUrl.approvalUrl; // Redirect to PayPal
    }
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Add logic for canceling payment or navigating back
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-xl w-full border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Payment
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Complete your booking and enjoy your stay!
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800">
            Booking Details:
          </h2>
          <p className="text-gray-600 mt-2">
            <strong>Chalet Title:</strong> {bookingData?.chaletTitle}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Description:</strong> {bookingData?.chaletDescription}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Total Price:</strong> ${bookingData?.totalPrice}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Start Date:</strong> {bookingData?.startDate}
          </p>
          <p className="text-gray-600 mt-1">
            <strong>End Date:</strong> {bookingData?.endDate}
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-medium text-gray-800">Choose a Plan</h2>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center py-3 px-4 border rounded-lg bg-gray-100 shadow">
              <p className="text-gray-700">
                <strong>Free:</strong> Limited features
              </p>
              <span className="text-sm text-gray-500">0.00 USD</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 border rounded-lg bg-blue-50 shadow">
              <p className="text-gray-700">
                <strong>Pro:</strong> Access all features
              </p>
              <span className="text-sm text-gray-800 font-medium">
                50.00 USD
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePayNow}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Pay Now
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaypalPayment;
