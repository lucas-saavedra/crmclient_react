import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import FormInput from "../components/Input/FormInput";
import Layout from "../components/Layout";

import SuccessMsg from "../components/Messages/SuccessMsg";
import ErrorMsg from "../components/Messages/ErrorMsg";
import { ADD_PRODUCT } from "../graphql/mutations/product.mutations";
import { GET_PRODUCTS } from "../graphql/queries/product.queries";


const NewProduct = () => {

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [addProduct] = useMutation(ADD_PRODUCT, {
    update(cache, { data: { addProduct } }) {
      //get object cache
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });
      //rewritting the cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { getProducts: [...getProducts, addProduct] },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      price: "",

    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is mandatory"),
      stock: Yup
        .number()
        .integer()
        .required("Stock can not be empty")
      ,
      price: Yup
        .number()
        .required("Price is mandatory"),

    }),
    onSubmit: async (values) => {

      try {
        const { data } = await addProduct({
          variables: {
            input: {
              ...values,
            },
          },
        });

        const { name } = data.addProduct;
        setMessage(`Product created!: ${name}`);
        setTimeout(() => {
          setMessage(null);
          router.push("/products");
        }, 3000);
      } catch (error) {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
      }
    },
  });

  return (
    <Layout>
      <div className="text-2xl text-gray-800 font-light">New Product</div>

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
              htmlForm="product_name"
              placeholder="Enter your product name"
              type="text"
              label="Product name"
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
              value={formik.values.price}
              onChange={formik.handleChange}
              className="mb-5"
              htmlForm="price"
              placeholder="00000"
              type="number"
              label="Price"
              id="price"
            />
            {formik.errors.price && formik.touched.price ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <FormInput
              onBlur={formik.handleBlur}
              value={formik.values.stock}
              onChange={formik.handleChange}
              className="mb-5"
              htmlForm="stock"
              placeholder="Stock of your product"
              type="number"
              label="Stock"
              id="stock"
            />
            {formik.errors.stock && formik.touched.stock ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-400 text-red-700 p-4 ">
                <p className="font-bold">Error</p>
                <p>{formik.errors.stock}</p>
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

export default NewProduct;
