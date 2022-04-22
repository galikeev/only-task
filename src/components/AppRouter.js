import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";


const AppRouter = () => {
    const [login, setLogin] = useState(() => {
        return {
            email: '',
            password: '',
            isAuth: false,
            error: ''
        }
    })

    useEffect(() => {
        if (localStorage.getItem('email')) {
            setLogin((prev) => {
                return {
                    ...prev,
                    isAuth: true
                }
            })
        }
    }, [])

    const onSubmit = ({email, password}) => {
        if (email === 'steve.jobs@example.com' && password === 'password') {
            localStorage.setItem('email', email);
            setLogin(() => {
                return {
                    email: email,
                    password: password,
                    isAuth: true,
                    error: ''
                }
            })
            return Promise.resolve();
        }
        localStorage.removeItem('email');
        setLogin((prev) => {
            return {
                ...prev,
                error: `Пользователя ${email} не существует`
            }
        })
        const error = `Пользователя ${email} не существует`;
        return Promise.reject(error);
    };

    const logout = () => {
        localStorage.removeItem('email');
        setLogin(() => {
            return {
                email: '',
                password: '',
                isAuth: false
            }
        })
        return Promise.resolve();
    }


    return (
        <div className="container">
            <Routes>
                {!login.isAuth 
                    ? 
                    <>
                        <Route path="/login" element={<LoginPage onSubmit={onSubmit} error={login.error}/>}/>
                        <Route path='*' element={<Navigate to="/login" replace/>}/>
                    </> 
                    : 
                    <>
                        <Route path="/profile" element={<HomePage logout={logout} email={login.email}/>}/>
                        <Route path='*' element={<Navigate to="/profile" replace/>}/>
                    </>
                }
            </Routes>
        </div>
    );
};

export default AppRouter;