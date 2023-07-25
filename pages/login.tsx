import React, { useState } from "react";
import Layout from "../Layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useFormik } from "formik";
import login_validate from "./formik validate/login";

export default function login() {
  const [showPassword, setshowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: async function onSubmit(values: {
      email: string;
      password: string;
    }) {
      console.log(values);
    },
  });

  console.log(formik.errors);

  return (
    <Layout>
      <Head>
        <title>login Page</title>
      </Head>
      <main className="w-3/4 mx-auto flex flex-col gap-2">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-1">Login</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
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
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className={styles.input_email}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() => setshowPassword(!showPassword)}
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div>
            <button className={styles.input_button} type="submit">
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="submit"
              className={styles.provider}
              onClick={(event) => {
                event.preventDefault();
                signIn("google", { callbackUrl: "http://localhost:3000" });
              }}
            >
              Sign In With Google{" "}
              <Image
                src={"images/google.svg"}
                alt="google"
                width={20}
                height={20}
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="submit"
              className={styles.provider}
              onClick={(e) => {
                e.preventDefault();
                signIn("github", { callbackUrl: "http://localhost:3000" });
              }}
            >
              Sign In With Github{" "}
              <Image
                src={"images/github.svg"}
                alt="google"
                width={25}
                height={25}
              ></Image>
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400">
          don't have an account?{" "}
          <Link href="/register">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </main>
    </Layout>
  );
}
