import { useQuery } from "@apollo/client"
import { NavLink } from "react-router-dom"

import Dashboard from "../components/Dashboard"
import Loading from "../components/Loading"
import Order from "../components/Order"
import { GET_ORDERS } from "../graphql/queries/order.queries"


const Orders = () => {
    const { loading, error, data } = useQuery(GET_ORDERS)

    if (loading) return <Loading />

    const { getOrders } = data;
    return (
        <>
            <Dashboard>


                <h1 className='text-2xl text-gray-800 font-light'>Ordenes</h1>

                <NavLink to={'/neworder'} className={"inline-block bg-blue-800 rounded py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold"}>
                    New Order
                </NavLink>

                {getOrders.length === 0 ? (
                    <p className="mt-5 text-center text-2xl">No orders yet.</p>
                ) : (
                    <>
                        {getOrders.map((element) => (
                            <Order key={element.id} element={element} />
                        ))}
                    </>
                )}
            </Dashboard>
        </>

    )
}

export default Orders