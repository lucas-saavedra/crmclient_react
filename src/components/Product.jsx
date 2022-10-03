import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { DELETE_PRODUCT } from '../graphql/mutations/product.mutations';
import { GET_PRODUCTS } from '../graphql/queries/product.queries';

const Product = ({ product }) => {
    const { id, name, price, stock } = product;
    const navigate = useNavigate();
    const [deleteProduct] = useMutation(DELETE_PRODUCT,
        {
            update(cache) {
                //get object cache
                const { getProducts } = cache.readQuery({ query: GET_PRODUCTS })
                //rewritting the cache
                cache.writeQuery({
                    query: GET_PRODUCTS,
                    data: { getProducts: [...getProducts.filter(product => product.id !== id)] }
                })
            }
        }
    )
    const confirmDeleteProduct = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete this product: ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c5282',
            cancelButtonColor: '#9b2c2c',
            confirmButtonText: 'Yes, delete the product!',
            cancelButtonText: 'No, cancel the action!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deleteProduct({
                        variables: {
                            id
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        data.deleteProduct,
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
    const updateProduct = () => {
        navigate(`/${id}`)
    }
    return (
        <tr >
            <td className="border px-4 py-2">{name}  </td>
            <td className="border px-4 py-2"> {stock}</td>
            <td className="border px-4 py-2"> ${price}</td>
            <td className="border px-4 py-2">
                <button
                    onClick={() => updateProduct()}
                    className='uppercase font-bold flex justify-center items-center bg-blue-800 w-full text-white rounded py-2 px-4'
                    type='button'>
                    Edit
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>

            </td>
            <td className="border px-4 py-2">
                <button
                    onClick={() => confirmDeleteProduct()}
                    className='uppercase font-bold flex justify-center items-center bg-red-800 w-full text-white rounded py-2 px-4'
                    type='button'>
                    Delete
                    <svg className="w-6 h-6 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </button>
            </td>
        </tr >
    )
}

export default Product