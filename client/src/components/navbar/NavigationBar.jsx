import React from "react";


export default function NavigationBar() { 
    return <div className="p-4 bg-gray-800 text-white font-bold">
        <nav>
            <ul className="flex space-x-4">
                <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="/semesters" className="hover:underline">Semesters</a></li>
                <li><a href="/profile" className="hover:underline">Profile</a></li>
                <li><a href="/logout" className="hover:underline">Logout</a></li>
            </ul>
        </nav>
    </div>; 
}