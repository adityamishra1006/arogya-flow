import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Doctors from "../pages/Doctors.jsx";
import Slots from "../pages/Slots.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:doctorId/slots" element={<Slots />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
