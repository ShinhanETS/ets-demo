import { Sheet } from "react-modal-sheet";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CheckLogin from "../../hooks/CheckLogin";
import { fetchMembership } from "../../apis/MembershipApi";
import { bottomState } from "../../recoil/state";
import { useRecoilValue } from "recoil";
import MembershipGauge from "../main/MembershipGauge"; // MembershipGauge 컴포넌트 임포트
import { fetchMyBudget } from "../../apis/AccountApi";
import { fetchMyProductTotal } from "../../apis/EtsApi";

export const UserContext = createContext(null);
export const getLevel = (point) => {
  if (point < 100) return 1;
  if (point < 200) return 2;
  if (point < 300) return 3;
  return 4;
};

export default function Layout() {
  const [isOpen, setOpen] = useState(false);
  const [membershipData, setMembershipData] = useState({});
  const [totalProduct, setTotalProduct] = useState({});
  const [totalBudget, setTotalBudget] = useState(0)
  const isBottom = useRecoilValue(bottomState);

  CheckLogin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 두 API 호출을 병렬로 수행
        const [membershipApiData, budgetResponse, productTotalResponse] = await Promise.all([
          fetchMembership(),
          fetchMyBudget(),
          fetchMyProductTotal(),
        ]);
        
        // 각각의 응답 데이터로 상태 업데이트
        setMembershipData(membershipApiData.data);
        setTotalBudget(budgetResponse.data);
        setTotalProduct(productTotalResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isBottom, isOpen]);

  const benefits = membershipData?.benefits || [];
  const username = membershipData?.username || "";
  const { point, minPoint, maxPoint } = membershipData;

  return (
    <UserContext.Provider value={{ username }}>
      <>
        <div className="min-h-screen">
          <Outlet username={membershipData ? membershipData.username : ""} />
        </div>

        {isBottom && (
          <div
            className="flex items-center justify-between font-semibold fixed bottom-0 left-0 right-0 h-[7vh] bg-[#EAEDF5] shadow-lg px-6 cursor-pointer rounded-t-2xl select-none"
            onClick={() => setOpen(true)}
          >
            <div className="flex gap-3 items-center">
              <p className="font-bold">{membershipData?.username}님</p>
              <img
                src={membershipData?.gradeImage}
                className="h-[4vh]"
                alt="Grade Icon"
              />
            </div>
            <p>{totalBudget.toLocaleString()}원</p>
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
              <img
                src={membershipData?.gradeImage}
                alt=""
                className="text-center max-h-[18vh]"
              />
              <div className="mt-[2vh]">
                <p className="text-lg font-medium">
                  현재{" "}
                  <span className="font-extrabold">
                    {membershipData?.username}
                  </span>
                  님의 등급은
                </p>
                <p className="text-center text-lg font-extrabold mb-4">
                  Lv{getLevel(membershipData?.point)}{" "}{membershipData?.grade}
                </p>
              </div>
              <MembershipGauge 
                point={point} 
                minPoint={minPoint} 
                maxPoint={maxPoint} 
              />
              <div className="h-[2vh]"></div>
              <div
                className="flex justify-between items-center w-full h-[10vh] mb-8 rounded-2xl"
                style={{
                  backgroundColor: "rgba(9, 55, 188, 0.05)",
                }}
              >
                <div className="w-[49%] flex flex-col items-center">
                  <p className="text-sm text-gray-500 font-medium">
                    당월 거래량
                  </p>
                  <p className="text-lg font-bold">{totalProduct?.offerAmount?.toLocaleString()}원</p>
                </div>
                <div className="max-w-[3px] w-[0.5%] h-[60%] bg-[#D9D9D9]"></div>
                <div className="w-[49%] flex flex-col items-center">
                  <p className="text-sm text-gray-500 font-medium">
                    보유 평가액
                  </p>
                  <p className="text-lg font-bold">
                    {totalProduct?.stockAmount}원
                  </p>
                </div>
              </div>
              <h3 className="w-full text-md font-semibold mb-4">
                받을 수 있는 혜택
              </h3>
              <div className="w-full flex flex-col gap-8 pl-3 overflow-y-auto">
                {benefits.map((benefit, index) => (
                  <div className="flex gap-4" key={index}>
                    <img
                      src={benefit?.brandImage}
                      alt={benefit?.brand}
                      className="w-[5.5vh] h-[5.5vh] rounded-xl border-[#0000000D] border-[0.1rem]"
                    />
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">
                        {benefit?.brand}
                      </div>
                      <div className="text-md font-extrabold">
                        {benefit?.benefit}
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
    </UserContext.Provider>
  );
}
