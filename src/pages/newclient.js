import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import FormInput from "../components/Input/FormInput";
import Layout from "../components/Layout";

import SuccessMsg from "../components/Messages/SuccessMsg";
import ErrorMsg from "../components/Messages/ErrorMsg";

import { ADD_CLIENT } from "../graphql/mutations/client.mutations";
import { GET_CLIENTS_SELLER } from "../graphql/queries/client.queries";

const NewClient = () => {

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClient } }) {
      //get object cache
      const { getClientsSeller } = cache.readQuery({
        query: GET_CLIENTS_SELLER,
      });
      //rewritting the cache
      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: { getClientsSeller: [...getClientsSeller, addClient] },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      organization: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is mandatory"),
      lastname: Yup.string().required("Lastname is mandatory"),
      phone: Yup.string(),
      organization: Yup.string().required("Organization is mandatory"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is mandatory"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addClient({
          variables: {
            input: {
              ...values,
            },
          },
        });

        const { name, lastname } = response.data.addClient;
        setMessage(`Client created!: ${name} ${lastname}`);
        setTimeout(() => {
          setMessage(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
      }
    },
  });

  return (
    <Layout>
      <div className=" text-2xl text-gray-800 font-light">New Client</div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          {message && <SuccessMsg msg={message} />}
          {error && <ErrorMsg msg={error} />}
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
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
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
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
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
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
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <FormInput
              onBlur={formik.handleBlur}
              value={formik.values.organization}
              onChange={formik.handleChange}
              className="mb-5"
              htmlForm="organization"
              placeholder="Enter your organization"
              type="text"
              label="Organization"
              id="organization"
            />
            {formik.errors.organization && formik.touched.organization ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.organization}</p>
              </div>
            ) : null}
            <FormInput
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="mb-5"
              htmlForm="phone"
              placeholder="Enter your phone"
              type="tel"
              label="Phone"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.phone}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-600"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
