import { useDispatch } from "react-redux";
import { categories } from "../data";
import "../styles/Chalets.scss";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setChalets } from "../redux/state";
import ChaletCard from "./ChaletCard";

const Chalets = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const chalets = useSelector((state) => state.chalets);

  const getFeedChalets = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:5000/chalets?category=${selectedCategory}`
          : "http://localhost:5000/chalets/",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setChalets({ chalets: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Chalet Listing faild", err.message);
    }
  };

  useEffect(() => {
    getFeedChalets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {chalets.map(
            ({
              _id,
              creator,
              chaletPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ChaletCard
                key={_id}
                chaletId={_id}
                creator={creator}
                chaletPhotoPaths={chaletPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Chalets;
