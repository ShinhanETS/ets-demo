import { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { Login } from "../apis/LoginApi"; // LoginApi에서 Login 함수를 import
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용하여 페이지 이동
import axios from "axios";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isUserIdFocused, setIsUserIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 저장할 state 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 useHistory 훅

  useEffect(() => {
    // 추가적인 효과가 필요할 경우 여기에 작성
  }, []);

  const isDisabled = userId.trim() === "" || password.trim() === "";

  const handleButtonClick = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      const response = await Login(userId, password); // API 호출
      console.log(response); // 성공적으로 로그인된 경우, 응답을 콘솔에 출력

      // Bearer token을 Authorization 헤더에 추가
      const token = response.data; // 응답에서 토큰을 가져옴
      localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장

      // 이후 API 요청 시 토큰을 헤더에 추가
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 페이지를 '/'로 리다이렉션
      navigate("/");
    } catch (error) {
      setErrorMessage(
        "로그인에 실패했습니다. \n 아이디와 비밀번호를 확인해주세요."
      ); // 에러 메시지 설정
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-[20vh]">
      <div className="mb-8 text-2xl font-extrabold text-gray-800">
        ID와 접속 비밀번호를
        <br />
        입력하세요
      </div>
      <form
        className="space-y-4 flex flex-col flex-1"
        onSubmit={handleButtonClick}
      >
        <div>
          <TextInput
            id="userId"
            type="text"
            placeholder="ID"
            required
            className="mt-1"
            style={{
              backgroundColor: isUserIdFocused ? "#E7EAF4" : "#F7F7F7",
              border: "none",
              outline: "none",
            }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onFocus={() => setIsUserIdFocused(true)}
            onBlur={() => setIsUserIdFocused(false)}
          />
        </div>
        <div>
          <TextInput
            id="password"
            type="password"
            placeholder="접속 비밀번호"
            required
            className="mt-1"
            style={{
              backgroundColor: isPasswordFocused ? "#E7EAF4" : "#F7F7F7",
              border: "none",
              outline: "none",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}{" "}
        {/* 에러 메시지 출력 */}
        <div className="flex-1 flex items-end">
          <Button
            type="submit"
            className={`w-full mt-auto ${
              isDisabled ? "bg-[#C9CFFA]" : "bg-blue-1 hover:bg-blue-600"
            }`}
            style={{ color: isDisabled ? "" : "white" }}
            disabled={isDisabled}
            size="lg"
          >
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
