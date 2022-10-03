import { useMutation, useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { AUTH_USER } from "./graphql/mutations/user.mutations";
import { GET_USER } from "./graphql/queries/user.queries";
import Clients from './pages/Clients'
import Login from "./pages/Login";
import Products from './pages/Products'
function App() {
  const { data, loading, error } = useQuery(GET_USER);
  if (loading) (<Loading />);


  return (

    < BrowserRouter >

      <Routes >

        <Route index element={<Clients />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />

      </Routes>
    </BrowserRouter >


  )
}

export default App
