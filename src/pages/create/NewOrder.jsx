

import { useMutation } from '@apollo/client'

import { useContext, useState } from 'react'
import { OrderContext } from '../../context/orders/OrderContext';

import Swal from 'sweetalert2';

import Dashboard from '../../components/Dashboard'
import ErrorMsg from '../../components/Messages/ErrorMsg'
import OrderResume from '../../components/orders/OrderResume'
import SelectClient from '../../components/orders/SelectClient'
import SelectProducts from '../../components/orders/SelectProducts'
import Total from '../../components/orders/Total'

import { GET_ORDERS } from '../../graphql/queries/order.queries';
import { NEW_ORDER } from '../../graphql/mutations/order.mutations';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {
    const [error, setError] = useState(null)

    const navigate = useNavigate();
    //Using context
    const { client, products, total } = useContext(OrderContext);
    //Mutation

    const [newOrder] = useMutation(NEW_ORDER, ({
        update(cache, { data: { newOrder } }) {
            const { getOrders } = cache.readQuery({ query: GET_ORDERS });
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrders: [...getOrders, { ...newOrder }]
                }
            })
        }
    }));

    const validateOrder = () => {
        return client.length === 0 || !products.every(product => product.quantity > 0) || total === 0 ? " opacity-50 cursor-not-allowed" : "";
    }
    const createNewOrder = async () => {
        try {
            const order = products.map(({ __typename, stock, createdAt, updatedAt, ...product }) => product);

            await newOrder({
                variables: {
                    input: {
                        client: client.id,
                        order,
                        total
                    }
                }
            })
            Swal.fire(
                'Done!',
                'Order successfuly registered',
                'success'
            )
            setTimeout(() => {
                navigate('/orders')
            }, 2000);

        } catch (error) {
            setError(error);
            setTimeout(() => {
                setError(null);
            }, 4000);
        }


    }

    return (
        <Dashboard>
            <div className='text-2xl text-gray-800 font-light'>New Order</div>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg '>
                    {error && <ErrorMsg msg={error.message} />}
                    <SelectClient />
                    <SelectProducts />
                    <OrderResume />
                    <Total />
                    <button
                        disabled={validateOrder()}
                        type='button'
                        className={`bg-gray-800 
                        w-full mt-5 p-2 text-white 
                        uppercase fomt-bold hover:bg-gray-600
                        ${validateOrder()}
                        `}
                        onClick={() => createNewOrder()}
                    >
                        Submit Order
                    </button>
                </div>

            </div>

        </Dashboard>

    )
}

export default NewOrder