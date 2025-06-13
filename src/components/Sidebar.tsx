import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

/**
 * サイドバーコンポーネント
 * 80px固定幅のナビゲーションメニューを表示します
 */
const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard' },
    { id: 'forecast', label: '需要予測', icon: 'chart', path: '/forecast' },
    { id: 'order', label: '発注推奨', icon: 'order', path: '/order' },
    { id: 'exception', label: 'アラート', icon: 'alert', path: '/exception' },
    { id: 'inventory', label: '在庫最適化', icon: 'inventory', path: '/inventory' },
    { id: 'supplier', label: '契約最適化', icon: 'supplier', path: '/supplier' },
    { id: 'settings', label: '設定', icon: 'settings', path: '/settings' },
  ];

  const getCurrentActiveItem = (): string => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    return currentItem?.id || 'dashboard';
  };

  const handleItemClick = (item: { id: string; path: string }): void => {
    navigate(item.path);
    onItemClick?.(item.id);
  };

  const currentActiveItem = activeItem || getCurrentActiveItem();

  const renderIcon = (iconType: string): JSX.Element => {
    const iconClass = "w-6 h-6 mb-1";
    
    switch (iconType) {
      case 'home':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        );
      case 'chart':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3v18h18M8 17l4-4 4 4 6-6"/>
          </svg>
        );
      case 'order':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-4M9 11V9a2 2 0 114 0v2M9 11h6"/>
          </svg>
        );
      case 'alert':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        );
      case 'inventory':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        );
      case 'supplier':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        );
      case 'settings':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  return (
    <aside className="w-20 bg-primary text-white flex flex-col items-center pt-6 h-screen">
      {/* Logo */}
      <div className="w-12 h-12 mb-8 bg-white rounded-lg flex items-center justify-center">
        <span className="text-primary font-bold text-lg">AI</span>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-4 text-xs font-noto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              relative flex flex-col items-center p-2 rounded-lg transition-all duration-200
              hover:bg-white/10 hover:text-accent
              ${currentActiveItem === item.id ? 'text-accent' : 'text-white'}
            `}
          >
            {/* Active indicator */}
            {currentActiveItem === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full" />
            )}
            
            {renderIcon(item.icon)}
            <span className="text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 