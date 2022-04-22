import { Route, Routes, Navigate } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";


const AppRouter = () => {

    const isLogged = false;

    return (
        <>
            <div className="container">
                <Routes>
                    {isLogged 
                        ? 
                        <>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path='*' element={<Navigate to="/login" replace/>}/>
                        </> 
                        : 
                        <>
                            <Route path="/profile" element={<HomePage/>}/>
                            <Route path='*' element={<Navigate to="/profile" replace/>}/>
                        </>
                    }
                </Routes>
            </div>
        </>
    );
};

export default AppRouter;