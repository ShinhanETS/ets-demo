import { useRecoilState } from "recoil";
import { textState } from '../recoil/state';

export default function RecoilEx() {
  const [text, setText] = useRecoilState(textState); // textState와 연결

  const handleChange = (event) => {
    setText(event.target.value); // 입력값을 Recoil 상태에 저장
  };

  return (
    <div>
      텍스트 입력:  
      <input 
        type="text" 
        value={text} 
        onChange={handleChange} 
        placeholder="텍스트를 입력하세요" 
        className="border-4"
      />
      <p>저장된 텍스트: {text}</p> {/* 저장된 텍스트 표시 */}
    </div>
  );
}
