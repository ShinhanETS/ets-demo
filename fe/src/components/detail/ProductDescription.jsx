import Image from "../../assets/image.png";

export default function ProductDescription() {
  return (
    <div className="h-[calc(100vh_-_244px)] flex flex-col px-[1.5rem] py-[1rem] gap-4 bg-white-1 text-[#4E4E4E]">
      <img src={Image} className="min-h-[13rem] max-h-[14rem] rounded-xl bg-cover" />
      <span>설명 어쩌구...</span>
    </div>
  );
}
