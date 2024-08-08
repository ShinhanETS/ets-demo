import { Sheet } from "react-modal-sheet";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import BottomSheetGradeEx from "../../assets/BottomSheetGradeEx.svg";
import Grade1 from "../../assets/Grade1.png";
import Socar from "../../assets/Socar.webp";
import Ddareungi from "../../assets/Ddareungi.webp";
import { useRecoilState, useRecoilValue } from "recoil";
import { bottomState } from "../../recoil/state";

const benefits = [
  { img: Socar, title: "쏘카", description: "전기차 충전 할인 20%" },
  { img: Ddareungi, title: "따릉이", description: "따릉이 1시간 일일권 무료" },
  { img: Socar, title: "쏘카", description: "전기차 충전 할인 20%" },
  { img: Ddareungi, title: "따릉이", description: "따릉이 1시간 일일권 무료" },
  { img: Socar, title: "쏘카", description: "전기차 충전 할인 20%" },
  { img: Ddareungi, title: "따릉이", description: "따릉이 1시간 일일권 무료" },
  { img: Socar, title: "쏘카", description: "전기차 충전 할인 20%" },
  { img: Ddareungi, title: "따릉이", description: "따릉이 1시간 일일권 무료" },
];

export default function Layout() {
  const [isOpen, setOpen] = useState(false);
  const isBottom = useRecoilValue(bottomState);

  return (
    <>
      <div className="min-h-screen">
        <Outlet />
      </div>

      {isBottom && (
        <div
          className="flex items-center justify-between font-semibold fixed bottom-0 left-0 right-0 h-[7vh] bg-[#EAEDF5] shadow-lg px-6 cursor-pointer rounded-t-2xl"
          onClick={() => setOpen(true)}
        >
          <div className="flex gap-3 items-center">
            <p>OOO님</p>
            <img src={BottomSheetGradeEx} alt="Grade Icon" />
          </div>
          <p>170,980원</p>
        </div>
      )}

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container
          style={{
            backgroundColor: "#F9FAFD",
            borderTopLeftRadius: "9999px",
            borderTopRightRadius: "9999px",
          }}
        >
          <Sheet.Header className="bg-[#F9FAFD] rounded-t-2xl border-y-[#F9FAFD]" />
          <Sheet.Content className="p-6 bg-white flex flex-col items-center bg-[#F9FAFD]">
            <img src={Grade1} alt="" className="text-center max-h-[18vh]" />
            <div className="mt-[2vh]">
              <p className="text-lg font-medium">현재 OOO님의 등급은</p>
              <p className="text-center text-lg font-extrabold mb-4">
                환경 보호 꿈나무
              </p>
            </div>
            <div
              className="flex justify-between items-center w-full h-[18vh] mb-8 rounded-2xl"
              style={{ backgroundColor: "rgba(9, 55, 188, 0.05)" }}
            >
              <div className="w-[49%] flex flex-col items-center">
                <p className="text-sm text-gray-500 font-medium">당월 거래량</p>
                <p className="text-lg font-bold">170,980원</p>
              </div>
              <div className="max-w-[3px] w-[0.5%] h-[60%] bg-[#D9D9D9]"></div>
              <div className="w-[49%] flex flex-col items-center">
                <p className="text-sm text-gray-500 font-medium">보유 평가액</p>
                <p className="text-lg font-bold">214,431원</p>
              </div>
            </div>
            <h3 className="w-full text-md font-semibold mb-4">
              받을 수 있는 혜택
            </h3>
            <div className="w-full flex flex-col gap-6 pl-3 overflow-y-auto">
              {benefits.map((benefit, index) => (
                <div className="flex gap-4" key={index}>
                  <img
                    src={benefit.img}
                    alt={benefit.title}
                    className="w-[5.5vh] h-[5.5vh] rounded-xl border-[#0000000D] border-[0.1rem]"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{benefit.title}</div>
                    <div className="text-md font-extrabold">
                      {benefit.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
