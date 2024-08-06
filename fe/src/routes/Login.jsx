import { useEffect } from "react";
import { Button } from "flowbite-react";

export default function Login() {
    useEffect(() => {

    }, []);
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="mb-4 text-2xl font-bold">로그인 페이지입니다</h1>
            <Button color="blue">Blue</Button>
            <Button color="failure">Failure</Button>
        </div>
    );
}
