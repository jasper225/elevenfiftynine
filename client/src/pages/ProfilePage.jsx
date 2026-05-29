import React from 'react';
import NavigationBar from '../components/navbar/NavigationBar';


const user = {
  username: 'John Doe',
  email: 'john.doe@example.com',
};

const courses = [
  { id: 'course-1', code: 'CS 101' },
  { id: 'course-2', code: 'CS 201' },
  { id: 'course-3', code: 'CS 301' },
];

export default function ProfilePage() { return (
    <div className="profile-page p-8">
        <NavigationBar />
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="mb-4">
            <h2 className="text-xl font-semibold">Username:</h2>
            <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-semibold">Email:</h2>
            <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
            <label for="semester">Choose a semester:</label>
            <select name="semester" id="semester">
            <option value="fall-2025">Fall 2025</option>
            <option value="spring-2026">Spring 2026</option>
            <option value="fall-2026">Fall 2026</option>
            <option value="spring-2027">Spring 2027</option>
            </select>
            <h2 className="text-xl font-semibold">Courses:</h2>
            <ul className="list-disc list-inside text-gray-700">
                {courses.map((course) => (
                    <li key={course.id}>{course.code}</li>
                ))}
            </ul>
        </div>
    </div>
); }
