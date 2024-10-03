import {   Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DeveloperLayout() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <div className="developer-layout">
                
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}
