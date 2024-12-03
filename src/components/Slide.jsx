const Slide = () => {
  return (
    <div
      className="w-screen h-[80vh] bg-cover bg-center bg-gradient-to-t from-black/50 to-black/50"
      style={{
        backgroundImage: "url('src/assets/slide.jpg')",
      }}
    >
      <h1 className="p-10 text-4xl text-center text-white">
        Welcome Home! Anywhere you roam <br /> Stay in the moment. Make your
        memories
      </h1>
    </div>
  );
};

export default Slide;
