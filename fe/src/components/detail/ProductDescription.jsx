import { useEffect, useState } from "react";
import Image from "../../assets/image.png";
import { useParams } from "react-router-dom";
import { getDesc } from "../../apis/DetailApi";

export default function ProductDescription() {
  const params = useParams();
  const [desc, setDesc] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stockCode = params.productId;
    const getDescs = async () => {
      try {
        const response = await getDesc(stockCode);
        // console.log(response.data);
        setDesc(response.data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };

    getDescs();
  }, []);

  return (
    <div className="h-[calc(100vh_-_264px)] flex flex-col px-[1.5rem] pt-[1rem] gap-4 bg-white-1">
      <img
        src={desc.image}
        className="min-h-[13rem] max-h-[14rem] rounded-xl bg-cover"
      />
      <span className="pb-[2rem]">{desc.content}</span>
    </div>
  );
}
