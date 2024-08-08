import { useState, useEffect, useContext } from "react";
import { useRecoilState, useSetRecoilState } from "recoil"; // Recoil state 설정을 위한 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 import
import { bottomState, productState } from "../recoil/state"; // productState import
import MainBanner from "../assets/MainBanner.svg";
import Korea from "../assets/Korea.webp";
import USA from "../assets/USA.png";
import Europe from "../assets/Europe.png";
import China from "../assets/China.png";
import MainButton from "../components/main/MainButton";
import MainModal from "../components/main/MainModal";
import { fetchProductList } from "../apis/EtsApi";
import { UserContext } from "../components/common/Layout";

export const tabNumberToURL = {
  0: "CERs",
  1: "ETF",
  2: "ETN",
  3: "FUTURE",
};

export default function MainPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [productList, setProductList] = useState([]);
  const { username } = useContext(UserContext);
  const [isBottom, setIsBottom] = useRecoilState(bottomState);

  const setProduct = useSetRecoilState(productState); // Recoil state 설정을 위한 함수
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  useEffect(() => {
    setIsBottom(true);
  }, []);

  const handleButtonClick = (number) => {
    setSelectedButton(number);
  };

  const handleTapClick = (index) => {
    setSelectedTab(index);
  };

  // 모달 오픈 여부 확인
  useEffect(() => {
    const modalStatus = localStorage.getItem("modalOpen");
    if (modalStatus === "false") {
      setShowModal(false);
    }
  }, []);

  // 국가나 상품 변경될 때마다 종목들 새로고침
  useEffect(() => {
    if (selectedTab !== 2) {
      const fetchProducts = async () => {
        const response = await fetchProductList(
          selectedTab,
          tabNumberToURL[selectedButton]
        );
        if (response.success) {
          setProductList(response.data);
        }
        console.log(response.data);
      };
      fetchProducts();
    }
  }, [selectedTab, selectedButton]);

  // Product 클릭 시 상세 페이지로 이동
  const handleProductClick = (product) => {
    setProduct(product); // 클릭한 product를 Recoil state에 설정
    navigate(`/detail/${product.name}`); // 상세 페이지로 이동
  };

  return (
    <div className="flex flex-col h-screen bg-white relative select-none">
      <div className="min-h-[20vh] bg-gradient-to-b from-[#0937BC] to-[#2D09BC] flex">
        <div className="mt-[4vh] ml-[6vw] flex text-2xl font-semibold items-start">
          {["국내", "해외", "MY거래"].map((text, index) => (
            <div
              key={index}
              className={`mx-2.5 my-2 cursor-pointer ${
                selectedTab === index
                  ? "text-white text-white-1 border-b-[0.2rem]"
                  : "text-[#FFFFFF] opacity-60"
              }`}
              onClick={() => handleTapClick(index)}
            >
              {text}
            </div>
          ))}
        </div>
        {selectedTab !== 2 ? (
          <div className="w-[91vw] h-[16vh] mx-[4.5vw] bg-white-1 rounded-2xl p-4 absolute mt-[12vh] drop-shadow-md flex">
            <div className="w-[60%] flex flex-col gap-1 justify-center">
              <h2 className="text-md font-black font-bold">
                {username}님, 탄소배출권을 <br /> 거래해보세요!
              </h2>
              <p className="text-xs">
                탄소배출권을 거래함으로써 사용자가 얻을 수 있는 기대효과를
                염두에 두고 사용해보세요!
              </p>
            </div>
            <div className="w-[40vw] flex justify-end items-center">
              <img src={MainBanner} alt="" className="" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-start p-6 gap-2 w-[91vw] h-[16vh] mx-[4.5vw] bg-white-1 rounded-2xl absolute mt-[12vh] drop-shadow-md">
            <div className="font-medium text-sm">
              현재 {username}님의 예수금
            </div>
            <div className="flex w-full gap-1 justify-around">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={Korea} alt="" className="w-5 h-5" />
                  <div>KRW</div>
                </div>
                <div className="font-bold w-full break-words">130,400</div>
              </div>
              <div className="max-w-[2px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0 font-medium">
                  <img src={USA} alt="" className="w-6 h-6" />
                  <div>USD</div>
                </div>
                <div className="font-bold">142.13</div>
              </div>
              <div className="max-w-[3px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={Europe} alt="" className="w-5 h-5" />
                  <div>EUR</div>
                </div>
                <div className="font-bold">14.53</div>
              </div>
              <div className="max-w-[3px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={China} alt="" className="w-5 h-5" />
                  <div>CNY</div>
                </div>
                <div className="font-bold">654.5</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 내용 영역 */}
      <div className="p-5 flex-1">
        {/* 거래 권 섹션 */}
        <div className="flex gap-2 mt-[8vh]">
          <MainButton
            selected={selectedButton === 0}
            onClick={() => handleButtonClick(0)}
            text="배출권"
          />
          <MainButton
            selected={selectedButton === 1}
            onClick={() => handleButtonClick(1)}
            text="ETF"
          />
          <MainButton
            selected={selectedButton === 2}
            onClick={() => handleButtonClick(2)}
            text="ETN"
          />
          <MainButton
            selected={selectedButton === 3}
            onClick={() => handleButtonClick(3)}
            text="선물"
          />
        </div>

        {/* 리스트 항목 */}
        <div className="space-y-2 mt-[3vh] overflow-y-auto h-[60vh]">
          {productList?.map((product, index) => {
            // product.chg 값에서 '%' 제거 및 float로 변환
            const chgValue = parseFloat(product.chg?.replace("%", ""));
            let chgClass = "";
            console.log(chgValue);

            // 클래스 결정 로직
            if (chgValue === 0.0) {
              chgClass = "text-black-1";
            } else if (chgValue > 0) {
              chgClass = "text-red-1";
            } else if (chgValue < 0) {
              chgClass = "text-blue-1";
              product.chg = product.chg.substring(1); // '-' 제거
            }
            return (
              <div
                key={index}
                className="flex justify-between items-center gap-[2vw] p-2 bg-white rounded-lg active:bg-grey-2 transition duration-200 cursor-pointer"
                onClick={() => handleProductClick(product)} // 클릭 이벤트 추가
              >
                <div className="flex gap-4 items-center">
                  <img
                    src="https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png"
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                  <div className="flex flex-col gap-1 justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-[#666666] font-medium text-sm">
                      ({product.description})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${chgClass}`}>
                    {product.chg}
                  </p>
                  <p className="font-medium text-black-1 text-nowrap">
                    {product.close}
                    {product.currencySymbol}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
        {/* 모달 표시 */}
        {showModal && (
          <MainModal modalOpen={showModal} setModalOpen={setShowModal} />
        )}
      </div>
    </div>
  );
}
