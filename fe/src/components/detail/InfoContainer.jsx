export default function InfoContainer({
  name,
  description,
  close,
  currencySymbol,
  chg,
}) {
  if (currencySymbol === "원") {
    close = close.toLocaleString();
  }
  console.log(chg);
  return (
    <div className="px-[1.5rem] py-[0.1rem] bg-white-1 text-black">
      <div className="flex flex-col">
        <span className="text-[1.3rem]">{name}</span>
        <span className="text-[0.95rem]">{description}</span>
      </div>
      <div className="flex justify-between pt-4 pb-2">
        <span className="text-[1.6rem] font-bold">
          {close}
          {currencySymbol}
        </span>
        {chg.substr(0, 1) === "-" ? (
          <span className="text-[1.6rem] text-blue-1">{chg}</span>
        ) : chg.substr(0, 1) === "0" ? (
          <span className="text-[1.6rem]">{chg}</span>
        ) : (
          <span className="text-[1.6rem] text-red-1">{chg}</span>
        )}
      </div>
    </div>
  );
}
