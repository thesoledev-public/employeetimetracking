import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGrid, FiSettings, FiMenu, FiX } from 'react-icons/fi'; // Assuming you're using react-icons

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiGrid, current: true },
    { name: 'Settings', href: '/settings', icon: FiSettings, current: false },
    // Add more navigation items here
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-gray-800 p-5 pt-4 relative duration-300`}>
            {/* Toggle button with conditional icon */}
            <div className="absolute cursor-pointer -right-9 top-1 bg-gray-800 py-4 px-3">
                <FiMenu className="text-white cursor-pointer" onClick={toggleSidebar} size={24} />
            </div>          
            <img
                src={`${isOpen ? '/assets/images/logo.png' : '/assets/images/logo-icon.png'}`}
                className="cursor-pointer mb-5"
                alt="Logo"
            />
            <nav className="flex-1 space-y-1" aria-label="Sidebar">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                        )}
                    >
                        <item.icon className={`h-6 w-6 ${isOpen ? 'mr-3' : 'mx-auto'}`} aria-hidden="true" />
                        {isOpen && item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
