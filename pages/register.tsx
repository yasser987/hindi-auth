import Link from "next/link";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import Layout from "../Layout/layout";
import { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import register_validate from "./formik validate/regiser";

export default function page() {
  const [showPassword, setshowPassword] = useState({
    password: false,
    cpassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit: async function onSubmit(values) {
      console.log(values);
    },
  });

  console.log(formik.errors);

  return (
    <Layout>
      <Head>
        <title>Register Page</title>
      </Head>
      <main className="w-3/4 mx-auto flex flex-col gap-2">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-1">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.inputGroup} ${
              formik.errors.username && formik.touched.username
                ? " border-rose-500"
                : ""
            }`}
          >
            <input
              type="text"
              placeholder="Username"
              className={styles.input_email}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4 cursor-pointer">
              <AiOutlineUser size={20} />
            </span>
          </div>
          <div
            className={`${styles.inputGroup} ${
              formik.errors.email && formik.touched.email
                ? " border-rose-500"
                : ""
            }`}
          >
            <input
              type="email"
              placeholder="email"
              className={styles.input_email}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4 cursor-pointer">
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div
            className={`${styles.inputGroup} ${
              formik.errors.password && formik.touched.password
                ? " border-rose-500"
                : ""
            }`}
          >
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="password"
              className={styles.input_email}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() =>
                setshowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div
            className={`${styles.inputGroup} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? " border-rose-500"
                : ""
            }`}
          >
            <input
              type={showPassword.cpassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={styles.input_email}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() =>
                setshowPassword({
                  ...showPassword,
                  cpassword: !showPassword.cpassword,
                })
              }
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div>
            <button className={styles.input_button} type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400">
          have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </p>
      </main>
    </Layout>
  );
}
