const Sample = () => {
    const arr = [
        {
            name : "Ashok"
        },
        {
            name : "Ashok2"
        },
        {
            name : "Ashok3"
        },
    ]

        const HandleSuffle = () => {
            const arr2 = [...arr].sort(() => Math.random() - 0.5)
            console.log(arr2);
            return arr2
        }

     return (
        <>
               <button onClick={HandleSuffle}>Shuffle</button>
            <ul>
                {arr.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </>
     )
}
export default Sample