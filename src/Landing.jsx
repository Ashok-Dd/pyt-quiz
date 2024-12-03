import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Landing = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false)
    



    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            alert("Please enter both name and email.");
            return;
        }
        setLoading(true)
        try {
            const response = await fetch('https://pyt-quiz-backend.onrender.com/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message)
                setIsOtpSent(true);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
        finally{
            setLoading(false)
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }
        setLoading(true)

        try {
            const response = await fetch('https://pyt-quiz-backend.onrender.com/verify-otp', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();

            if (response.ok) {
                setIsOtpVerified(true);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("email", email);
                navigate('/quiz'); 
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {

        }
        finally{
            setLoading(false)
        }
    };

    return (
        <div className="w-full h-screen flex flex-col gap-20 items-center justify-center bg-gray-100">
            <h1 className="text-3xl md:text-5xl lg:text-7xl text-red-500 font-serif">Welcome to Quiz Game</h1>

            {!isOtpSent ? (
                <form onSubmit={handleRegistration} className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center gap-5 justify-center lg:max-w-[25%] p-5 bg-white rounded-lg shadow-lg">
                    <label htmlFor="name" className="text-2xl font-serif text-red-500">Name:</label>
                    <input
                        type="text"
                        value={name}
                        className="border border-black text-2xl pl-2"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="text-2xl font-serif text-red-500">Email:</label>
                    <input
                        type="email"
                        value={email}
                        className="border border-black text-2xl pl-2"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-red-400 p-2 flex justify-center items-center  ring-2 ring-red-100 text-white font-serif text-xl rounded-lg w-[50%]">
                    {loading ? (
                        <>
                        <div className="w-6 h-6  border-t border-t-2 animate-spin rounded-full "></div>
                        </>
                    ): "Get OTP"}
                    </button>
                </form>
            ) : !isOtpVerified ? (
                <form onSubmit={handleOtpVerification} className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center gap-5 justify-center lg:max-w-[25%] p-5 bg-white rounded-lg shadow-lg">
                    <label htmlFor="otp" className="text-2xl font-serif text-red-500">Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        className="border border-black text-2xl pl-2"
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-green-400 ring-2 p-2 ring-green-100 text-white flex items-center justify-center font-serif text-xl rounded-lg w-[50%]">
                        { loading ? (
                            <>
                                <div className="w-6 h-6  border-t border-t-2 animate-spin rounded-full "></div>

                            </>
                        ):'Verify OTP'}
                    </button>
                </form>
            ) : (
                <div className="text-2xl font-serif text-green-500">OTP Verified! Redirecting...</div>
            )}
        </div>
    );
};

export default Landing;
