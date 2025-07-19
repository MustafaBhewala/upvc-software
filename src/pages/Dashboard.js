import React from 'react';
// CORRECTED IMPORT PATH:
// This file is in `src/pages/`, so we go up one level (`../`) to `src/`
// and then down into `src/components/` to find the KpiCard.
import KpiCard from '../components/KpiCard';
import { BarChart2, FilePlus, FileText, Package } from 'lucide-react';

const kpiData = [
  { title: "Today's Sales", value: "₹45,231.89", change: "+2.5%", changeType: "increase", icon: <BarChart2 className="w-6 h-6" /> },
  { title: "New Quotations", value: "12", change: "+5", changeType: "increase", icon: <FilePlus className="w-6 h-6" /> },
  { title: "Pending Invoices", value: "8", change: "-1", changeType: "decrease", icon: <FileText className="w-6 h-6" /> },
  { title: "Stock Value", value: "₹8,50,000", change: "+1.2%", changeType: "increase", icon: <Package className="w-6 h-6" /> },
];

const recentQuotations = [
  { id: "QT-5334", customer: "Kaidbhai Kadiyavad", amount: "₹1,14,756", status: "Sent" },
  { id: "QT-5335", customer: "Shubham Hospital", amount: "₹88,500", status: "Draft" },
  { id: "QT-5336", customer: "Mr. Sharma", amount: "₹2,10,300", status: "Approved" },
  { id: "QT-5337", customer: "ABC Constructions", amount: "₹5,50,000", status: "Sent" },
  { id: "QT-5338", customer: "Local Hardware", amount: "₹45,000", status: "Rejected" },
];

const statusColors = {
  Sent: "bg-blue-100 text-blue-800",
  Draft: "bg-gray-100 text-gray-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {kpiData.map((kpi, index) => (
                <KpiCard key={index} {...kpi} />
            ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Quotations</h2>
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="p-3 text-sm font-semibold text-gray-600">Quote ID</th>
                        <th className="p-3 text-sm font-semibold text-gray-600">Customer</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 text-right">Amount</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 text-center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentQuotations.map((quote) => (
                        <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-800">{quote.id}</td>
                        <td className="p-3 text-gray-600">{quote.customer}</td>
                        <td className="p-3 text-gray-800 text-right">{quote.amount}</td>
                        <td className="p-3 text-center">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[quote.status]}`}>
                            {quote.status}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    );
}
