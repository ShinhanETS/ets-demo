const MainButton = ({ selected, onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-1 rounded-full transition-all duration-200 outline-none select-none ${
        selected
          ? 'bg-blue-2 text-white-1' // 선택된 상태
          : 'bg-grey-1 text-grey-2' // 기본 상태
      }`}
    >
      {text}
    </button>
  );
};

export default MainButton;
