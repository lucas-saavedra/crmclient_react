
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Yup from "yup"
import { useFormik } from 'formik';
import FormInput from "../components/Input/FormInput"
import Layout from "../components/Layout"
import { ADD_USER } from '../graphql/mutations/user.mutations';




const Register = () => {
    //message state
    const [message, setMessage] = useState({ msg: null, error: false });

    const [addUser] = useMutation(ADD_USER);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is mandatory"),
            lastname: Yup.string().required("Lastname is mandatory"),
            email: Yup.string().email('Email is not valid').required("Email is mandatory"),
            password: Yup.string().min(8, 'Password has to be at least 8 characters').required("Password is mandatory"),
        }),
        onSubmit: async values => {
            try {
                const response = await addUser({
                    variables: {
                        userPayload: {
                            ...values
                        }
                    }
                })

                const { name, lastname } = response.data.addUser;

                  setMessage({ msg: `Succesfully created! User: ${name} ${lastname}`, error: false });
                 setTimeout(() => {
                     setMessage({ msg: null, error: false });
                     router.push("/login")
                 }, 3000) 

            } catch (error) {
                setMessage({ msg: error.message, error: true })
                setTimeout(() => setMessage({ msg: null, error: false }), 3000)
            }
        }

    })
    const showMessage = () => {
        return (
            
            <div className={` ${message.error ? "bg-red-300 " : "bg-green"}  py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded`} >
                <p >
                    {message.msg}
                </p>
            </div >
        )
    }
    return (

        <Layout>
            {message?.msg && showMessage()}
            <h1 className="text-center
                text-2xl
                text-white
                font-light">
                Login</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm" >
                    <form onSubmit={formik.handleSubmit}
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">

                        <FormInput
                            className="mb-5"
                            htmlForm="fname"
                            placeholder="John"
                            type="text"
                            label="Name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}
                        <FormInput
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            className="mb-5"
                            htmlForm="lname"
                            placeholder="Doe"
                            type="text"
                            label="Lastname"
                            id="lastname"
                        />
                        {formik.errors.lastname && formik.touched.lastname ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.lastname}</p>
                            </div>
                        ) : null}
                        <FormInput
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="mb-5"
                            htmlForm="email"
                            placeholder="email@email.com"
                            type="email"
                            label="Email"
                            id="email"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}
                        <FormInput
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="mb-5"
                            htmlForm="password"
                            placeholder="Enter your password"
                            type="password"
                            label="Password"
                            id="password"
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 '>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}
                        {/*      <FormInput
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            htmlForm="confirmPassword"
                            placeholder="Re enter your password"
                            type="password"
                            label="Confirm Password"
                            id="confirmPassword"
                        />
 */}
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-600"
                            value="Sign in"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register