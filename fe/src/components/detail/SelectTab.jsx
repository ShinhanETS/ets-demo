// import { useState } from "react";

// export default function SelectTab({ options, tab, setTab }) {
//   return (
//     <div className="flex bg-white px-[1.5rem] py-[1rem] gap-[14px] text-[1.1rem] font-bold">
//       {options.map((option, idx) =>
//         tab === idx ? (
//           <div key={idx}>
//             <div className="text-black">{option}</div>
//             <div className="bg-black h-[2px]"></div>
//           </div>
//         ) : (
//           <div key={idx} className="text-black30" onClick={() => setTab(idx)}>
//             {option}
//           </div>
//         )
//       )}
//     </div>
//   );
// }
import { useState } from "react";

export default function SelectTab({ options, tab, setTab }) {
  return (
    <div className="flex bg-white px-[1.5rem] py-[1rem] gap-[14px] text-[1rem] font-bold">
      {options.map((option, idx) => (
        <div
          key={idx}
          className={`tab ${tab === idx ? 'tab-active' : 'tab-inactive'}`}
          onClick={() => setTab(idx)}
        >
          <div>{option}</div>
          {tab === idx && <div className="bg-black h-[2px]"></div>}
        </div>
      ))}
    </div>
  );
}
