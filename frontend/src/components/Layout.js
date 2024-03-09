import React from 'react';
import Sidebar from './Sidebar'; // Make sure the path to Sidebar is correct
import Header from './Header'; // Import the Header component


const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-2 sm:px-2 md:px-2 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
