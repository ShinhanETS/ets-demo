import { useState } from "react";

export default function SelectTab({ options, tab, setTab }) {
  return (
    <div className="flex bg-white-1 px-[1.5rem] py-[1rem] gap-4 text-[1.1rem] font-bold cursor-default">
      {options.map((option, idx) => (
        <div
          key={idx}
          className={`tab ${tab === idx ? "tab-active" : "tab-inactive"}`}
          onClick={() => setTab(idx)}
        >
          <div>{option}</div>
          {tab === idx && <div className="bg-black100 h-[2px]"></div>}
        </div>
      ))}
    </div>
  );
}
