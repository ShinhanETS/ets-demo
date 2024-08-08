import { useEffect } from "react";

export default function ConfirmAlert({
  isOpen,
  setIsOpen,
  message,
  isSuccess,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="w-[100%] h-[100%] bg-black40 fixed left-0 top-0 z-30" />
          <div className="z-[100] w-[calc(100vw_-_64px)] text-center bg-white-1 flex flex-col fixed rounded-[0.6rem] shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            {isSuccess ? (
              <div className="pt-3 pb-2 border-b border-grey-1 text-blue-2">
                주문 성공
              </div>
            ) : (
              <div className="pt-3 pb-2 border-b border-grey-1 text-red-1">
                주문 실패
              </div>
            )}
            <div className="py-5">{message}</div>
            {isSuccess ?
              <div
                onClick={onClose}
                className="bg-[#0937BC] text-white-1 rounded-b-[0.6rem] py-[0.6rem]"
              >
                확인
              </div>
            :
              <div
                onClick={onClose}
                className="bg-red-1 text-white-1 rounded-b-[0.6rem] py-[0.6rem]"
              >
                확인
              </div>
            }
          </div>
        </>
      )}
    </>
  );
}
