import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';

// IMPORTANT: These global variables are provided by the environment.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable Firestore logging for debugging
setLogLevel('debug');

// Sign in the user
const authenticate = async () => {
  try {
    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
      console.log("Authenticated with custom token.");
    } else {
      await signInAnonymously(auth);
      console.log("Authenticated anonymously.");
    }
  } catch (error) {
    console.error("Firebase authentication failed:", error);
  }
};

authenticate();

// Export the necessary services
export { db, auth };


// --- src/pages/Settings.js ---
// This is the new Settings page.
// *** THIS FILE HAS BEEN UPDATED ***

import React, { useState, useEffect } from 'react';
import { Building, Percent } from 'lucide-react';
import { db, auth } from '../firebase'; // <-- Import Firebase services
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// IMPORTANT: This global variable is provided by the environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

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
    const [status, setStatus] = useState(''); // To show save status

    // Effect to load settings from Firestore in real-time
    useEffect(() => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const docRef = doc(db, `/artifacts/${appId}/users/${userId}/settings`, 'companyDetails');
            
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    console.log("Settings data loaded from Firestore:", docSnap.data());
                    setSettings(docSnap.data());
                } else {
                    console.log("No settings document found. Using defaults.");
                }
            }, (error) => {
                console.error("Error listening to settings document:", error);
            });

            // Cleanup listener on component unmount
            return () => unsubscribe();
        }
    }, [auth.currentUser]); // Re-run if the user changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        if (!auth.currentUser) {
            alert("You must be logged in to save settings.");
            return;
        }
        setStatus('Saving...');
        const userId = auth.currentUser.uid;
        const docRef = doc(db, `/artifacts/${appId}/users/${userId}/settings`, 'companyDetails');
        
        try {
            await setDoc(docRef, settings, { merge: true });
            console.log("Settings successfully saved to Firestore.");
            setStatus('Saved!');
            setTimeout(() => setStatus(''), 2000); // Clear status message after 2 seconds
        } catch (error) {
            console.error("Error saving settings to Firestore:", error);
            setStatus('Error saving.');
            alert("Failed to save settings. See console for details.");
        }
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
                
                <div className="flex justify-end items-center space-x-4">
                    {status && <span className="text-gray-600">{status}</span>}
                    <button 
                        onClick={handleSaveChanges}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                        disabled={status === 'Saving...'}
                    >
                        {status === 'Saving...' ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
