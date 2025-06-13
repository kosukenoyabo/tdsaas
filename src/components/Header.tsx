import React from 'react';

/**
 * ヘッダーコンポーネント
 * トップバーとユーザー情報を表示します
 */
const Header: React.FC = () => {
  return (
    <header className="h-14 flex items-center justify-between border-b px-6 bg-white">
      <span className="text-sm text-gray-600">workspace01</span>
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 text-gray-500 hover:text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <span className="w-8 h-8 rounded-full bg-blue-200 grid place-content-center text-sm text-blue-800">
          ac
        </span>
      </div>
    </header>
  );
};

export default Header; 