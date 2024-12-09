import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/UserProfile.scss";
import EditIcon from "../components/EditButton";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { setUser } from "../redux/state";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    confirmPassword: user.password,
    userType: user.userType,
    profileImage: user.profileImage,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // For profileImage, we need to handle file input separately
    if (name === "profileImage") {
      setFormData({
        ...formData,
        [name]: files[0], // Only update profileImage with the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // For other fields, just update with the value
      });
    }
  };

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
    setIsVisible(true);
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword, user]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsEditable(false);
    setIsVisible(false);
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

      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: userProfileData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(setUser({ user: updatedUser }));
        await persistor.flush();
        navigate(`/users/${user._id}`);
        // window.location.reload();
      }
    } catch (err) {
      console.error(`Update Failed: ${err.message}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(`${user._id}`);
    try {
      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        navigate("/users/register");
      }
    } catch (err) {
      console.error(`Deletion Failed: ${err.message}`);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <NavBar />
      <div className="page_">
        <div className="top_page">
          <button className="edit_button" onClick={handleEditClick}>
            <EditIcon />
          </button>
          <img
            src={`http://localhost:5000/uploads/${user.profileImagePath
              .split("/")
              .pop()}`}
            className="profile_picture"
          />
          <p className="par">Welcome to your account!</p>
        </div>
        <div className="register">
          <div className="register_content">
            <form className="register_content_form" onSubmit={handleSubmit}>
              <div className="one">
                <label className="labels">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>

              <div className="one">
                <label className="labels">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>

              <div className="one">
                <label className="labels">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div className="one">
                <label className="labels">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              {isVisible && (
                <div className="one">
                  <label htmlFor="confirm" className="labels">
                    Confirm
                  </label>
                  <input
                    id="confirm"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                </div>
              )}

              <input
                style={{ textAlign: "center", borderBottom: "0px" }}
                name="userType"
                required
                value={formData.userType}
                readOnly
              />

              {!passwordMatch && (
                <p style={{ color: "red" }}>Passwords are not matched</p>
              )}
              {isVisible && (
                <div>
                  <input
                    id="image"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    className="hidden"
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center cursor-pointer gap-2 text-white text-sm"
                  >
                    <img
                      src="/src/assets/upload_file.png"
                      alt="add profile image"
                    />
                    <p>Upload Your Profile Photo</p>
                  </label>

                  {formData.profileImage && (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="profile image"
                      style={{ maxWidth: "80px" }}
                    />
                  )}

                  <button
                    className="save_button"
                    type="submit"
                    disabled={!passwordMatch}
                  >
                    Save Changes
                  </button>
                  <button className="save_button" onClick={handleCancel}>
                    Cancel Changes
                  </button>
                </div>
              )}
            </form>
          </div>
          <button className="delete_button" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
