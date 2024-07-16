import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import NavBar from "./NavBar";
import UserDetails from "./UserDetails";
import SuccessPage from "./SuccessPage";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <main>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/success-page" element={<SuccessPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
