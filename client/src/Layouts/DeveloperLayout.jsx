import {   Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DeveloperLayout() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <div className="developer-layout">
                <header>
                    <nav>
                        <h1>DeveloperLayout.. Remove this later</h1>

                     
                    </nav>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}
