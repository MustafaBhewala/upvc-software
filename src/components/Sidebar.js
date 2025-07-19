import React, { useState } from 'react';
import { Home, FileText, FilePlus, Users, Package, BarChart2, Settings, ChevronDown, ChevronRight, User, X, SlidersHorizontal } from 'lucide-react';

const NavItem = ({ item, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = (pageName) => {
    if (['Dashboard', 'New Quotation', 'Window Designer', 'Sales', 'Customers', 'Inventory', 'Reports', 'Settings'].includes(pageName)) { // <-- ADD 'Settings'
        setCurrentPage(pageName);
    } else if (pageName === 'New Invoice' || pageName === 'View Invoices') {
        setCurrentPage('Sales');
    } else if (pageName === 'Stock View' || pageName === 'Add Item' || pageName === 'Suppliers') {
        setCurrentPage('Inventory');
    } else if (pageName === 'Sales Report' || pageName === 'Profit & Loss') {
        setCurrentPage('Reports');
    }
    else {
        if (hasSubItems) setIsOpen(!isOpen);
    }
  };

  return (
    <li className="px-4 mb-1">
      <a href="#" className="flex items-center justify-between p-2 text-sm text-gray-600 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => handleClick(item.name)}>
        <div className="flex items-center space-x-3"><span className="w-5 h-5">{item.icon}</span><span>{item.name}</span></div>
        {hasSubItems && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </a>
      {hasSubItems && isOpen && (
        <ul className="pl-6 mt-1">
          {item.subItems.map((subItem) => (
            <li key={subItem}><a href="#" onClick={() => handleClick(subItem)} className="block p-2 text-sm text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-800">{subItem}</a></li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }) {
  const navItems = [
    { name: "Dashboard", icon: <Home />, subItems: [] },
    { name: "Window Designer", icon: <SlidersHorizontal />, subItems: [] },
    { name: "Design & Quote", icon: <FilePlus />, subItems: ["New Quotation", "View Quotations"] },
    { name: "Sales", icon: <FileText />, subItems: ["New Invoice", "View Invoices"] },
    { name: "Customers", icon: <Users />, subItems: [] },
    { name: "Inventory", icon: <Package />, subItems: ["Stock View", "Add Item", "Suppliers"] },
    { name: "Reports", icon: <BarChart2 />, subItems: ["Sales Report", "Profit & Loss"] },
    { name: "Settings", icon: <Settings />, subItems: [] },
  ];

  return (
    <aside className={`bg-white text-gray-800 ${isSidebarOpen ? 'w-64' : 'w-0'} lg:w-64 transition-all duration-300 ease-in-out flex flex-col fixed lg:relative h-full z-20 shadow-lg`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor" className="w-8 h-8 text-blue-600"><path d="M12 2L3 8v11a2 2 0 002 2h14a2 2 0 002-2V8l-9-6zM9 20H6v-5h3v5zm4 0h-3v-9h3v9zm4 0h-3v-7h3v7zM8 9H5l7-4.67L19 9h-3v2H8V9z"/></svg>
            <span className="text-xl font-bold text-gray-800">SafePlast ERP</span>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800"><X size={24} /></button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>{navItems.map((item) => (<NavItem key={item.name} item={item} setCurrentPage={setCurrentPage} />))}</ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center"><User className="text-blue-600" /></div>
          <div><p className="font-semibold text-sm">Saifi Bhewala</p><p className="text-xs text-gray-500">Administrator</p></div>
        </div>
      </div>
    </aside>
  );
};
