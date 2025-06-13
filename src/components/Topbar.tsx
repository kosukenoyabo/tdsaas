import React from 'react';

interface TopbarProps {
  title?: string;
  workspace?: string;
  userName?: string;
}

/**
 * トップバーコンポーネント
 * 56px固定高さのヘッダーバーを表示します
 */
const Topbar: React.FC<TopbarProps> = ({ 
  title = 'Dashboard',
  workspace = 'workspace01',
  userName = 'AC'
}) => {
  return (
    <header className="h-14 flex items-center justify-between border-b border-neutral-100 px-6 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-neutral-800 font-noto">{workspace}</span>
        {title && (
          <>
            <span className="text-neutral-100">|</span>
            <h1 className="text-lg font-medium text-neutral-800 font-noto">{title}</h1>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search Button */}
        <button className="w-8 h-8 text-neutral-800 hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Notifications */}
        <button className="relative w-8 h-8 text-neutral-800 hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-full bg-primary/20 grid place-content-center text-sm text-primary font-medium">
            {userName}
          </span>
          <button className="text-neutral-800 hover:text-primary transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 