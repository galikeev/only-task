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
            error: '',
            disabledBtn: false
        }
    })

    useEffect(() => {
        if (localStorage.getItem('email')) {
            setLogin((prev) => {
                return {
                    ...prev,
                    email: localStorage.getItem('email'),
                    isAuth: true
                }
            })
        }
    }, [])

    const onSubmit = async ({email, password}) => {
        setLogin((prev) => {
            return {
                ...prev,
                disabledBtn: true
            }
        })
        try {
            if (email === 'steve.jobs@example.com' && password === 'password') {
                localStorage.setItem('email', email);
                setTimeout(() => {
                    setLogin((prev) => {
                        return {
                            ...prev,
                            email: email,
                            password: password,
                            isAuth: true,
                            disabledBtn: false
                        }
                    })
                    return Promise.resolve();
                }, 1000)
            } else if (email === 'steve.jobs@example.com' && password !== 'password') {
                setTimeout(() => {
                    setLogin((prev) => {
                        return {
                            ...prev,
                            disabledBtn: false,
                            error: `Неверный пароль`
                        }
                    })
                    const error = `Неверный пароль`;
                    return Promise.reject(error);
                }, 1000)
            } else {
                setTimeout(() => {
                    setLogin((prev) => {
                        return {
                            ...prev,
                            disabledBtn: false,
                            error: `Пользователя ${email} не существует`
                        }
                    })
                    const error = `Пользователя ${email} не существует`;
                    return Promise.reject(error);
                }, 1000)
            }
        } catch(e) {
            localStorage.removeItem('email');
            console.log(e);
        }
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
                        <Route path="/login" element={<LoginPage onSubmit={onSubmit} error={login.error} disabledBtn={login.disabledBtn}/>}/>
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