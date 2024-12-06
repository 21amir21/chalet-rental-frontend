import { useState, useEffect } from "react";
import "../styles/List.scss";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setChalets } from "../redux/state";
import Loader from "../components/Loader";
import ChaletCard from "../components/ChaletCard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const chalets = useSelector((state) => state.chalets);

  const getFeedChalets = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chalets?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setChalets({ chalets: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch chalets Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedChalets();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">{category} Chalets</h1>
      <div className="list">
        {chalets?.map(
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
      <Footer />
    </>
  );
};

export default CategoryPage;
