import { useState } from 'react';
import './Layout.module.css';

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="content">{children}</div>
      {isVisible && (
        <div className="popup">특정 창 내용</div> // 올라오는 창
      )}
    </div>
  );
};

export default Layout;
