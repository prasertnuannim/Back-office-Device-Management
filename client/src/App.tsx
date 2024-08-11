import Login from "./layouts/Login";
import ManageDevices from "./layouts/ManageDevices";
import Register from "./layouts/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen bg">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manageDevices" element={<ManageDevices />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
