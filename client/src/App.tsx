import Login from "./layouts/Login";
import ManageDevices from "./layouts/ManageDevices";
import Register from "./layouts/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manageDevices" element={<ManageDevices />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-3xl font-bold text-red-500">Page Not Found</p>
    </div>
  );
}

export default App;
