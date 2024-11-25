const RegisterPage = () => {
  return (
    <div className="register">
      <div className="register_container">
        <form action="">
          <input placeholder="First Name" name="firstname" required />
          <input placeholder="Last Name" name="lastname" required />
          <input placeholder="Email" name="email" type="email" required />
          <input
            placeholder="Passowrd"
            name="passowrd"
            type="password"
            required
          />
          <input
            placeholder="Confirm Passowrd"
            name="confirmpassword"
            type="password"
            required
          />
          <input
            id="image"
            type="file"
            name="profileimage"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile image" />
            <p>Upload Your Profile Photo</p>
          </label>
          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
