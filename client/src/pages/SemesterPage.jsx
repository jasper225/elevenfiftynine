import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function SemesterPage() { 
    const navigate = useNavigate();
    const [semester, setSemester] = React.useState([
        { id: 'semester-1', name: 'Fall 2025', courses: ['ENG 101', 'CS 201', 'HIS 151'] },
        { id: 'semester-2', name: 'Spring 2026', courses: ['MATH 101', 'ENG 102', 'CS 301'] },
    ]);
    
    return (
    <div className="semester-page p-8">
      <h1 className="text-3xl font-bold mb-6">Semester Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semester.map((semester) => (
          <div
            key={semester.id}
            onClick={() => navigate(`/semester/${semester.id}`)}
            className="p-6 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700"
          >
            <h2 className="text-xl font-bold">{semester.name}</h2>
            <button className="text-sm mt-1 opacity-75">View courses</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/add-semester')}
        className="mt-8 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Semester
      </button>
    </div>
  );
}
