import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const inventoryData = [
    { id: 'P001', name: '2-Track Sliding Profile', category: 'uPVC Profile', quantity: 150, unit: 'meters', price: 250 },
    { id: 'P002', name: '3-Track Sliding Profile', category: 'uPVC Profile', quantity: 120, unit: 'meters', price: 350 },
    { id: 'G001', name: '5mm Clear Glass', category: 'Glass', quantity: 80, unit: 'sq.ft.', price: 120 },
    { id: 'G002', name: '5mm Frosted Glass', category: 'Glass', quantity: 50, unit: 'sq.ft.', price: 180 },
    { id: 'H001', name: 'Touch Lock', category: 'Hardware', quantity: 200, unit: 'pieces', price: 150 },
    { id: 'H002', name: 'Double Roller', category: 'Hardware', quantity: 350, unit: 'pieces', price: 80 },
];

export default function Inventory({ setCurrentPage }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Management</h1>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700"
                >
                    <PlusCircle size={20} />
                    <span>Add New Item</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Stock</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-sm font-semibold text-gray-600">Item Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Category</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Quantity</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Unit Price (₹)</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{item.name}</td>
                                    <td className="p-3 text-gray-600">{item.category}</td>
                                    <td className="p-3 text-gray-800 text-right">{item.quantity} {item.unit}</td>
                                    <td className="p-3 text-gray-800 text-right">{item.price.toFixed(2)}</td>
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