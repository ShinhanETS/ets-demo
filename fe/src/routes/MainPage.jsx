import { useState } from 'react';
import MainBanner from '../assets/MainBanner.svg'
import MainButton from '../components/main/MainButton';

export default function MainPage() {
    const [selectedTap, setSelectedTap] = useState(0);
    const [selectedButton, setSelectedButton] = useState(0);
    const handleButtonClick = (number) => {
      setSelectedButton(number)
    }
    const handleTapClick = (index) => {
      setSelectedTap(index);
  };
    return (
      <div className="flex flex-col h-screen bg-white relative select-none">
        <div className="min-h-[20vh] bg-gradient-to-b from-[#0937BC] to-[#2D09BC] flex">
          <div className="mt-[4vh] ml-[6vw] flex text-2xl font-semibold items-start">
              {['국내', '해외', 'MY거래'].map((text, index) => (
                  <div
                      key={index}
                      className={`mx-2.5 my-2 cursor-pointer ${
                          selectedTap === index 
                              ? 'text-white text-white-1 border-b-[0.2rem]' 
                              : 'text-[#FFFFFF] opacity-60'
                      }`}
                      onClick={() => handleTapClick(index)}
                  >
                      {text}
                  </div>
              ))}
          </div>
          <div className="h-[16vh] mx-[4.5vw] bg-white-1 rounded-2xl p-4 absolute mt-[12vh] drop-shadow-md flex">
            <div className="w-[60%] flex flex-col gap-1 justify-center">
              <h2 className="text-md font-black font-bold">OOO님, 탄소배출권을 <br /> 거래해보세요!</h2>
              <p className="text-xs">
                탄소배출권을 거래함으로써 사용자가 얻을 수 있는 기대효과를 염두에 두고 사용해보세요!
              </p>
            </div>
            <div className='w-[40vw] flex justify-center items-center' >
              <img src={MainBanner} alt="" className="" />
            </div>
          </div>
        </div>
  
        {/* 내용 영역 */}
        <div className="p-5 flex-1">
  
          {/* 거래 권 섹션 */}
          <div className="flex gap-2 mt-[8vh]">
            <MainButton
              selected={selectedButton === 0}
              onClick={() => handleButtonClick(0)}
              text="거래권"
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
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center gap-[2vw] p-2 bg-white rounded-lg active:bg-grey-2 transition duration-200 cursor-pointer">
                <div className='flex gap-4'>
                  <img src="https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png" alt="" className='rounded-full w-12' />
                  <div className='flex flex-col gap-1 justify-between'>
                    <h3 className="font-semibold">STHP</h3>
                    <p className="text-[#666666] font-medium text-sm">(스텀 타타이 수력 발전 프로젝트)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-1 text-lg font-semibold">2.6%</p>
                  <p className='font-medium text-black-1'>8,400원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  