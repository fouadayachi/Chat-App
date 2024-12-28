const AuthImagePattern = ({ title, subTitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="text-center max-w-md">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, index) => (
            <div
              className={`aspect-square rounded-2xl bg-primary/10 ${
                index % 2 === 0 && "animate-pulse"
              }`}
              key={index}
            ></div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subTitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
