import React from 'react';

// 진행 상황 계산 함수
const calculateGaugeWidth = (point, minPoint, maxPoint) => {
  const percentage = ((point - minPoint) / (maxPoint - minPoint)) * 100;
  return Math.min(100, Math.max(0, percentage)); // 0% ~ 100% 사이로 제한
};

// MembershipGauge 컴포넌트
const MembershipGauge = ({ point, minPoint, maxPoint }) => {
  const progress = calculateGaugeWidth(point, minPoint, maxPoint);
  const roundedProgress = Math.round(progress); // 소수 첫째 자리로 반올림
  
  return (
    <div className="relative w-full h-4 bg-[#e3e3e3] rounded overflow-hidden">
      <div
        className="absolute h-full rounded transition-all duration-400 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundImage: 'linear-gradient(to right, #4ECC27, #05CBEE)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
        {roundedProgress}%
      </div>
    </div>
  );
};

export default MembershipGauge;
