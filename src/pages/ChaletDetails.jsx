import { useNavigate, useParams } from "react-router-dom";
import "../styles/ChaletDetails.scss";
import { useEffect, useState } from "react";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const ChaletDetails = () => {
  const [loading, setLoading] = useState(true);

  const { chaletId } = useParams();
  const [chalet, setChalet] = useState(null);

  const getChaletDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chalets/${chaletId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setChalet(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Chalet details faild!", err.message);
    }
  };

  useEffect(() => {
    getChaletDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to handle the select in calendar
  // Booking in calendar logic
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelectCalendar = (ranges) => {
    // update the selected date range when user make a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // calc difference in days

  // Submit Customer Booking
  const customerId = useSelector((state) => state?.user?._id);

  const navigate = useNavigate();

  // const handleSubmitBooking = async () => {
  //   try {
  //     const bookingForm = {
  //       customerId,
  //       chaletId,
  //       hostId: chalet.creator._id,
  //       startDate: dateRange[0].startDate.toDateString(),
  //       endDate: dateRange[0].endDate.toDateString(),
  //       totalPrice: chalet.price * dayCount,
  //     };

  //     const response = await fetch("http://localhost:5000/bookings/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingForm),
  //     });

  //     if (response.ok) {
  //       navigate(`/bookings/${customerId}/trips`);
  //     }
  //   } catch (err) {
  //     console.log("Submit Booking Failed.", err.message);
  //   }
  // };

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <div className="listing-details">
        <div className="title">
          <h1>{chalet.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {chalet.chaletPhotoPaths?.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${photo.split("/").pop()}`}
              alt="chalet photo"
            />
          ))}
        </div>

        <h2>
          {chalet.type} in {chalet.city}, {chalet.province}, {chalet.country}
        </h2>
        <p>
          {chalet.guestCount} guests - {chalet.bedroomCount} bedrooms(s) -{" "}
          {chalet.bedCount} bed(s) - {chalet.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:5000/uploads/${chalet.creator.profileImagePath
              .split("/")
              .pop()}`}
            alt="profile image"
          />
          <h3>
            Hosted by {chalet.creator.firstName} {chalet.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{chalet.description}</p>
        <hr />

        <h3>{chalet.highlight}</h3>
        <p>{chalet.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {chalet.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelectCalendar} />
              {dayCount > 1 ? (
                <h2>
                  ${chalet.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${chalet.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ${chalet.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button
                type="submit"
                className="button"
                onClick={() => {
                  navigate("/payments", {
                    state: {
                      chaletId,
                      customerId,
                      hostId: chalet.creator._id,
                      startDate: dateRange[0].startDate.toDateString(),
                      endDate: dateRange[0].endDate.toDateString(),
                      totalPrice: chalet.price * dayCount,
                      chaletTitle: chalet.title, // Add chalet title
                      chaletDescription: chalet.description, // Add chalet description
                    },
                  });
                }}
              >
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChaletDetails;
