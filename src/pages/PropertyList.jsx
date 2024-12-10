// import "../styles/List.scss";
// import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../components/NavBar";
// import ChaletCard from "../components/ChaletCard";
// import { useEffect, useState } from "react";
// import { setPropertyList } from "../redux/state";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";

// const PropertyList = () => {
//   const [loading, setLoading] = useState(true);
//   const user = useSelector((state) => state.user);
//   const propertyList = user?.propertyList;

//   const dispatch = useDispatch();
//   const getPropertyList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/bookings/${user._id}/properties`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();

//       dispatch(setPropertyList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch all properties failed", err.message);
//     }
//   };

//   useEffect(() => {
//     getPropertyList();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <NavBar />
//       <h1 className="title-list">Your Property List</h1>
//       <div className="list">
//         {propertyList?.map(
//           ({
//             _id,
//             creator,
//             chaletPhotoPaths,
//             city,
//             province,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ChaletCard
//               key={_id}
//               chaletId={_id}
//               creator={creator}
//               chaletPhotoPaths={chaletPhotoPaths}
//               city={city}
//               province={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default PropertyList;

import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ChaletCard from "../components/ChaletCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/bookings/${user._id}/properties`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  const handleDeleteProperty = async (chaletId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/chalets/${chaletId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the property");
      }

      // Remove the chalet from the propertyList
      const updatedPropertyList = propertyList.filter(
        (chalet) => chalet._id !== chaletId
      );
      dispatch(setPropertyList(updatedPropertyList));
    } catch (err) {
      console.log("Delete property failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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
              onDelete={() => handleDeleteProperty(_id)} // Pass delete handler
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
