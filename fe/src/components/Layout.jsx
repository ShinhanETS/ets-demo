import { useState } from 'react';

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="min-h-screen min-w-screen">
      <div className="">{children}</div>
      {isVisible && (
        <div>하단창 내용</div>
      )}
    </div>
  );
};

export default Layout;
