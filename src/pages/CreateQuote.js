import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft, Upload } from 'lucide-react';

export default function CreateQuote({ setCurrentPage }) {
    const [customerName, setCustomerName] = useState('');
    const [siteAddress, setSiteAddress] = useState('');
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        type: '3T Sliding Window', width: '', height: '', qty: 1, rate: 590,
        profileColor: 'White', glass: '5mm Clear', mosquitoNet: 'Yes', handle: 'Touch Lock',
        image: ''
    });
    const [sqft, setSqft] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const { width, height, qty, rate } = newItem;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        const q = parseInt(qty, 10) || 0;
        const r = parseFloat(rate) || 0;
        
        const currentSqft = w * h;
        setSqft(currentSqft.toFixed(2));

        const currentAmount = currentSqft * r * q;
        setAmount(currentAmount.toFixed(2));
    }, [newItem]);

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddItem = () => {
        if (parseFloat(sqft) > 0 && parseFloat(amount) > 0) {
            setItems(prev => [...prev, { ...newItem, sqft, amount, id: Date.now() }]);
            setNewItem({
                type: '3T Sliding Window', width: '', height: '', qty: 1, rate: 590,
                profileColor: 'White', glass: '5mm Clear', mosquitoNet: 'Yes', handle: 'Touch Lock',
                image: ''
            });
        } else {
            alert("Please enter valid width, height, and rate.");
        }
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };
    
    const subtotal = items.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return (
        <div className="container mx-auto">
            <button onClick={() => setCurrentPage('Dashboard')} className="flex items-center text-sm text-blue-600 hover:underline mb-4">
                <ArrowLeft size={16} className="mr-1" />
                Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Create New Quotation</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Customer Name (e.g., Kaidbhai)" value={customerName} onChange={e => setCustomerName(e.target.value)} className="p-2 border rounded-md" />
                    <input type="text" placeholder="Site Address (e.g., Kadiyavad, Dahod)" value={siteAddress} onChange={e => setSiteAddress(e.target.value)} className="p-2 border rounded-md" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Window/Door</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Type</label>
                        <select name="type" value={newItem.type} onChange={handleNewItemChange} className="w-full p-2 border rounded-md">
                            <option>3T Sliding Window</option><option>2T Sliding Window</option><option>Casement Window</option><option>Fixed Window</option><option>Bathroom Ventilation</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Width (ft)</label>
                        <input type="number" name="width" placeholder="e.g., 4" value={newItem.width} onChange={handleNewItemChange} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Height (ft)</label>
                        <input type="number" name="height" placeholder="e.g., 5" value={newItem.height} onChange={handleNewItemChange} className="w-full p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Quantity</label>
                        <input type="number" name="qty" value={newItem.qty} onChange={handleNewItemChange} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Profile Color</label>
                         <select name="profileColor" value={newItem.profileColor} onChange={handleNewItemChange} className="w-full p-2 border rounded-md">
                            <option>White</option><option>Dark Oak</option><option>Walnut</option><option>Grey</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Glass</label>
                         <select name="glass" value={newItem.glass} onChange={handleNewItemChange} className="w-full p-2 border rounded-md">
                            <option>5mm Clear</option><option>5mm Frosted</option><option>Bajri Glass</option><option>Double Glazed</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Mosquito Net</label>
                        <select name="mosquitoNet" value={newItem.mosquitoNet} onChange={handleNewItemChange} className="w-full p-2 border rounded-md">
                            <option>Yes</option><option>No</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Handle</label>
                        <select name="handle" value={newItem.handle} onChange={handleNewItemChange} className="w-full p-2 border rounded-md">
                            <option>Touch Lock</option><option>Cremone Handle</option><option>Espag Handle</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Rate (per sq.ft)</label>
                        <input type="number" name="rate" value={newItem.rate} onChange={handleNewItemChange} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Sq.ft</label>
                        <input type="text" readOnly value={sqft} className="w-full p-2 border rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Amount (₹)</label>
                        <input type="text" readOnly value={amount} className="w-full p-2 border rounded-md bg-gray-100" />
                    </div>
                    <div className="lg:col-span-3">
                        <label className="text-sm font-medium text-gray-600 block mb-1">Image (Optional)</label>
                        <div className="mt-2 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {newItem.image ? (
                                    <img src={newItem.image} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
                                ) : (
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button onClick={handleAddItem} className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-blue-700">
                            <Plus size={18} className="mr-2" /> Add Item
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Quotation Items</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-sm font-semibold text-gray-600">Shape</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Type</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Details</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Dimensions</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Sq.ft</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Rate</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-right">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200">
                                    <td className="p-3">
                                        <img 
                                            src={item.image || 'https://placehold.co/100x100/e2e8f0/e2e8f0?text=Shape'} 
                                            alt={item.type} 
                                            className="w-16 h-16 object-cover rounded-md bg-gray-200"
                                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/e2e8f0/e2e8f0?text=Shape'; }}
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-gray-800">{item.type}</td>
                                    <td className="p-3 text-gray-600 text-xs">
                                        Color: {item.profileColor}<br/>
                                        Glass: {item.glass}<br/>
                                        Net: {item.mosquitoNet}, Handle: {item.handle}
                                    </td>
                                    <td className="p-3 text-gray-600">{item.width} x {item.height} ft (Qty: {item.qty})</td>
                                    <td className="p-3 text-gray-800 text-right">{item.sqft}</td>
                                    <td className="p-3 text-gray-800 text-right">₹{item.rate}</td>
                                    <td className="p-3 text-gray-800 font-semibold text-right">₹{item.amount}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center p-8 text-gray-500">Add items to the quotation using the form above.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {items.length > 0 && (
                    <div className="flex justify-end mt-6">
                        <div className="w-full md:w-1/3">
                            <div className="flex justify-between py-2"><span className="text-gray-600">Subtotal:</span><span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between py-2"><span className="text-gray-600">GST (18%):</span><span className="font-semibold text-gray-800">₹{gst.toFixed(2)}</span></div>
                            <div className="flex justify-between py-2 border-t-2 border-gray-200 mt-2"><span className="text-lg font-bold text-gray-800">Total:</span><span className="text-lg font-bold text-gray-800">₹{total.toFixed(2)}</span></div>
                             <button className="w-full mt-4 bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700">Generate & Save Quotation</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}