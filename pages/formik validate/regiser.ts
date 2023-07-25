interface LoginFormVlaues {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

interface LoginErrors {
  username?: string;
  email?: string;
  password?: string;
  cpassword?: string;
}

export default function register_validate(values: LoginFormVlaues) {
  const errors: LoginErrors = {};

  if (!values.username) {
    errors.username = "Username Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  if (!values.password) {
    errors.password = "Password Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8, less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.cpassword) {
    errors.cpassword = "Cpassword Required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords don't match";
  }

  return errors;
}
