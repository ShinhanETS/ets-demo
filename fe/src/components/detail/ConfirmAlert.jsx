import { useEffect } from "react";

export default function ConfirmAlert({ isOpen, setIsOpen, message }) {
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
          <div className="z-[100] w-[calc(100vw_-_84px)] text-center bg-white-1 flex flex-col fixed rounded-[0.6rem] shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <span className="py-7">{message}</span>
            <div
              onClick={onClose}
              className="bg-[#0937BC] text-white-1 rounded-b-[0.6rem] py-[0.5rem]"
            >
              확인
            </div>
          </div>
        </>
      )}
    </>
  );
}
