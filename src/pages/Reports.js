import React from 'react';
import { TrendingUp, TrendingDown, FileText } from 'lucide-react';

export default function Reports({ setCurrentPage }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sales Report Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Sales Report</h2>
                            <p className="text-sm text-gray-500">View detailed sales analytics</p>
                        </div>
                    </div>
                     <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                        Generate Report
                    </button>
                </div>

                {/* Profit & Loss Card */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Profit & Loss</h2>
                            <p className="text-sm text-gray-500">Track your income and expenses</p>
                        </div>
                    </div>
                     <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
                        View Statement
                    </button>
                </div>
                
                 {/* Placeholder for another report */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <TrendingDown className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Expense Report</h2>
                            <p className="text-sm text-gray-500">Monitor your business spending</p>
                        </div>
                    </div>
                     <button className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600">
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    );
}