import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (let key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error(`Registration Faild: ${err.message}`);
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center flex-col bg-cover bg-center"
      style={{ backgroundImage: 'url("./src/assets/register.jpg")' }}
    >
      <div className="flex flex-col gap-4 w-2/5 p-10 bg-black bg-opacity-80 rounded-xl sm:w-4/5 md:w-3/5 lg:w-2/5">
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 bg-transparent border-b border-white/30 text-white text-center outline-none placeholder-white focus:bg-transparent"
            placeholder="User Type"
            name="userType"
            required
            value={formData.userType}
            onChange={handleChange}
          />

          {/* Conditional rendering to see if they are matched or not */}
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          <label
            htmlFor="image"
            className="flex flex-col items-center cursor-pointer gap-2 text-white text-sm"
          >
            <img
              src="./src/assets/uploadPhoto.png"
              alt="add profile image"
              className="w-6"
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
            type="submit"
            disabled={!passwordMatch}
            className="mt-4 py-3 px-6 bg-red-400 text-white font-semibold text-lg rounded-lg w-1/2 transition ease-in-out duration-300 hover:shadow-lg"
          >
            REGISTER
          </button>
        </form>
        <a
          href="/login"
          className="text-white text-xs mt-4 text-center hover:underline"
        >
          Already have an account? Log In here
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
