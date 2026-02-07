import {Link} from "react-router-dom";

export default function NotFound(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-6xl font-bold text-gray-800"> 404</h1>
            <p className="mt-4 text-lg text-gray-600">
                Oops!! The page you're looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
                Go back to Dashboard
            </Link>
        </div>
    )
}