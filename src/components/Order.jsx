import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

import { DELETE_ORDER, UPDATE_ORDER_STATE } from "../graphql/mutations/order.mutations";
import { GET_ORDERS } from "../graphql/queries/order.queries";

import DeleteIcon from "./icons/DeleteIcon";
import EmailIcon from "./icons/EmailIcon";
import PhoneIcon from "./icons/PhoneIcon";
import Spinner from "./icons/Spinner";



const Order = ({ element }) => {
    const { id, total, client: { name, lastname, phone, email }, state, order, client } = element;

    const [orderState, setOrderState] = useState(state);
    const [loading, setLoading] = useState(false);

    const [className, setClassName] = useState('');
    //Mutation to change the state
    const [updateOrder] = useMutation(UPDATE_ORDER_STATE);

    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache) {
            //get object cache
            const { getOrders } = cache.readQuery({ query: GET_ORDERS });
            //rewritting the cache
            cache.writeQuery({
                query: GET_ORDERS,
                data: { getOrders: [...getOrders.filter((e) => e.id !== id)] }
            })
        }
    });
    //Mutation to deete the order
    useEffect(() => {
        if (orderState) {
            setOrderState(orderState)
            changeBgState()
        }
    }, [orderState])

    const changeBgState = () => {
        if (orderState === "PENDING") {
            setClassName('border-yellow-500')
        } else if (orderState === "COMPLETED") {
            setClassName('border-green-500')
        } else {
            setClassName('border-red-800')
        }
    }
    const selectState = async (newState) => {
        try {
            
            setLoading(true);
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        state: newState,
                        client: client.id
                    }
                }
            })
            setOrderState(data.updateOrder.state);
            setLoading(false);
            toast.success('State updated!', {
                style: {
                    border: '1px solid #2c5282',
                    padding: '16px',
                    color: '#2c5282',
                    backgroundColor: "white"
                },
            });
        } catch (error) {
            toast.error(error.message, {
                style: {
                    border: '1px solid #2c5282',
                    padding: '16px',
                    color: '#2c5282',
                    backgroundColor: "white"
                },
            });
        }

    }
    const handleDeleteOrder = async () => {


        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete this order`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c5282',
            cancelButtonColor: '#9b2c2c',
            confirmButtonText: 'Yes, delete the order!',
            cancelButtonText: 'No, cancel the action!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteOrder({
                        variables: {
                            id
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        data.deleteOrder,
                        'success'
                    )
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })

                }


            }
        })

    }
    return (

        <div className={`mt-4 bg-white ${className} border-t-4   rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg `} >
            <div >
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                <p className="font-bold text-gray-800">Client: {name} {lastname}</p>

                {email && (
                    <p className="flex items-center my-2">
                        <EmailIcon className={"mr-2 w-5 h-5"} />
                        {email}
                    </p>)
                }
                {phone ? <p className="flex items-center my-2" > <PhoneIcon className="mr-2 w-6 h-6" />{phone}</p> : "Not defined"}
                <h2 className="font-bold text-gray-800 p-2  mt-10">Order state:</h2>
                <div className="flex items-center">
                    <select value={orderState} disabled={loading} onChange={e => selectState(e.target.value)} className="text-white bg-blue-600 mt-2 p-2 rounded shadow-lg text-center leading-tight focus:outline-none   uppercase text-sm font-bold">
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="CANCELLED">Canceled</option>
                    </select>
                    {loading && <> <Spinner className={'mt-2 flex items-center animate-spin  h-8 w-8'} />

                    </>}
                </div>


            </div>
            <div>
                <h2 className="text-gray-800 font-bold mb-3">Order Resume</h2>
                {order.map((product) => (
                    <div key={product.id}>
                        <p className="text-sm text-gray-600">Product: {product.name}</p>
                        <p className="text-sm text-gray-600">Amount: {product.quantity}</p>
                    </div>
                ))}
                <p className="text-gray-800 mt-3 font-bold ">Total:<span className="font-light" > ${total}</span> </p>
                <button
                    onClick={() => handleDeleteOrder()}
                    className='uppercase mt-3 font-bold flex justify-center items-center bg-red-800  text-white rounded py-2 px-4'
                    type='button'>
                    Delete Order
                    <DeleteIcon className={"w-6 h-6 ml-2"} />
                </button>
            </div>
        </div >
    )
}

export default Order