import { Sheet } from 'react-modal-sheet';
import { useEffect, useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import CheckLogin from '../../hooks/CheckLogin';
import { fetchMembership } from '../../apis/MembershipApi';

export const UserContext = createContext(null);

export default function Layout() {
  const [isOpen, setOpen] = useState(false);
  const [membershipData, setMembershipData] = useState({});

  CheckLogin();

  useEffect(() => {
    const fetchData = async () => {
      const membershipApiData = await fetchMembership();
      setMembershipData(membershipApiData.data);
      console.log(membershipApiData);
    };

    fetchData();
  }, []);

  // API 응답에서 benefits, username을 가져옴
  const benefits = membershipData?.benefits || [];
  const username = membershipData?.username || '';

  return (
    <UserContext.Provider value={{ username }}>
      <>
        <div className="min-h-screen">
          <Outlet username={membershipData ? membershipData.username : ''} />
        </div>

        <div className="flex items-center justify-between font-semibold fixed bottom-0 left-0 right-0 h-[7vh] bg-[#EAEDF5] shadow-lg px-6 cursor-pointer rounded-t-2xl select-none" onClick={() => setOpen(true)}>
          <div className='flex gap-3 items-center'>
            <p className='font-bold'>{membershipData?.username}님</p> 
            <img src={membershipData?.gradeImage} className='h-[4vh]' alt="Grade Icon" />
          </div>
          <p>{membershipData?.maxPoint}원</p>
        </div>

        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container style={{ backgroundColor: '#F9FAFD', borderTopLeftRadius: '9999px', borderTopRightRadius: '9999px' }}>
            <Sheet.Header className='bg-[#F9FAFD] rounded-t-2xl border-y-[#F9FAFD]' />
            <Sheet.Content className="p-6 bg-white flex flex-col items-center bg-[#F9FAFD]">
              <img src={membershipData?.gradeImage} alt="" className='text-center max-h-[18vh]' />
              <div className='mt-[2vh]'>
                <p className="text-lg font-medium">현재 <span className='font-extrabold'>{membershipData?.username}</span>님의 등급은</p>
                <p className="text-center text-lg font-extrabold mb-4">{membershipData?.grade}</p>
              </div>
              <div className="flex justify-between items-center w-full h-[10vh] mb-8 rounded-2xl" style={{ backgroundColor: 'rgba(9, 55, 188, 0.05)' }}>
                <div className='w-[49%] flex flex-col items-center'>
                  <p className="text-sm text-gray-500 font-medium">당월 거래량</p>
                  <p className="text-lg font-bold">{membershipData?.point}원</p>
                </div>
                <div className='max-w-[3px] w-[0.5%] h-[60%] bg-[#D9D9D9]'></div>
                <div className='w-[49%] flex flex-col items-center'>
                  <p className="text-sm text-gray-500 font-medium">보유 평가액</p>
                  <p className="text-lg font-bold">{membershipData?.maxPoint}원</p>
                </div>
              </div>
              <h3 className="w-full text-md font-semibold mb-4">받을 수 있는 혜택</h3>
              <div className="w-full flex flex-col gap-6 pl-3 overflow-y-auto">
                {benefits.map((benefit, index) => (
                  <div className='flex gap-4' key={index}>
                    <img src={benefit?.brandImage} alt={benefit?.brand} className='w-[5.5vh] h-[5.5vh] rounded-xl border-[#0000000D] border-[0.1rem]' />
                    <div className='flex flex-col'>
                      <div className="text-sm font-medium">{benefit?.brand}</div>
                      <div className="text-md font-extrabold">{benefit?.benefit}</div>
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
