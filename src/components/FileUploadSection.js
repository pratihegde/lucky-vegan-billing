import React, { useState } from 'react';

const FileUploadSection = ({ onFileProcess }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file) => {
        if (file) {
            onFileProcess(file);
        }
    };

    return (
        <div className="mb-8">
            <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center
                    ${isDragging ? 'border-amber-500 bg-amber-50' : 'border-gray-300'}
                    transition-colors duration-200`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    handleFile(file);
                }}
            >
                <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <p className="mb-2 text-amber-800">Drag and drop your Excel file here, or</p>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="inline-block px-4 py-2 bg-amber-600 text-white rounded cursor-pointer hover:bg-amber-700 transition-colors duration-200"
                >
                    Browse Files
                </label>
            </div>
        </div>
    );
};

export default FileUploadSection;