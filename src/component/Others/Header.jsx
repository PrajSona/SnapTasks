import React, { useState } from 'react';

const Header = (props) => {

  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.pageX + 10, y: e.pageY + 10 });
  };

  const handleMouseEnter = (text) => {
    setTooltipText(text);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleLogout = () => {
    props.logout("")
    localStorage.setItem("login", "")
  }


  return (
    <div className='relative bg-[#141619] h-20 w-screen px-7 flex items-center justify-between'>
      <div>
        <h1 className='text-white text-2xl'>
            {props.userData == "Admin"?"Hi, Prajwal":`Hi, ${props.userData?.name}`}👋
        </h1>
      </div>

      <div>
        <button
          className='bg-[#F44336] shadow-inner text-white text-xl py-1.5 px-2 rounded flex justify-center items-center gap-2'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => handleMouseEnter('🥺')}
          onMouseLeave={handleMouseLeave}

          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {showTooltip && (
        <div
          className='absolute bg-black text-white text-sm px-3 py-1 rounded'
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 50,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Header;
