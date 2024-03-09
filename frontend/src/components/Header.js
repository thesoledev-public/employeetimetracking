import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Header = ({ isOpen }) => {
    const userData = useUser();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown

    // Toggle dropdown visibility
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className={`bg-gray-800 text-white shadow w-full ${isOpen ? 'pl-64' : 'pl-20'} transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">
                <div className="py-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center relative">
                        {/* Clickable area for toggling the dropdown */}
                        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-500 flex uppercase items-center justify-center text-sm font-bold mr-2">
                                {userData && userData.profileImage ? (
                                    <img src={userData.profileImage} alt="Profile" />
                                ) : (
                                    <span>{userData && userData.username ? userData.username[0] : 'U'}</span>
                                )}
                            </div>
                            <div className="flex flex-col mr-3">
                                <span className="font-bold capitalize">{userData ? userData.username : 'Loading...'}</span>
                                <span className="text-xs">{userData && userData.role}</span>
                            </div>
                        </div>
                        {/* Dropdown menu */}
                        {showDropdown && (
                            <div className="origin-top-right absolute right-0 top-11 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50" ref={dropdownRef}>
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

