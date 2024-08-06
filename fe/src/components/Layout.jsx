import { useState } from 'react';

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='w-full h-full'>
      <div className="w-full h-full">{children}</div>
      {isVisible && (
        <div>하단창 내용</div>
      )}
    </div>
  );
};

export default Layout;
