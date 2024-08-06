import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 현재 URL이 '/login'이 아닐 경우에만 token 체크
    if (location.pathname !== '/login') {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // 토큰이 없으면 로그인 페이지로 이동
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen min-w-screen">
      <div>{children}</div>
      {isVisible && (
        <div>하단창 내용</div>
      )}
    </div>
  );
};

export default Layout;
