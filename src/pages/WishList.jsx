import "../styles/List.scss";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ChaletCard from "../components/ChaletCard";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <NavBar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {/* wishList is array of chalets added to wish list */}
        {wishList?.map(
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
              chaletIdId={_id}
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

export default WishList;
