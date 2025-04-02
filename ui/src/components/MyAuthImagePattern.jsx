function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden items-center justify-center bg-blue-50 p-12 lg:flex">
      <div className="max-w-md text-center">
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, idx) => (
            <div
              key={idx + 1}
              className={`aspect-square rounded-2xl bg-blue-200 ${idx % 2 === 0 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <p className="text-neutral-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
