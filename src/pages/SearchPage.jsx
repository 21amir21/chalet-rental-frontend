import { useParams } from "react-router-dom";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { setChalets } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import ChaletCard from "../components/ChaletCard";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const chalets = useSelector((state) => state.chalets);

  const dispatch = useDispatch();

  const getSearchChalets = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chalets/search/${search}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setChalets({ chalets: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search Chalet failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchChalets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">{search}</h1>
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

export default SearchPage;
