import React from 'react';
import { KpiData } from '../mock';

interface KpiCardProps {
  data: KpiData;
  onClick?: () => void;
}

/**
 * KPIカードコンポーネント
 * KPI指標を表示するカードです
 */
const KpiCard: React.FC<KpiCardProps> = ({ data, onClick }) => {
  const getChangeColor = (changeType: string): string => {
    switch (changeType) {
      case 'positive':
        return 'text-secondary';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-neutral-800';
    }
  };

  const getChangeIcon = (changeType: string): JSX.Element => {
    if (changeType === 'positive') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14l5-5 5 5"/>
        </svg>
      );
    } else if (changeType === 'negative') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 10l-5 5-5-5"/>
        </svg>
      );
    }
    return <></>;
  };

  const renderIcon = (iconType: string): JSX.Element => {
    const iconClass = "w-8 h-8 text-primary";
    
    switch (iconType) {
      case 'chart':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3v18h18M8 17l4-4 4 4 6-6"/>
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
      case 'sales':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
    <div 
      className={`
        bg-white p-6 rounded-lg shadow-elevation-2 border border-neutral-100
        transition-all duration-200 cursor-pointer
        hover:shadow-elevation-4 hover:-translate-y-0.5
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-neutral-800 font-noto mb-2">
            {data.title}
          </h3>
          <div className="text-2xl font-bold text-neutral-800 font-noto mb-1">
            {data.value}
          </div>
          <div className={`flex items-center text-sm font-medium ${getChangeColor(data.changeType)}`}>
            {getChangeIcon(data.changeType)}
            <span className="ml-1">{data.change}</span>
          </div>
        </div>
        <div className="ml-4">
          {renderIcon(data.icon)}
        </div>
      </div>
    </div>
  );
};

export default KpiCard; 