import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download } from 'lucide-react';

const colorOptions = {
    'White': { main: '#FFFFFF', shadow: '#B0B0B0' },
    'Dark Oak': { main: '#8B4513', shadow: '#542a0b' },
    'Walnut': { main: '#5C4033', shadow: '#3b2920' },
    'Grey': { main: '#808080', shadow: '#505050' },
};

const WindowCanvas = ({ config }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const { width, height } = parent.getBoundingClientRect();
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const padding = 60;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;
        const aspectRatio = config.width / config.height;
        
        let drawWidth, drawHeight;
        if (availableWidth / availableHeight > aspectRatio) {
            drawHeight = availableHeight;
            drawWidth = drawHeight * aspectRatio;
        } else {
            drawWidth = availableWidth;
            drawHeight = drawWidth / aspectRatio;
        }

        const startX = (width - drawWidth) / 2;
        const startY = (height - drawHeight) / 2;
        const frameThickness = drawWidth * 0.05;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const getShapePath = () => {
            const w = drawWidth;
            const h = drawHeight;
            const x = startX;
            const y = startY;

            switch (config.shape) {
                case 'Triangle':
                    return [{ x: x + w / 2, y }, { x: x + w, y: y + h }, { x, y: y + h }];
                case 'Top Arch':
                    // Path: bottom-left -> top-left -> (arc) -> top-right -> bottom-right
                    return [
                        { x, y: y + h }, // bottom-left
                        { x, y: y + h / 2 }, // top-left-corner
                        { type: 'arc', x1: x + w / 2, y1: y, x2: x + w, y2: y + h / 2, radius: w / 2 },
                        { x: x + w, y: y + h }, // bottom-right
                    ];
                case 'Rectangle':
                default:
                    return [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
            }
        };

        const drawFrame = (path) => {
            const frameColor = colorOptions[config.profileColor];
            ctx.fillStyle = frameColor.main;
            ctx.strokeStyle = frameColor.shadow;
            ctx.lineWidth = frameThickness * 2;
            ctx.lineJoin = 'round';
            
            // Create clipping path for the glass
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                const segment = path[i];
                if (segment.type === 'arc') {
                    ctx.arcTo(segment.x1, segment.y1, segment.x2, segment.y2, segment.radius);
                } else {
                    ctx.lineTo(segment.x, segment.y);
                }
            }
            ctx.closePath();
            ctx.clip();
            
            // Draw glass background
            ctx.fillStyle = 'rgba(210, 225, 240, 0.7)';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            // Draw frame profiles
            const profiles = ['top', 'right', 'bottom', 'left'];
            if (config.shape === 'Triangle') profiles[0] = 'left_slope'; // Special handling for triangle
            
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            
            const segmentMap = {
                'Rectangle': ['top', 'right', 'bottom', 'left'],
                'Top Arch': ['left', 'top', 'right', 'bottom'],
                'Triangle': ['left_slope', 'right_slope', 'bottom']
            };

            const activeSegments = segmentMap[config.shape];
            const pathSegments = [path[path.length - 1], ...path];

            for (let i = 0; i < pathSegments.length - 1; i++) {
                const p1 = pathSegments[i];
                const p2 = pathSegments[i+1];
                const segmentName = activeSegments[i];
                
                if (config.profiles[segmentName] !== false) { // Check if profile is active
                    if (p2.type === 'arc') {
                        ctx.arcTo(p2.x1, p2.y1, p2.x2, p2.y2, p2.radius);
                    } else {
                        ctx.lineTo(p2.x, p2.y);
                    }
                } else {
                    if (p2.type === 'arc') {
                         ctx.moveTo(p2.x2, p2.y2);
                    } else {
                         ctx.moveTo(p2.x, p2.y);
                    }
                }
            }
            if(config.profiles.left !== false) ctx.closePath();
            
            ctx.stroke();
        };

        const drawDimensions = (path) => {
            ctx.font = '12px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const bounds = {
                minX: Math.min(...path.filter(p => !p.type).map(p => p.x)),
                maxX: Math.max(...path.filter(p => !p.type).map(p => p.x)),
                minY: Math.min(...path.filter(p => !p.type).map(p => p.y)),
                maxY: Math.max(...path.filter(p => !p.type).map(p => p.y)),
            };
            if(config.shape === 'Top Arch') {
                bounds.minY = path.find(p => p.type === 'arc').y1;
            }

            // Height
            ctx.beginPath();
            ctx.moveTo(bounds.minX - 20, bounds.minY);
            ctx.lineTo(bounds.minX - 15, bounds.minY);
            ctx.moveTo(bounds.minX - 20, bounds.maxY);
            ctx.lineTo(bounds.minX - 15, bounds.maxY);
            ctx.moveTo(bounds.minX - 17.5, bounds.minY);
            ctx.lineTo(bounds.minX - 17.5, bounds.maxY);
            ctx.strokeStyle = '#333';
            ctx.stroke();
            ctx.save();
            ctx.translate(bounds.minX - 25, bounds.minY + (bounds.maxY - bounds.minY) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(`H=${config.height}`, 0, 0);
            ctx.restore();

            // Width
            ctx.beginPath();
            ctx.moveTo(bounds.minX, bounds.minY - 20);
            ctx.lineTo(bounds.minX, bounds.minY - 15);
            ctx.moveTo(bounds.maxX, bounds.minY - 20);
            ctx.lineTo(bounds.maxX, bounds.minY - 15);
            ctx.moveTo(bounds.minX, bounds.minY - 17.5);
            ctx.lineTo(bounds.maxX, bounds.minY - 17.5);
            ctx.stroke();
            ctx.fillText(`W=${config.width}`, bounds.minX + (bounds.maxX - bounds.minX) / 2, bounds.minY - 25);
        };

        const path = getShapePath();
        drawFrame(path);
        drawDimensions(path);

    }, [config]);

    return <canvas ref={canvasRef} />;
};

