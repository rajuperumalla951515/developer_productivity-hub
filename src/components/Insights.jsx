import React from 'react';

const InsightCard = ({ insight }) => {
  const severityConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
      titleColor: 'text-green-900',
      textColor: 'text-green-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠️',
      titleColor: 'text-yellow-900',
      textColor: 'text-yellow-700',
    },
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '🔴',
      titleColor: 'text-red-900',
      textColor: 'text-red-700',
    },
  };

  const config = severityConfig[insight.severity] || severityConfig.warning;

  return (
    <div className={`rounded-lg border-l-4 p-4 ${config.bg} ${config.border}`}>
      <div className={`flex items-start gap-3`}>
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold ${config.titleColor}`}>{insight.title}</h3>
          <p className={`mt-1 text-sm ${config.textColor}`}>{insight.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
