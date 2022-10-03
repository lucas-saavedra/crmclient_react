import { useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import * as Yup from "yup";

import FormInput from "../../components/Input/FormInput";

import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import { PageNotFound } from "../../components/PageNotFound";
import { GET_PRODUCT } from "../../graphql/queries/product.queries";
import { UPDATE_PRODUCT } from "../../graphql/mutations/product.mutations";

const EditProduct = () => {
    const router = useRouter();
    const { query } = router;
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id: query.id,
        },
    });
    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is mandatory"),
        stock: Yup
            .number()
            .integer()
            .required("Stock can not be empty")
        ,
        price: Yup
            .number()
            .required("Price is mandatory"),

    });

    if (loading) return <Loading />;
    if (!data) return <PageNotFound />
    const { getProduct } = data;
    const modifyProduct = async (values) => {
        try {
            const { name, price, stock } = values;
            await updateProduct({
                variables: {
                    id: query.id,
                    payload: {
                        name, price, stock
                    }
                },

            })

            Swal.fire(
                'Edited!',
                'Product successfully edited',
                'success'
            )
            router.push('/products')
        } catch (error) {
            Swal.fire(
                'Something wrong!',
                error,
                'error'
            )
        }

    }
    return (
        <Layout>
            <div className="text-2xl text-gray-800 font-light">Edit Product</div>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getProduct}
                        onSubmit={async (values) => {
                            await modifyProduct(values)
                        }}
                    >
                        {(props) => {

                            return (
                                <form
                                    onSubmit={props.handleSubmit}
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                >

                                    <FormInput
                                        className="mb-5"
                                        htmlForm="product_name"
                                        placeholder="Enter your product name"
                                        type="text"
                                        label="Product name"
                                        id="name"
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.errors.name && props.touched.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    ) : null}
                                    <FormInput
                                        onBlur={props.handleBlur}
                                        value={props.values.price}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="price"
                                        placeholder="00000"
                                        type="number"
                                        label="Price"
                                        id="price"
                                    />
                                    {props.errors.price && props.touched.price ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.price}</p>
                                        </div>
                                    ) : null}
                                    <FormInput
                                        onBlur={props.handleBlur}
                                        value={props.values.stock}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="stock"
                                        placeholder="Stock of your product"
                                        type="number"
                                        label="Stock"
                                        id="stock"
                                    />
                                    {props.errors.stock && props.touched.stock ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.stock}</p>
                                        </div>
                                    ) : null}
                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-600"
                                        value="Submit"
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </Layout >
    );
};

export default EditProduct;
