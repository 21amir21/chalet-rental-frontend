import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import { useDispatch } from "react-redux";
import ChaletCard from "../components/ChaletCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/bookings/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(
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
              hostId={hostId}
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

export default TripList;
