const Input = ({ placeHolder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
