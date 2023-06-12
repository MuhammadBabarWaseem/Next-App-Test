import React, { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useRouter } from 'next/router';
import axios from 'axios';


function ForgotPassword() {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let routeToken = router.query

    const handleChange = (e) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }

        if (e.target.name === 'confirmPassword') {
            setConfirmPassword(e.target.value);
        }

        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
    };

    // const sendResetEmail = async (e) => {
    //     e.preventDefault();
    //     console.log(email)
    //     if (!email) {
    //         alert('Please enter your email address');
    //         return;
    //     }

    //     const data = {
    //         password,
    //         email,
    //         sendMail: true
    //     };

    //     try {
    //         const response = await axios.post('/api/forgotPass', data);

    //         if (response.data.success) {
    //             console.log('Password reset instructions have been sent to your email');
    //         } else {
    //             alert('User Not Found');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // const resetPassword = async () => {
    //     try {
    //         if (password === confirmPassword) {
    //             const data = {
    //                 password,
    //                 email,
    //                 sendMail: false,
    //             };

    //             const response = await axios.post('/api/forgotPass', data);
    //             if (response.data.success) {
    //                 console.log('Password has been changed successfully');
    //                 router.push('/login');
    //             } else {
    //                 console.log('Error');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    const sendResetEmail = async (e) => {
        e.preventDefault();
        console.log(email)
        localStorage.setItem('email', email);
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        const data = {
            email,
            sendMail: true
        };

        try {
            const response = await axios.post('/api/forgotPass', data);

            if (response.data.success === true) {
                console.log('Password reset instructions have been sent to your email');
            } else if (response.data.success === false) {
                alert('Issue In API URL')
            }
            else {
                alert('User Not Found');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetPassword = async () => {
        if (password === confirmPassword) {
            const data = {
                email: localStorage.getItem('email'),
                password,
                confirmPassword,
                sendMail: false,
                token : routeToken
            };


            try {
                const response = await axios.post('/api/forgotPass', data);
                if (response.data.success) {
                    alert('Password has been changed successfully');
                    router.push('/login');
                } else {
                    console.log('Error');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Password Not Matched')
        }
    };


    return (
        <div className="flex h-screen bg-blue-500">
            <div className="m-auto bg-slate-50 rounded-md w-4/5">
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        <section className="w-3/4 mx-auto flex flex-col gap-10">
                            <div className="title">
                                <h1 className="text-gray text-4xl font-bold py-4">Forgot Password</h1>
                                <p className="w-3/4 mx-auto text-gray-400">Enter the Email that is already registered</p>
                            </div>

                            {router.query.token && (
                                <div>
                                    <div className="flex border rounded-xl relative">
                                        <input
                                            value={password}
                                            onChange={handleChange}
                                            className="w-full py-4 px-6 rounded-xl bg-slate-50 focus:outline-none border-none peer"
                                            type={`${show ? 'text' : 'password'}`}
                                            name="password"
                                            placeholder="New Password"
                                        />
                                        <span
                                            className="icon flex items-center px-4 peer-focus:text-blue-500 hover:cursor-pointer hover:text-blue-500"
                                            onClick={() => setShow(!show)}
                                        >
                                            {' '}
                                            <HiFingerPrint size={25} />{' '}
                                        </span>
                                    </div>
                                    <br />

                                    <div className="flex border rounded-xl relative">
                                        <input
                                            value={confirmPassword}
                                            onChange={handleChange}
                                            className="w-full py-4 px-6 rounded-xl bg-slate-50 focus:outline-none border-none peer"
                                            type={`${show ? 'text' : 'password'}`}
                                            name="confirmPassword"
                                            placeholder="Confirm New Password"
                                        />
                                        <span
                                            className="icon flex items-center px-4 peer-focus:text-blue-500 hover:cursor-pointer hover:text-blue-500"
                                            onClick={() => setShow(!show)}
                                        >
                                            {' '}
                                            <HiFingerPrint size={25} />{' '}
                                        </span>
                                    </div>
                                    <br />

                                    <div>
                                        <button
                                            onClick={resetPassword}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
                                            type="submit"
                                        >
                                            Continue
                                        </button>
                                    </div>

                                    {password !== confirmPassword && <span className="text-red-500">Password and Confirm Password do not match</span>}
                                    {password && password === confirmPassword && <span className="text-green-500">Password Matched</span>}
                                </div>
                            )}

                            {!router.query.token && (
                                <form className="flex flex-col gap-5">
                                    <div className="flex border rounded-xl relative">
                                        <input
                                            value={email}
                                            onChange={handleChange}
                                            className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                        />
                                        <span className="icon flex items-center px-4 peer-focus:text-blue-500">
                                            {' '}
                                            <HiAtSymbol size={25} />
                                        </span>
                                    </div>

                                    <div>
                                        <button
                                            onClick={sendResetEmail}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
                                            type="submit"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
