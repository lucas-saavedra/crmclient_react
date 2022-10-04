

import { useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from "yup"
import { useFormik } from 'formik';
import FormInput from "../components/Input/FormInput"

import { ADD_USER } from '../graphql/mutations/user.mutations';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    //message state

    const [addUser] = useMutation(ADD_USER);
    const navigate = useNavigate();


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
                toast.success('Success ,redirecting ...', {
                    style: {
                        border: '1px solid #2c5282',
                        padding: '16px',
                        color: '#2c5282',
                        backgroundColor: "white"
                    },
                });
                setTimeout(() => {
                    navigate("/login");
                }, 2000)

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

        <div className='bg-gray-800 min-h-screen'>

            <h1 className="
            py-5 text-center
                text-2xl
                text-white
                font-light">
                Register</h1>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
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

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-600"
                            value="Sign in"
                        />

                    </form>
                    <div className='flex flex-col justify-center'>
                        <p className='text-white text-center' >Already registered?</p>
                        <div className='text-center mt-6'>
                            <span className='p-2 text-white bg-blue-800 rounded'> <Link to={'/login'}>Login here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register