import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/state";

const UserProfile = ({ user }) => {
  const userToken = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        profileImage: user.profileImage || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileData = new FormData();

      for (let key in formData) {
        if (key === "profileImage" && formData[key]) {
          userProfileData.append("profileImage", formData[key]);
        } else {
          userProfileData.append(key, formData[key]);
        }
      }

      const response = await fetch(
        `http://localhost:5000/users/${user.userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: userProfileData,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(setUser({ user: updatedUser }));
        // navigate(`/users/${user._id}`);
        // window.location.reload();
        // setFormData({
        //   firstName: updatedUser.firstName,
        //   lastName: updatedUser.lastName,
        //   email: updatedUser.email,
        //   password: updatedUser.password,
        //   confirmPassword: updatedUser.confirmPassword,
        //   userType: updatedUser.userType,
        //   profileImage: updatedUser.profileImage,
        // });
      }
    } catch (err) {
      console.error(`Update Failed: ${err.message}`);
    }

    console.log("Form submitted:", formData);
  };

  return (
    <>
      <NavBar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Profile Management
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Upload Photo:
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handlePhotoChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
