import { useEffect , useState } from "react"
import { useName } from "./NameContext";
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
    const {name , setName} = useName()
    const [timer , setTimer] = useState(300);
    const [instructions , setInstructions] = useState(true)
    const [timeCompleted , setTimecompleted] = useState(false)
    const [qno , setQno] = useState(0) ;
    const [shuffled , setShuffled] = useState([])
    const [cnfSubmit , setCnfSubmit] = useState(false)
    const [marks , setMarks] = useState(0);
    const [userAnswers , setUserAnswers] = useState({})
    const [isSubmitted , setIsSubmitted] = useState(false)

    const navigate = useNavigate()
        useEffect(() => {
            if(instructions || timer === 0){
                return ;
            }
            const timerId = setInterval(() => {
                setTimer((prev) => prev - 1)
            } , 1000)

            return () => clearInterval(timerId)
        } , [instructions , timer])
    
    
    
        const email = sessionStorage.getItem("email")
    

    useEffect(() => {
        const storedName = sessionStorage.getItem('name');
        if(storedName){
            setName(storedName)
        }
        else{
            navigate('/')
        }
        
    } , [setName , navigate])    


    const QuestionsArray = [
        {
            ques: "What does the `len()` function do in Python?",
            op1: "Returns the length of an object",
            op2: "Converts a string to a list",
            op3: "Checks if an object is empty",
            op4: "Returns the data type of an object",
            ans: "1"
        },
        {
            ques: "Which of the following is a mutable data type in Python?",
            op1: "Tuple",
            op2: "List",
            op3: "String",
            op4: "Set",
            ans: "2"
        },
        {
            ques: "How can you create a dictionary in Python?",
            op1: "d = {}",
            op2: "d = []",
            op3: "d = ()",
            op4: "d = set()",
            ans: "1"
        },
        {
            ques: "Which of the following will raise an error?",
            op1: "a = 5 / 2",
            op2: "a = 5 // 2",
            op3: "a = 5 / 0",
            op4: "a = 5 * 2",
            ans: "3"
        },
        
        {
            ques: "What is the output of `print(2 ** 3)`?",
            op1: "5",
            op2: "6",
            op3: "8",
            op4: "Error",
            ans: "3"
        },
        
        {
            ques: "What does the `map()` function do in Python?",
            op1: "Applies a function to all items in an iterable",
            op2: "Filters the items in an iterable",
            op3: "Joins all items in an iterable",
            op4: "Sorts the items in an iterable",
            ans: "1"
        },
        {
            ques: "How can you add an item to a list in Python?",
            op1: "list.add(item)",
            op2: "list.append(item)",
            op3: "list.insert(item)",
            op4: "list.put(item)",
            ans: "2"
        },
        {
            ques: "Which of the following is used to handle exceptions in Python?",
            op1: "try",
            op2: "except",
            op3: "finally",
            op4: "All of the above",
            ans: "4"
        },
        {
            ques: "What is the correct syntax to create a class in Python?",
            op1: "class MyClass()",
            op2: "class MyClass:",
            op3: "def MyClass():",
            op4: "class MyClass{}",
            ans: "2"
        },
        {
            ques: "What is the purpose of the `self` keyword in Python?",
            op1: "Refers to the instance of the class",
            op2: "Refers to a variable",
            op3: "Defines a function",
            op4: "Defines the constructor",
            ans: "1"
        },
        
        {
            ques: "What is the default return value of a function in Python if no return statement is provided?",
            op1: "None",
            op2: "0",
            op3: "False",
            op4: "Empty string",
            ans: "1"
        },
        {
            ques: "Which of the following methods can be used to remove an element from a set in Python?",
            op1: "remove()",
            op2: "del()",
            op3: "pop()",
            op4: "All of the above",
            ans: "4"
        },
        {
            ques: "How do you convert a string to lowercase in Python?",
            op1: "lowercase()",
            op2: "toLower()",
            op3: "lower()",
            op4: "convert()",
            ans: "3"
        },
        {
            ques: "What is the difference between `==` and `is` in Python?",
            op1: "`==` checks if two objects have the same value, `is` checks if they are the same object in memory",
            op2: "`==` checks if two objects are of the same type, `is` checks if they have the same value",
            op3: "`==` checks if two objects have the same reference, `is` checks if they are equal",
            op4: "`==` checks for identity, `is` checks for equality",
            ans: "1"
        },
        {
            ques: "Which of the following statements is true about Python functions?",
            op1: "Functions cannot have default arguments",
            op2: "Functions cannot return multiple values",
            op3: "Functions are defined using the `def` keyword",
            op4: "Functions can only return one value",
            ans: "3"
        },
        {
            ques: "How can you check the type of an object in Python?",
            op1: "typeOf()",
            op2: "getType()",
            op3: "type()",
            op4: "isType()",
            ans: "3"
        },
        {
            ques: "What will `list([1, 2, 3])` return?",
            op1: "A string",
            op2: "A set",
            op3: "A list",
            op4: "A tuple",
            ans: "3"
        },
        {
            ques: "How can you create a set in Python?",
            op1: "set()",
            op2: "list()",
            op3: "tuple()",
            op4: "dict()",
            ans: "1"
        },
        {
            ques: "What is the output of `print(10 // 3)`?",
            op1: "3",
            op2: "3.33",
            op3: "4",
            op4: "Error",
            ans: "1"
        },
        {
            ques: "Which of the following operators is used to check equality in Python?",
            op1: "==",
            op2: "=",
            op3: "===",
            op4: "equals()",
            ans: "1"
        },
        {
            ques: "What is the purpose of the `filter()` function in Python?",
            op1: "Filters a sequence based on a given function",
            op2: "Adds a condition to a sequence",
            op3: "Converts a sequence into a dictionary",
            op4: "Finds the sum of a sequence",
            ans: "1"
        },
        {
            ques: "What is the output of `print(3 > 2 > 1)`?",
            op1: "True",
            op2: "False",
            op3: "Syntax Error",
            op4: "None",
            ans: "1"
        },
        {
            ques: "What does the `zip()` function do in Python?",
            op1: "Zips two sequences into a dictionary",
            op2: "Zips two sequences into a tuple",
            op3: "Zips two sequences into a list",
            op4: "Zips two sequences into a set",
            ans: "3"
        },
        {
            ques: "Which of the following is the correct syntax for a for loop in Python?",
            op1: "for i in range(5):",
            op2: "for i: range(5):",
            op3: "for i = 0 to 5:",
            op4: "for i from 0 to 5:",
            ans: "1"
        },
        {
            ques: "How can you reverse a list in Python?",
            op1: "list.reverse()",
            op2: "list[::-1]",
            op3: "reverse(list)",
            op4: "Both 1 and 2",
            ans: "4"
        }
    ];
     

    useEffect(() => {
        SuffleQuestions()
    } ,[])
    
    const SuffleQuestions = () => {
        const randomQues = [...QuestionsArray].sort(() => Math.random() - 0.5)

        setShuffled(randomQues)
    }

    const HandleNext = () => {
        if (qno < shuffled.length - 1) {
            setQno((prev) => prev + 1);
        } else {
            setCnfSubmit(true)
        }
    }
    const HandlePrev = () => {
        if (qno === 0) {
            return ;
        }
        setQno(prev => prev - 1)
    }

    const calculateScore = () => {
        let score = 0 ;
        shuffled.forEach((question , index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer === question.ans) {
                score += 4; 
            } else if (userAnswer && userAnswer !== question.ans) {
                score -= 1; 
            }
        })
        setMarks(score);
        sessionStorage.setItem("marks" , score);
    }

    const HandleOptionsChange = (index , value) => {
        setUserAnswers((prev) => ({
            ...prev , 
            [index] : value ,
        }))
    }

    const HandleCloseInstructions = () => {
        setInstructions(false)
    }

    

    useEffect(() => {
        if (timer === 0) {
            setTimecompleted(true);
            calculateScore()
            navigate('/result')
        }
    }, [timer]);

    useEffect(() => {
        if(timeCompleted){
            calculateScore()
            navigate('/result')
        }
    } , [timeCompleted , navigate])
    
    
    const HandleCloseCnfSubmit = () => {
        setCnfSubmit(false)
    }


    const HandleNavResults = () => {
        calculateScore()
        setIsSubmitted(true)
        setTimecompleted(true)
        navigate('/result')
    }
    const HandleSubmit = () => {
        setCnfSubmit(true)
    }

    useEffect(() => {
        checkStatus();
        if(isSubmitted){
            navigate('/result')
        }
    })

    

    const checkStatus = async () => {
        try {
          const response = await fetch("http://localhost:9000/check-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
          });
    
          const data = await response.json();
    
          if (data.success) {
            setIsSubmitted(data.isSubmitted); // Set the isSubmitted state based on the response
          } else {

        }
        } catch (error) {
            setMessage("Error occurred while checking submission status.");
        }
      };

    
    return(
        <>


            
            <div className="flex w-full h-screen items-center justify-center bg-sky-500 relative"  >
            <span className="absolute top-5 right-5 border border-white rounded-full w-4 h-4  flex items-center justify-center p-3 bg-white text-zinc-800 italic cursor-pointer font-serif " onClick={() => setInstructions(prev => !prev)}>i</span>
                <div className="w-full max-w-[90%] md:max-w-[75%] lg:max-w-[60%] h-auto relative  rounded-lg shadow-lg bg-sky-300 p-5 ">
                    <div className="flex justify-between items-center pl-4 pr-4">
                        <span className="text-xl">Question no : {qno + 1}</span>
                        <div className={`timer w-[50px] h-[50px] border  border-sky-800 font-bold text-white  shadow-lg border-4 text-xl rounded-full flex items-center justify-center 
                                bg-black
                                `}>
                            <span className={`${timer > 150
                                    ? "text-green-500"
                                    : timer > 30
                                    ? "text-yellow-500"
                                    : "text-red-500"}
                                `}>{timer}</span>
                            
                        </div>
                        
                    </div>
                    <div className="h-auto ">
                    {
                        shuffled.length > 0 && shuffled[qno] && (

                            <form className="text-2xl flex flex-col gap-12">
                                <label htmlFor="question" className="text-center">{shuffled[qno].ques}</label>
                                <div className="border-b border-black flex">
                                    <input type="radio" id="option1" name="question" value="1" style={{width:'20px' , height:'20px' }} className="" checked={userAnswers[qno] === "1"} onChange={() => HandleOptionsChange(qno , '1')} />
                                    <label htmlFor="option1" className=" pl-3 flex flex-1 ">{shuffled[qno].op1}</label>
                                </div>
                                <div className="border-b border-black flex">
                                    <input type="radio" id="option2" name="question" value="2" style={{width:'20px' , height:'20px'}} checked={userAnswers[qno] === "2"} onChange={() => HandleOptionsChange(qno , '2')}/>
                                    <label htmlFor="option2" className=" pl-3 flex flex-1">{shuffled[qno].op2}</label>
                                </div>
                                <div className="border-b border-black flex ">
                                    <input type="radio" id="option3" name="question" value="3" style={{width:'20px' , height:'20px'}} checked={userAnswers[qno] === "3"} onChange={() => HandleOptionsChange(qno , '3')}/>
                                    <label htmlFor="option3" className=" pl-3 flex flex-1 ">{shuffled[qno].op3}</label>
                                </div>
                                <div className="border-b border-black flex">
                                    <input type="radio" id="option4" name="question" value="4" style={{width:'20px' , height:'20px'}} checked={userAnswers[qno] === "4"} onChange={() => HandleOptionsChange(qno , '4')}/>
                                    <label htmlFor="option4" className=" pl-3 flex flex-1 ">{shuffled[qno].op4}</label>
                                </div>
                            </form>
                        )
                    }
                    </div>
                    <div className="flex mt-12 justify-around items-center w-full">
                        <button className="border w-[30%] p-1 text-2xl rounded-lg shadow-lg bg-red-500 text-white hover:bg-red-600 hover:ring-2 hover:ring-red-500" onClick={HandlePrev }>  Prev</button>
                        <button className="border w-[30%] p-1 text-2xl rounded-lg shadow-lg bg-green-500 text-white hover:bg-green-600 hover:ring-2 hover:ring-green-500" onClick={qno === shuffled.length - 1 ? HandleSubmit : HandleNext}>{qno === shuffled.length - 1 ? "Submit" : "Next"}</button> 
                    </div>
                </div>
            </div>





            {instructions && (
                <div className="fixed inset-0 w-full h-screen bg-opacity-50 z-50  flex bg-black items-center justify-center">
                <div className="bg-white p-8 flex flex-col gap-5 rounded-lg shadow-lg text-center relative">
                    <span className="absolute top-0 right-0 cursor-pointer hover:bg-red-100  rounded-full w-6 h-6 flex items-center justify-center" onClick={HandleCloseInstructions}>x</span>
                    <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                    <i className="text-xl">Hello {name}...</i>
                    <h3 className="mb-4">Here are the instructions for the quiz. Read them carefully before starting.</h3>
                    <b>You have only 5 minutes to complete this quiz</b>
                    <h1>Total Questions : {shuffled.length}</h1>
                    <b>Total marks : {shuffled.length * 4}</b>
                    <p>All the questions are multiple choice questions .</p>
                    <p>
                        <ul>
                            <li>Correct Answer : <span className="text-green-500">4 Marks</span></li>
                            <li>Wrong Answer : <span className="text-red-500">-1 Marks</span></li>
                            <li>Unattempted : <span className="text-slate-500">0 Marks</span></li>

                        </ul>
                    </p>
                    
                </div>
                </div>
            )}

            {
                cnfSubmit && (
                    <>
                        <div className="fixed inset-0 w-full h-screen bg-opacity-50 z-50 text-2xl flex bg-black items-center justify-center">
                        <div className="bg-white p-8 flex flex-col gap-5 rounded-lg shadow-lg text-center relative">
                            <p>Are you sure to submit the Quiz .</p>
                            <div className="flex gap-10 text-xl">
                                <button className="w-[40%] bg-red-400 hover:bg-red-500 rounded-lg shadow-lg p-2"onClick={HandleCloseCnfSubmit}>Cancel</button>
                                <button className="w-[40%] bg-green-400 hover:bg-green-500 rounded-lg shadow-lg p-2" onClick={HandleNavResults}>Submit</button>
                            </div>
                        </div>
                        </div>
                    </>
                )
            }





        </>
    )
}

export default Quiz