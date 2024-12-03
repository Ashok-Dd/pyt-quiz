import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const Results = () => {
    const [showLB, setShowLB] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const marks = parseInt(sessionStorage.getItem("marks"), 10);

    useEffect(() => {
        if(!email){
            navigate('/')
        }
    } , [])


   

    
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('https://pyt-quiz-backend.onrender.com/leaderboard');
                const data = await response.json();
                setUsers(data);
            } catch (error) {

            }
        };

        fetchLeaderboard();
    }, []);

    useEffect(() => {
        const saveMarks = async () => {
            try {
                const response = await fetch('https://pyt-quiz-backend.onrender.com/save-marks', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, marks })
                });

                
            } catch (error) {

            }
        };

        saveMarks();
    }, [email, marks]);

    const handleLeaderboardToggle = () => {
        setShowLB(prev => !prev);
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center gap-10 justify-center bg-gradient-to-b from-sky-400 to-blue-500">
                <div className="border border-gray-300 shadow-lg rounded-lg w-full max-w-[90%] md:max-w-[70%] lg:max-w-[40%] bg-white text-center p-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800"> 🎉 Congratulations {name.charAt(0).toUpperCase() + name.slice(1)}! 🎉</h1>
                    <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-700">You have scored <span className={`${marks > 0 ? "text-green-500" : "text-red-500"} text-3xl font-bold`}>{marks}</span> marks.</p>
                    <div className="mt-6">
                        <button className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-full shadow-md transition duration-100" onClick={handleLeaderboardToggle}>
                            Show Leaderboard
                        </button>
                    </div>
                </div>
            </div>

            {showLB && (
                <div className="fixed inset-0 bg-opacity-50  bg-black flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] md:w-[70%] lg:w-[50%] rounded-lg shadow-lg relative">
                        <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-3 rounded-t-lg">
                            <h2 className="text-xl font-bold">Leaderboard</h2>
                            
                        </div>
                        <button className="absolute top-[0px] right-0 hover:bg-red-400 hover:text-white rounded-full w-6 h-6 flex justify-center items-center " onClick={handleLeaderboardToggle}><span className="text-red-400 font-bold text-2xl mb-2 hover:text-white w-full">x</span></button>

                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            <table className="table-auto w-full bg-white">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="px-4 py-2">Rank</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                        >
                                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border px-4 py-2">{user.name}</td>
                                            <td className="border px-4 py-2">{user.email}</td>
                                            <td className="border px-4 py-2 text-center">{user.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Results;
