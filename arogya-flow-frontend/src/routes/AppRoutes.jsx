import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx"
import Doctors from "../pages/Doctors.jsx"
import NotFound from "../pages/NotFound.jsx"

export default function AppRoutes(){
    return (
        <Routes>
            {/*Main Dashboard*/}
            <Route path="/" element={<Dashboard />} />

            {/*Doctors & OPD Units*/}
            <Route path="/doctors" element={<Doctors />} />

            {/*Go Back*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}