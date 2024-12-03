import Landing from "./Landing"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./quiz"
import { NameProvider } from "./NameContext"
import Sample from "./sample";
import Results from "./marks";
const App = () => {
  return (
    <NameProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/result' element={<Results/>}/>

        </Routes>
      </BrowserRouter>
    </NameProvider>

  )
}
export default App