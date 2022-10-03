import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from "yup"
import FormInput from "../components/Input/FormInput";
import { AUTH_USER } from '../graphql/mutations/user.mutations';
import { Navigate, useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ msg: null, error: false });
    const [authUser] = useMutation(AUTH_USER);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email is not valid').required("Email is missing"),
            password: Yup.string().min(6, 'Password has to be at least 6 characters').required("Password is missing"),
        }),
        onSubmit: async values => {
            try {
                const response = await authUser({
                    variables: {
                        authPayload: {
                            ...values
                        }
                    },

                    onCompleted: ({ authUser }) => {
                        setMessage({ msg: `Login in...`, error: false });
                        const { token } = authUser;
                        localStorage.setItem('token', token);
                        return navigate('/')
                    }

                })
                //saving the token in localStorage

                setTimeout(() => {
                    setMessage({ msg: null, error: false });
                }, 3000)

            } catch (error) {
                setMessage({ msg: error.message, error: true })
                setTimeout(() => setMessage({ msg: null, error: false }), 3000)
            }
        }

    })
    const showMessage = () => {
        return (
            <div className={` ${message.error ? "bg-red-300 " : "bg-white"}  py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded`} >
                <p >
                    {message.msg}
                </p>
            </div >
        )
    }
    return (

        <div className=' min-h-screen bg-gray-800 w-full'>
            <div className='  sm:min-h-screen p-5'>
                <h1 className="text-center

                tex-center
                text-2xl 
                text-white
                font-light
                ">
                    Login</h1>
                {message.msg && showMessage()}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm" >
                        <form onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <FormInput
                                className="mb-5"
                                htmlForm="email"
                                placeholder="email@email.com"
                                type="email"
                                label="Email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 '>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                            <FormInput

                                htmlForm="password"
                                placeholder="Enter your password"
                                type="password"
                                label="Password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                value="Log In"
                            />

                        </form>
                        
                    </div>
                </div>


            </div>

        </div>





    );
};

export default Login;
