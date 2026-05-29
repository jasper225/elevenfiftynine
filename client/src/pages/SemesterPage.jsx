import React from "react";

export default function SemesterPage() { 
    return (
    <div className="semester-page p-8">
        <h1 className="text-3xl font-bold mb-6">Semester Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-600 text-white rounded-lg shadow">
                <h2 className="text-xl font-bold">Fall 2025</h2>
                <ul className="list-disc list-inside mt-4">
                    <li>ENG 101</li>
                    <li>CS 201</li>
                    <li>HIS 151</li>
                </ul>
            </div>
        </div>
    </div>
); 
}
