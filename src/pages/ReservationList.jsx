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

  useEffect(() => {
    getReservationList();
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
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
