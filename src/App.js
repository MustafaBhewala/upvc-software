import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateQuote from './pages/CreateQuote';
import WindowDesigner from './pages/WindowDesigner';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Settings from './pages/Settings'; // <-- IMPORT NEW PAGE

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'New Quotation':
        return <CreateQuote setCurrentPage={setCurrentPage} />;
      case 'Window Designer':
        return <WindowDesigner setCurrentPage={setCurrentPage} />;
      case 'Sales':
        return <Sales setCurrentPage={setCurrentPage} />;
      case 'Customers':
        return <Customers setCurrentPage={setCurrentPage} />;
      case 'Inventory':
        return <Inventory setCurrentPage={setCurrentPage} />;
      case 'Reports':
        return <Reports setCurrentPage={setCurrentPage} />;
      case 'Settings': // <-- ADD NEW CASE
        return <Settings setCurrentPage={setCurrentPage} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
