import { useState, useEffect, useContext } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { bottomState, productState } from "../recoil/state";
import MainBanner from "../assets/MainBanner.svg";
import ComingSoon from "../assets/ComingSoon.gif";
import Please from "../assets/Please.gif";
import Korea from "../assets/Korea.webp";
import USA from "../assets/USA.png";
import Europe from "../assets/Europe.png";
import China from "../assets/China.png";
import MainButton from "../components/main/MainButton";
import MainModal from "../components/main/MainModal";
import { fetchProductList } from "../apis/EtsApi";
import { UserContext } from "../components/common/Layout";
import imageMapping from "../components/main/RenderImage";
import { fetchMyAccount, fetchMyProduct } from "../apis/AccountApi";

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
  const [myProductList, setMyProductList] = useState([]);
  const { username } = useContext(UserContext);
  const [isBottom, setIsBottom] = useRecoilState(bottomState);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(true);

  const setProduct = useSetRecoilState(productState); // Recoil state 설정을 위한 함수
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  useEffect(() => {
    setIsBottom(true);
  }, [setIsBottom]);

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
    const fetchProducts = async () => {
      setLoading(true); // 로딩 시작
      try {
        if (selectedTab !== 2) {
          const response = await fetchProductList(
            selectedTab,
            tabNumberToURL[selectedButton]
          );
          if (response.success) {
            const processedData = response.data.map((product) => {
              const chgValue = parseFloat(product.chg?.replace("%", ""));
              if (chgValue > 0) {
                product.chg = `+${product.chg}`;
              }
              return product;
            });
            setProductList(processedData);
          }
        } else {
          const [accountResponse, myProductsResponse] = await Promise.all([
            fetchMyAccount(),
            fetchMyProduct(selectedButton),
          ]);
          setAccount(accountResponse.data);
          const processedData = myProductsResponse.data.map((product) => {
            const chgValue = parseFloat(product.chg?.replace("%", ""));
            if (chgValue > 0) {
              product.chg = `+${product.chg}`;
            }
            return product;
          });
          setMyProductList(processedData); // MY거래 탭에 대한 상태 업데이트
        }
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchProducts();
  }, [selectedTab, selectedButton]);

  // Product 클릭 시 상세 페이지로 이동
  const handleProductClick = (product) => {
    if (selectedTab === 2) {
      navigate(`/detail/${product.stock_code}`); // 상세 페이지로 이동
      setProduct(product.current_price); // 클릭한 product를 Recoil state에 설정
    } else {
      navigate(`/detail/${product.stockCode}`); // 상세 페이지로 이동
      setProduct(product); // 클릭한 product를 Recoil state에 설정
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white relative select-none">
      <div className="min-h-[20vh] bg-gradient-to-b from-[#0937BC] to-[#2D09BC] flex">
        <div className="mt-[4vh] ml-[6vw] flex text-xl font-semibold items-start">
          {["국내", "해외", "MY거래"].map((text, index) => (
            <div
              key={index}
              className={`mx-2.5 my-3 cursor-pointer ${
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
            <div className="flex w-full gap-1 justify-around text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={Korea} alt="" className="w-5 h-5" />
                  <div>KRW</div>
                </div>
                <div className="font-bold w-full break-words">
                  {account?.won?.toLocaleString()}
                </div>
              </div>
              <div className="max-w-[2px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0 font-medium">
                  <img src={USA} alt="" className="w-6 h-6" />
                  <div>USD</div>
                </div>
                <div className="font-bold">{account?.dollar?.toFixed(1)}</div>
              </div>
              <div className="max-w-[3px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={Europe} alt="" className="w-5 h-5" />
                  <div>EUR</div>
                </div>
                <div className="font-bold">{account?.euro?.toFixed(1)}</div>
              </div>
              <div className="max-w-[3px] w-[0.5%] h-full bg-[#c0c0c0]"></div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 font-medium">
                  <img src={China} alt="" className="w-5 h-5" />
                  <div>CNY</div>
                </div>
                <div className="font-bold">{account?.yuan?.toFixed(1)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1">
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

        <div className="space-y-2 mt-[3vh] overflow-y-auto h-[55vh] custom-scrollbar">
          {/* 로딩 중에는 아무것도 표시하지 않음 */}
          {!loading && (
            <>
              {selectedTab !== 2 && productList.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                  <img
                    src={ComingSoon}
                    alt="No Products"
                    className="w-32 h-32 mb-4"
                  />
                  <p className="text-lg font-semibold text-gray-500">
                    상품이 없어요
                  </p>
                </div>
              ) : selectedTab === 2 && myProductList.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                  <img
                    src={Please}
                    alt="No Products"
                    className="w-32 h-32 mb-4"
                  />
                  <p className="text-lg font-semibold text-gray-500">
                    상품이 없어요
                  </p>
                </div>
              ) : (
                (selectedTab !== 2 ? productList : myProductList)?.map(
                  (product, index) => {
                    const chgValue =
                      selectedTab === 2
                        ? parseFloat(
                            product?.current_price?.chg?.replace("%", "")
                          )
                        : parseFloat(product.chg?.replace("%", ""));
                    let chgClass = "";

                    if (chgValue === 0.0) {
                      chgClass = "text-black-1";
                    } else if (chgValue > 0) {
                      chgClass = "text-red-1";
                    } else if (chgValue < 0) {
                      chgClass = "text-blue-1";
                    }

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center gap-[2vw] p-2 bg-white rounded-lg active:bg-grey-2 transition duration-200 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={
                              imageMapping[
                                selectedTab === 2
                                  ? product?.current_price?.name
                                  : product?.name
                              ]
                            }
                            alt=""
                            className="rounded-full w-12 h-12"
                          />
                          <div className="flex flex-col gap-1 justify-between">
                            <h3 className="font-semibold">
                              {selectedTab === 2
                                ? product?.current_price?.name
                                : product?.name}
                            </h3>
                            <p className="text-[#666666] font-medium text-sm">
                              {selectedTab === 2
                                ? product?.current_price?.description
                                : product?.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-semibold ${chgClass}`}>
                            {selectedTab === 2
                              ? product?.current_price?.chg
                              : product?.chg}
                          </p>
                          <p className="text-[1rem] text-black-1 text-nowrap">
                            {selectedTab === 2
                              ? product?.current_price?.currency_symbol === "원"
                                ? product?.current_price?.close.toLocaleString() +
                                  product?.current_price?.currency_symbol
                                : product?.current_price?.close +
                                  product?.current_price?.currency_symbol
                              : product?.currencySymbol === "원"
                              ? product?.close.toLocaleString() +
                                product?.currencySymbol
                              : product?.close + product?.currencySymbol}
                              {selectedTab === 2 && 
                                <span className="font-semibold">
                                  {' '}
                                {product?.quantity}{'주'}
                              </span>
                              }

                          </p>
                        </div>
                      </div>
                    );
                  }
                )
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
        {showModal && (
          <MainModal modalOpen={showModal} setModalOpen={setShowModal} />
        )}
      </div>
    </div>
  );
}
