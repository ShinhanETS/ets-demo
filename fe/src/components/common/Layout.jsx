import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomSheetGradeEx from '../../assets/BottomSheetGradeEx.svg';

export default function Layout() {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <div className="min-h-screen">
        <Outlet /> {/* 자식 라우트를 여기에 렌더링 */}
      </div>

      {/* Fixed Header 부분 */}
      <div className="flex items-center justify-between font-semibold fixed bottom-0 left-0 right-0 h-[7vh] bg-[#EAEDF5] shadow-lg px-6 cursor-pointer rounded-t-2xl" onClick={() => setOpen(true)}>
        <div className='flex gap-3 items-center'>
          <p>OOO님</p> 
          <img src={BottomSheetGradeEx} alt="Grade Icon" />
        </div>
        <p>170,980원</p> {/* 사용자 이름과 금액 표시 */}
      </div>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className="p-6 bg-white">
            <h2 className="text-lg font-bold mb-4">현재 OOO님의 등급은</h2>
            <p className="text-center text-xl font-semibold mb-4">환경 보호 꿈나무</p>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">누적 투자금액</p>
                <p className="text-lg font-semibold">170,980원</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">누적 거래량</p>
                <p className="text-lg font-semibold">어쩌구</p>
              </div>
            </div>
            <h3 className="text-md font-bold mb-2">받을 수 있는 혜택</h3>
            <ul className="list-disc pl-5">
              <li className="mb-2">전기차 충전 할인 20%</li>
              <li className="mb-2">따릉이 1시간 일일권 무료</li>
              <li className="mb-2">전기차 충전 할인 20%</li>
              <li className="mb-2">따릉이 1시간 일일권 무료</li>
            </ul>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
