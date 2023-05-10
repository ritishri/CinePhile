import Header from "./components/Header";
import Cards from "./components/Cards";
import Addmovies from "./components/Addmovies";
import { Route,Routes } from "react-router-dom";
import Detail from "./components/Detail";
import { createContext,useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate=createContext();
function App() {
   const [login,setLogin]=useState(false);  //true not working
   const [userName,setUserName]=useState("");
  return (
    <Appstate.Provider value={{login , userName ,setUserName,setLogin}}>
     <div>
       <Header/>
        <Routes>
          <Route path="/addmovies" element={<Addmovies/>}/>
          <Route path="/" element={<Cards/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
       </Routes>
      </div>
    </Appstate.Provider>
  )
}

export default App;
export {Appstate}