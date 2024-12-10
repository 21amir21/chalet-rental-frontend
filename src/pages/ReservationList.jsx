import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ChaletCard from "../components/ChaletCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/bookings/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  const handleDeleteReservation = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the booking");
      }

      // Remove the chalet from the reservationList
      const updatedReservationList = reservationList.filter(
        (chalet) => chalet._id !== bookingId
      );
      dispatch(setReservationList(updatedReservationList));
    } catch (err) {
      console.log("Delete booking failed", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(
          ({
            _id,
            chaletId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ChaletCard
              key={chaletId._id}
              chaletId={chaletId._id}
              creator={hostId._id}
              chaletPhotoPaths={chaletId.chaletPhotoPaths}
              city={chaletId.city}
              province={chaletId.province}
              country={chaletId.country}
              category={chaletId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
              onDelete={() => handleDeleteReservation(_id)}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
