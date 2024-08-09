import { useEffect } from "react";
import { Modal } from "flowbite-react";
import X from "../../assets/X.png";
import MainModalBanner from "../../assets/MainModalBanner.jpg";
import Grade4 from "../../assets/Grade4.png";

// eslint-disable-next-line react/prop-types
export default function MainModal({ modalOpen, setModalOpen }) {
  const progress = 50;
  useEffect(() => {
    const modalStatus = localStorage.getItem("modalOpen");
    if (modalStatus === "false") {
      setModalOpen(false);
    }
  }, [setModalOpen]);

  const handleDontShowAgain = () => {
    localStorage.setItem("modalOpen", "false");
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        className="bg-[#00000091]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Body className="bg-white-1 rounded-2xl p-0 flex flex-col mx-4">
          <div className="px-2 pt-2">
            <div className="flex justify-between pb-4">
              <div
                className="text-sm font-light underline text-[#6A6A6A] cursor-pointer"
                onClick={handleDontShowAgain}
              >
                다시보지 않기
              </div>
              <div
                className="w-[8%] max-w-[30px] cursor-pointer"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <img src={X} alt="" />
              </div>
            </div>
            <div className="w-full h-[32vh] px-6">
              <div>
                <img src={MainModalBanner} alt="" />
              </div>
              <div className="font-extrabold text-xl mb-[1vh]">
                탄소배출권이란?
              </div>
              <div className="text-[0.8rem] font-medium leading-tight">
                탄소배출권 제도는 정부가 정한 온실가스 배출 한도를 기업에
                할당하여, 기업이 이를 거래할 수 있게 하는 제도예요. 배출권
                매매를 통해 포트폴리오 다양성을 키우고, 간접적으로 기업들의 탄소
                배출량을 줄이는 데 기여할 수 있어요.
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-[24vh] gap-4 bg-[#6E7CBC] px-7">
            <div className="w-[24vw]">
              <img src={Grade4} alt="" className="" />
              <div className="relative w-full h-1 bg-[#D9D9D9] rounded">
                <div
                  className="absolute h-full rounded"
                  style={{
                    width: `${progress}%`,
                    backgroundImage:
                      "linear-gradient(to right, #4ECC27, #05CBEE)",
                  }}
                />
              </div>
            </div>
            <div className="w-[40vw] text-white-1">
              <div className="text-xl font-bold">멤버십제도</div>
              <div className="text-[0.8rem] font-light leading-tight">
                배출권을 매매할수록 멤버쉽 점수가 오르고, 점수가 높아질수록
                등급이 상승해요. 각 등급에 따라 다양한 멤버십 혜택이 제공되니,
                점수를 올려 더 많은 혜택을 누려보세요!
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
