import { useEffect } from "react";
import { useSelector } from "react-redux";

const CompletePayment = () => {
  const bookingData = useSelector((state) => state.bookingData);

  const handleSubmitBooking = async () => {
    try {
      const bookingForm = {
        customerId: bookingData.customerId,
        chaletId: bookingData.chaletId,
        hostId: bookingData.hostId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice: bookingData.totalPrice,
      };

      const response = await fetch("http://localhost:5000/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        window.location.href = `http://localhost:5173/bookings/${bookingData.customerId}/trips`;
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  const verifyPayment = async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      // const paymentId = searchParams.get("paymentId");
      const token = searchParams.get("token");
      const payerId = searchParams.get("PayerID");

      if (!token || !payerId) {
        throw new Error("Missing required payment parameters.");
      }

      const response = await fetch("http://localhost:5000/payments/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok) {
        await handleSubmitBooking();
      } else {
        alert(`Payment verification failed: ${result.message}`);
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      alert("Failed to verify payment.");
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-green-500 mb-4">
          Payment Successful
        </h1>
        <p className="text-center text-lg text-gray-700 mb-6">
          We are verifying your payment. Please wait...
        </p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default CompletePayment;
