import { Route, Routes } from "react-router-dom";
import Layout from "../app/components/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";

const Routers = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Layout>
    );
};

export default Routers;
