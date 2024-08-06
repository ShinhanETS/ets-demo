import { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    useEffect(() => {
        // 추가적인 효과가 필요할 경우 여기에 작성
    }, []);

    const isDisabled = username.trim() === "" || password.trim() === "";

    const handleButtonClick = () => {
        alert('엔터')
    }
    
    return (
        <div className="flex flex-col min-h-screen px-6 py-[20vh]">
            <div className="mb-8 text-2xl font-extrabold text-gray-800">
                ID와 접속 비밀번호를<br />입력하세요
            </div>
            <form className="space-y-4 flex flex-col flex-1">
                <div>
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="ID"
                        required
                        className="mt-1"
                        style={{ backgroundColor: isUsernameFocused ? '#E7EAF4' : '#F7F7F7', border : 'none', outline: 'none' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsUsernameFocused(true)}  // 포커스 시 상태 변경
                        onBlur={() => setIsUsernameFocused(false)}  // 포커스 해제 시 상태 변경
                    />
                </div>
                <div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="접속 비밀번호"
                        required
                        className="mt-1"
                        style={{ backgroundColor: isPasswordFocused ? '#E7EAF4' : '#F7F7F7', border: 'none', outline: 'none'  }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}  // 포커스 시 상태 변경
                        onBlur={() => setIsPasswordFocused(false)}  // 포커스 해제 시 상태 변경
                    />
                </div>
                <div className="flex-1 flex items-end">
                    <Button
                        type="submit"
                        className={`w-full mt-auto ${isDisabled ? 'bg-[#C9CFFA]' : 'bg-blue-1 hover:bg-blue-600'}`}
                        style={{ color: isDisabled ? '' : 'white' }}
                        disabled={isDisabled}
                        size="lg"
                        onClick={handleButtonClick}
                    >
                        로그인
                    </Button>
                </div>
            </form>
        </div>
    );
}
