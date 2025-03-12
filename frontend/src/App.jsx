import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import VerifyAccount from "./pages/VerifyAccount";
import AddPatient from "./pages/AddPatient";
import AllPatientsRecords from "./pages/AllPatientsRecords";
import PatientReport from "./components/PatientReport";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import PatientSummary from "./pages/PatientSummary";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/users/user-profile" element={<UserProfile />} />
        <Route path="/users/edit-profile" element={<EditProfile />} />
        <Route path="/patients/add-patient" element={<AddPatient />} />
        <Route path="/patients/view-records" element={<AllPatientsRecords />} />
        <Route path="/patients/:patientId" element={<PatientReport />} />
        <Route path="/patients/summary" element={<PatientSummary />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer autoClose={2000} theme="light" position="top-center" />
      <Footer />
    </Router>
  );
};

export default App;
