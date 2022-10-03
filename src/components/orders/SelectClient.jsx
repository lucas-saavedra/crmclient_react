import { useQuery } from '@apollo/client';
import { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { OrderContext } from '../../context/orders/OrderContext';
import { GET_CLIENTS_SELLER } from '../../graphql/queries/client.queries';



const SelectClient = () => {
    const { addClient } = useContext(OrderContext);
    const [client, setClient] = useState([]);
    const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

    useEffect(() => {
        addClient(client)
    }, [client])

    const selectClient = (client) => {
        setClient(client)
    }
    if (loading) return null

    const { getClientsSeller } = data;
    return (

        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-grey-700 p-2 text-sm font-bold'>1.- Assing a Client</p>
            <Select className='mt-3'
                options={getClientsSeller}
                onChange={(option) => selectClient(option)}
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.name + " " + options.lastname}
                placeholder="Select your client"
            />
        </>
    )
}

export default SelectClient