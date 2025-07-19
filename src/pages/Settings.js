import React, { useState } from 'react';
import { Building, Percent } from 'lucide-react';

export default function Settings({ setCurrentPage }) {
    const [settings, setSettings] = useState({
        companyName: "Safe Plast",
        gstin: "24AIDPB1130H2Z4",
        address: "Indore-Ahmadabad Highway, Opp. RTO Office, Nr. Laxshmi Narayan force showroom, Dahod, 389151",
        email: "safeplast.maker@gmail.com",
        phone: "+91 9408427918",
        cgst: 9,
        sgst: 9,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        // In a real application, you would send this data to a server/database.
        console.log("Saving settings:", settings);
        alert("Settings saved successfully! (Check the console)");
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="space-y-8">
                {/* Company Details */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                        <Building className="w-6 h-6 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-700">Company Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="companyName" placeholder="Company Name" value={settings.companyName} onChange={handleInputChange} className="p-2 border rounded-md" />
                        <input type="text" name="gstin" placeholder="GSTIN" value={settings.gstin} onChange={handleInputChange} className="p-2 border rounded-md" />
                        <textarea name="address" placeholder="Company Address" rows="3" value={settings.address} onChange={handleInputChange} className="p-2 border rounded-md md:col-span-2"></textarea>
                        <input type="email" name="email" placeholder="Email" value={settings.email} onChange={handleInputChange} className="p-2 border rounded-md" />
                        <input type="tel" name="phone" placeholder="Phone" value={settings.phone} onChange={handleInputChange} className="p-2 border rounded-md" />
                    </div>
                </div>

                {/* Tax Settings */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                        <Percent className="w-6 h-6 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-700">Tax Settings</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Default CGST Rate (%)</label>
                            <input type="number" name="cgst" value={settings.cgst} onChange={handleInputChange} className="p-2 border rounded-md w-full" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Default SGST Rate (%)</label>
                            <input type="number" name="sgst" value={settings.sgst} onChange={handleInputChange} className="p-2 border rounded-md w-full" />
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button 
                        onClick={handleSaveChanges}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}