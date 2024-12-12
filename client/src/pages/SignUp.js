import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

// Creates New Users
function SignUp() {
    const navigate = useNavigate();
    
    // Initial form field values
    const initialValues = {
        email: "",
        password: ""
    };

    // Validation Schema for form fields
    const validationSchema = 
        Yup.object().shape({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(8).max(15).required("Password is required") 
        })
    
    
    // Form Submission Handler - POST to database table
    const onSubmit = (data, {setSubmitting, setFieldError }) => {
            // Post to express API endpoint for signup of new users
            axios.post("http://localhost:3001/signup", data)
                .then((response) => {
                    console.log("User created: ", response.data);
                    alert("Account created successfully!")
                    navigate('/login');
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        setFieldError("email", error.response.data.error);
                    } else {
                        console.error("Unexpected error: ", error);
                        alert("An unexpected error occured. Please try again.");
                    }
                })
                .finally(() => setSubmitting(false));
};

    return (
        <div className="signUpPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form className="formContainer">
                        <label>Email</label>
                        <Field
                            id="inputEmail"
                            name="email"
                            placeholder="example@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="error" />


                        <label>Password</label>
                        <Field
                            id="inputPassword"
                            name="password"
                            placeholder="password"
                        />
                        <ErrorMessage name="password" component="div" className="error" />

                        <button type="submit">Sign Up</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUp