import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";


import { GET_USER } from "../graphql/queries/user.queries";

const Sidebar = () => {



    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black " >CRM - Clients</p>
            </div>
            <nav className="mt-5 list-none">
                <li className="bg-blue-800 p-3" >
                 
                </li>
                <li className="bg-blue-800 p-3" >
                    <Link to="/orders" >
                        Orders
                    </Link>
                </li>
                <li className="bg-blue-800 p-3" >
                    <Link to="/products" >
                        Products
                    </Link>
                </li>
            </nav >
            <div className="sm:mt-10">
                Other Options
            </div>
            <nav className="mt-5 list-none">
                <li className="bg-blue-800 p-3" >
                    <Link to="/bestsellers" >
                        Best Sellers
                    </Link>
                </li>
                <li className="bg-blue-800 p-3" >
                    <Link to="/bestclients" >
                        Best Clients
                    </Link>
                </li>
            </nav>
        </aside >
    )
}

export default Sidebar