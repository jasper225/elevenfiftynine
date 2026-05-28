import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([
    { id: 'course-1', name: 'MATH 101' },
    { id: 'course-2', name: 'ENG 202' },
    { id: 'course-3', name: 'CS 301' },
  ]);

  return (
    <div className="dashboard-page p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="p-6 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700"
          >
            <h2 className="text-xl font-bold">{course.name}</h2>
            <button className="text-sm mt-1 opacity-75">View assignments</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/add-course')}
        className="mt-8 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Course
      </button>
    </div>
  );
}