export default function WindowDesigner({ setCurrentPage }) {
    const [config, setConfig] = useState({
        width: 1200,
        height: 1500,
        shape: 'Rectangle',
        type: '2-Track',
        sashes: 2,
        profileColor: 'Dark Oak',
        glassType: 'Clear',
        profiles: { top: true, bottom: true, left: true, right: true, left_slope: true, right_slope: true },
    });

    const handleConfigChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("profile_")) {
            const profileName = name.split("_")[1];
            setConfig(prev => ({ ...prev, profiles: { ...prev.profiles, [profileName]: checked }}));
        } else {
            setConfig(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) : value)
            }));
        }
    };
    
    return (
        <div className="container mx-auto">
            <button onClick={() => setCurrentPage('Dashboard')} className="flex items-center text-sm text-blue-600 hover:underline mb-4">
                <ArrowLeft size={16} className="mr-1" />
                Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Window Designer</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Properties</h2>
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Shape</label>
                            <select name="shape" value={config.shape} onChange={handleConfigChange} className="w-full p-2 border rounded-md">
                                <option>Rectangle</option>
                                <option>Top Arch</option>
                                <option>Triangle</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Width (mm)</label>
                            <input type="number" name="width" value={config.width} onChange={handleConfigChange} className="w-full p-2 border rounded-md" />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Height (mm)</label>
                            <input type="number" name="height" value={config.height} onChange={handleConfigChange} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Profile Color</label>
                            <select name="profileColor" value={config.profileColor} onChange={handleConfigChange} className="w-full p-2 border rounded-md">
                                {Object.keys(colorOptions).map(color => <option key={color} value={color}>{color}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-1">Frame Profiles</label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <label className="flex items-center space-x-2"><input type="checkbox" name="profile_top" checked={config.profiles.top} onChange={handleConfigChange} /><span>Top</span></label>
                                <label className="flex items-center space-x-2"><input type="checkbox" name="profile_bottom" checked={config.profiles.bottom} onChange={handleConfigChange} /><span>Bottom</span></label>
                                <label className="flex items-center space-x-2"><input type="checkbox" name="profile_left" checked={config.profiles.left} onChange={handleConfigChange} /><span>Left</span></label>
                                <label className="flex items-center space-x-2"><input type="checkbox" name="profile_right" checked={config.profiles.right} onChange={handleConfigChange} /><span>Right</span></label>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-green-700 flex items-center justify-center">
                        <Download size={18} className="mr-2"/> Use in Quotation
                    </button>
                </div>
                <div className="lg:col-span-2 bg-gray-200 p-2 rounded-xl shadow-inner flex items-center justify-center">
                   <WindowCanvas config={config} />
                </div>
            </div>
        </div>
    );
}