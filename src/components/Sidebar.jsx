
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user/userContext";

const Sidebar = () => {
    const { user } = useContext(UserContext);


    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black " >CRM - Clients</p>
            </div>
            <nav className="mt-5 list-none">
                <ul>
                    <li className="hover:bg-blue-800  rounded text-white p-3">
                        <NavLink
                            to="/" >
                            Clients
                        </NavLink>
                    </li>
                    <li className="hover:bg-blue-800 rounded text-white p-3">
                        <NavLink to="/products" >
                            Products
                        </NavLink>
                    </li>
                    <li className="hover:bg-blue-800 rounded text-white p-3">
                        <NavLink to="/orders" >
                            Orders
                        </NavLink>
                    </li>
                </ul>

            </nav >

            {user.roles.includes('admin') && (
                <>
                    <div className="sm:mt-10 text-white">
                        Other Options (Admin)
                    </div>
                    <nav className="mt-5 list-none">
                        <ul>
                            <li className="hover:bg-blue-800  rounded text-white p-3">
                                <NavLink
                                    to="/bestsellers" >
                                    Best Sellers
                                </NavLink>
                            </li>
                            <li className="hover:bg-blue-800 rounded text-white p-3">
                                <NavLink to="/bestclients" >
                                    Best Clients
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </>
            )}

        </aside >
    )
}

export default Sidebar