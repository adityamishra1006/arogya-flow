import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            {/* Top Navigation */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
                <Link
                    to="/"
                    className="font-semibold hover:underline"
                >
                    Dashboard
                </Link>

                <Link
                    to="/doctors"
                    className="font-semibold hover:underline"
                >
                    Doctors
                </Link>
            </nav>

            {/* Page Content */}
            <main className="min-h-screen bg-gray-100">
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}

export default App;
