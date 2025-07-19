import React from 'react';

export default function KpiCard({ title, value, change, changeType, icon }) {
  const isIncrease = changeType === 'increase';
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        <p className={`text-xs mt-2 font-semibold ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>{change} vs last month</p>
      </div>
      <div className={`p-3 rounded-lg ${isIncrease ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{icon}</div>
    </div>
  );
};