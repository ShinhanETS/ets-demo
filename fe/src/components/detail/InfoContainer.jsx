export default function InfoContainer({ name, subname, price, rate, updown }) {
  return (
    <div className="px-[1.5rem] py-[0.1rem] bg-white-1 text-black">
      <div className="flex flex-col">
        <span className="text-[1.2rem]">KAU23</span>
        <span className="text-[0.9rem]">(스텅 타타이 수력 발전 프로젝트)</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-end gap-1">
          <span className="text-[1.6rem] font-bold">9,150원</span>
          <span className="text-[0.9rem]">TON/KRW</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[1.1rem]">0.00%</span>
          <span className="text-[1.1rem]">(-1,000)</span>
        </div>
      </div>
    </div>
  );
}
