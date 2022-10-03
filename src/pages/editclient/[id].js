import { useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Swal from 'sweetalert2';

import FormInput from "../../components/Input/FormInput";
import Layout from "../../components/Layout";

import Loading from "../../components/Loading";
import { PageNotFound } from "../../components/PageNotFound";

import { UPDATE_CLIENT } from "../../graphql/mutations/client.mutations";
import { GET_CLIENT } from "../../graphql/queries/client.queries";


const EditClient = () => {
    const router = useRouter();
    const { query } = router;
    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id: query.id,
        },
    });
    const [updateClient] = useMutation(UPDATE_CLIENT);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is mandatory"),
        lastname: Yup.string().required("Lastname is mandatory"),
        phone: Yup.string(),
        organization: Yup.string().required("Organization is mandatory"),
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is mandatory"),
    });

    if (loading) return <Loading />;
    if (!data) return <PageNotFound />
    const { getClient } = data;
    const modifyClient = async (values) => {
        try {

            const { email, lastname, name, organization, phone } = values;

            const result = await updateClient({
                variables: {
                    id: query.id,
                    payload: {
                        email,
                        lastname,
                        name,
                        organization,
                        phone
                    }
                },

            })


            Swal.fire(
                'Edited!',
                'Client successfully edited',
                'success'
            )
            router.push('/')
        } catch (error) {
            Swal.fire(
                'There was a problem!',
                error,
                'error'
            )
        }

    }
    return (
        <Layout>
            <div className="text-2xl text-gray-800 font-light">Edit Client</div>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getClient}
                        onSubmit={async (values) => {
                            await modifyClient(values)
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
                                        htmlForm="fname"
                                        placeholder="John"
                                        type="text"
                                        label="Name"
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
                                        value={props.values.lastname}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="lname"
                                        placeholder="Doe"
                                        type="text"
                                        label="Lastname"
                                        id="lastname"
                                    />
                                    {props.errors.lastname && props.touched.lastname ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.lastname}</p>
                                        </div>
                                    ) : null}
                                    <FormInput
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="email"
                                        placeholder="email@email.com"
                                        type="email"
                                        label="Email"
                                        id="email"
                                    />
                                    {props.errors.email && props.touched.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    ) : null}
                                    <FormInput
                                        onBlur={props.handleBlur}
                                        value={props.values.organization}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="organization"
                                        placeholder="Enter your organization"
                                        type="text"
                                        label="Organization"
                                        id="organization"
                                    />
                                    {props.errors.organization && props.touched.organization ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.organization}</p>
                                        </div>
                                    ) : null}
                                    <FormInput
                                        onBlur={props.handleBlur}
                                        value={props.values.phone}
                                        onChange={props.handleChange}
                                        className="mb-5"
                                        htmlForm="phone"
                                        placeholder="Enter your phone"
                                        type="tel"
                                        label="Phone"
                                        id="phone"
                                    />
                                    {props.errors.phone && props.touched.phone ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.phone}</p>
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

export default EditClient;
