import React from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

const customerData = [
    { id: 1, name: "Kaidbhai Kadiyavad", contact: "+91 98XXXXXX01", site: "Kadiyavad, Dahod", projects: 3 },
    { id: 2, name: "Dr S M Jain Shubham hospital", contact: "+91 98XXXXXX02", site: "Darpan Road, Dahod", projects: 1 },
    { id: 3, name: "Mr. Sharma", contact: "+91 98XXXXXX03", site: "Godhra Road, Dahod", projects: 5 },
    { id: 4, name: "ABC Constructions", contact: "+91 98XXXXXX04", site: "Industrial Area, Dahod", projects: 8 },
    { id: 5, name: "Local Hardware", contact: "+91 98XXXXXX05", site: "Station Road, Dahod", projects: 2 },
];

export default function Customers({ setCurrentPage }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customers</h1>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700"
                >
                    <UserPlus size={20} />
                    <span>Add New Customer</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-sm font-semibold text-gray-600">Customer Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Contact</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Primary Site</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Projects</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerData.map((customer) => (
                                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                                    <td className="p-3 text-gray-600">{customer.contact}</td>
                                    <td className="p-3 text-gray-500">{customer.site}</td>
                                    <td className="p-3 text-gray-800 text-center">{customer.projects}</td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                                            <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                        </div>
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
