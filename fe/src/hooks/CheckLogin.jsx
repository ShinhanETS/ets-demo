import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useCheckLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        }
    }, [navigate]);
}
