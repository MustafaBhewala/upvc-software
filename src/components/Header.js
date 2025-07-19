import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

export default function Header({ setIsSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600 mr-4"><Menu size={24} /></button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search quotations, customers..." className="bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-800 relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <User size={24} className="text-gray-500" />
      </div>
    </header>
  );
};
