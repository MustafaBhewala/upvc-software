import React from 'react';
import { PlusCircle } from 'lucide-react';

const recentInvoices = [
  { id: "INV-101", customer: "Dr S M Jain Shubham hospital", amount: "₹9,086.00", status: "Paid", date: "21-06-2025" },
  { id: "INV-102", customer: "ABC Constructions", amount: "₹2,50,000", status: "Pending", date: "18-06-2025" },
  { id: "INV-103", customer: "Local Hardware", amount: "₹35,400", status: "Paid", date: "15-06-2025" },
  { id: "INV-104", customer: "Mr. Sharma", amount: "₹1,12,000", status: "Overdue", date: "05-06-2025" },
];

const statusColors = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Overdue: "bg-red-100 text-red-800",
};

export default function Sales({ setCurrentPage }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Sales & Invoices</h1>
                <button 
                    onClick={() => setCurrentPage('New Quotation')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700"
                >
                    <PlusCircle size={20} />
                    <span>Create New Invoice</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Invoices</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-sm font-semibold text-gray-600">Invoice ID</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Customer</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentInvoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-blue-600 hover:underline cursor-pointer">{invoice.id}</td>
                                    <td className="p-3 text-gray-600">{invoice.customer}</td>
                                    <td className="p-3 text-gray-500">{invoice.date}</td>
                                    <td className="p-3 text-gray-800 text-right">{invoice.amount}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
