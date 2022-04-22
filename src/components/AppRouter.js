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
                setTimeout(() => {
                    localStorage.setItem('email', email);
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
            }
            setTimeout(() => {
                localStorage.removeItem('email');
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
        } catch(e) {
            localStorage.removeItem('email');
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