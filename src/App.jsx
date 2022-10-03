import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminRoutes from "./components/AdminRoutes";

import { PageNotFound } from "./components/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectToHome from "./components/RedirectToHome";
import { UserContext } from "./context/user/userContext";
import BestClients from "./pages/admin/BestClients";
import BestSellers from "./pages/admin/BestSellers";

import Clients from './pages/Clients'
import NewClient from "./pages/create/newclient";
import NewOrder from "./pages/create/Neworder";
import NewProduct from "./pages/create/newproduct";
/* import Neworder from "./pages/create/Neworder"; */
import EditClient from "./pages/edit/EditClient";
import EditProduct from "./pages/edit/EditProduct";
import Login from "./pages/Login";
import Orders from "./pages/Orders.jsx";
import Products from './pages/Products'
import Register from "./pages/Register";
function App() {

  const { user } = useContext(UserContext);

  return (

    < BrowserRouter >
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/"  >
            <Route path="/" element={<Clients />} />
            <Route path="/edit-client/:userId" element={<EditClient />} />
            <Route path="/newclient" element={<NewClient />} />
          </Route>
          <Route path="/products" >
            <Route index element={<Products />} />
            <Route path="edit-product/:productId" element={<EditProduct />} />

          </Route>
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/neworder" element={<NewOrder />} />

        </Route>
        <Route element={<RedirectToHome user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AdminRoutes user={user} isAllowed={!!user && user.roles.includes('admin')} />}>
          <Route path="/bestsellers" element={< BestSellers />} />
          <Route path="/bestclients" element={<BestClients />} />
        </Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >


  )
}

export default App
