import { Button } from "flowbite-react";

export default function BottomButton({ text, height, color, onClick }) {
  const buttonHeight = height ? height : "3rem"; // 40px 이런식으로 주면 됩니다

  return (
    <Button
      style={{ height: buttonHeight }}
      className="w-full flex items-center justify-center"
      color={color}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

/* 참고 : 색상 (https://flowbite-react.com/docs/components/progress#colors)
    blue: string;
    cyan: string;
    dark: string;
    gray: string;
    green: string;
    indigo: string;
    light: string;
    lime: string;
    pink: string;
    purple: string;
    red: string;
    teal: string;
    yellow: string;
*/
