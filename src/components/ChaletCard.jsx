import { useState } from "react";
import "../styles/ChaletCard.scss";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

const ChaletCard = ({
  chaletId,
  creator,
  chaletPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
}) => {
  // Slider for images
  const [currentIndex, setCurrentIndex] = useState(0);

  // formulas to go to the prev slide and to go to the next slide
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + chaletPhotoPaths.length) % chaletPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chaletPhotoPaths.length);
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {chaletPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img
                src={`http://localhost:5000/uploads/${photo.split("/").pop()}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>
      <p>{type}</p>
      <p>
        <span>${price}</span> per night
      </p>
    </div>
  );
};

export default ChaletCard;
