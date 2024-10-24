const Card = ({ children }) => {
  return (
    <div className="flex col-auto p-4 border border-grey-200 rounded-lg shadow-md mb-4">
      {children}
    </div>
  );
};

export default Card;
