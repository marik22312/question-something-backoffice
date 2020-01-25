import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form as FormikForm,
  Field,
  FieldProps
} from "formik";
import * as Yup from "yup";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import './Login.component.scss';

export interface LoginObject {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit(credentials: LoginObject): void;
}

interface LoginFormState {
	isLoading: boolean
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
         constructor(props: any) {
           super(props);
           this.state = {
             isLoading: false
           };
         }

         public render() {
           const initialValues: LoginObject = { email: "", password: "" };
           return (
             <section id="login">
               <Formik
                 initialValues={initialValues}
                 onSubmit={this.onSubmit}
                 render={this.renderForm}
               />
             </section>
           );
         }

         private onSubmit = (creds: LoginObject) => {
           this.setState({
             isLoading: true
		   });
		   this.props.onSubmit(creds)
         }

         private renderForm = (formikProps: FormikProps<LoginObject>) => {
           return (
             <Form>
               <FormGroup row>
                 <Label inline={false} for="userEmail">
                   Email
                 </Label>
                 <Input
                   type="email"
                   name="email"
                   id="userEmail"
                   placeholder="user@radiosavta.com"
                   onChange={formikProps.handleChange}
                 />
               </FormGroup>
               <FormGroup row>
                 <Label for="userPassword" sm={12}>
                   Password
                 </Label>
                 <Input
                   type="password"
                   name="password"
                   id="userPassword"
                   placeholder="user@radiosavta.com"
                   onChange={formikProps.handleChange}
                 />
               </FormGroup>
               <FormGroup row>
                 <Button color={"primary"} onClick={formikProps.submitForm} disabled={this.state.isLoading}>
                   Submit
                 </Button>
               </FormGroup>
             </Form>
           );
         }
       }
