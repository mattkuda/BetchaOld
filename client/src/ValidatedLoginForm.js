import React from 'react';

import {Formik} from 'formik';
import * as EmailValidator from 'email-validator';
import * as Yup from 'yup'

const ValidatedLoginForm = () => (
    
    <Formik
        initialValues={{firstName: "", lastName: "", email: "", password: ""}}
        onSubmit={(values, {setSubmitting})=>{
            console.log("Submitting");
            console.log(values);
        }}

        validationSchema={Yup.object().shape({
            firstName: Yup.string()
                .required("Required"),
            lastName: Yup.string()
                .required("Required"),    
            email: Yup.string()
                .required("Required")
                .email(),
            password: Yup.string()
                .required("Required")
                .min(8, "Password is too short - should be 8 characters minimum")
                .matches(/(?=.*[0-9])/,"Password. Must contatin at least one number")

        })}

        // validate = { values =>{
        //     let errors = {};
        //     if (!values.email){
        //         errors.email='Required';
        //     } else if(!EmailValidator.validate(values.email)){
        //         errors.email='Invalid Email Address';
        //     }

        //     const passwordRegex=/(?=.*[0-9])/;

        //     if (!values.password){
        //         errors.password='Required';
        //     }else if(values.password.length < 8){
        //         errors.password='Password must be at least 8 characters long';
        //     }else if(!passwordRegex.test(values.password)){
        //         errors.password='Invalid Password. Must contatin at least one number';
        //     }
        //     return errors;
        // }}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit 
            } = props;
        return (
            <div>
                <h1>Betcha</h1>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="firstName">First Name</label>
                    <input
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
                    className={errors.firstName && touched.firstName && "error"}
                    />
                    {errors.firstName && touched.firstName && (
                        <div className="input-feedback">{errors.firstName}</div>
                    )}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
                    className={errors.lastName && touched.lastName && "error"}
                    />
                    {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                    )}
                    
                    
                    <label htmlFor="email">Email</label>
                    <input
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
                    className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                    <label htmlFor="email">Password</label>
                    <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <button type="submit" disabled={isSubmitting}>Create Account</button>
                </form>
            </div>
        );
        }}
    </Formik>
);

export default ValidatedLoginForm;

