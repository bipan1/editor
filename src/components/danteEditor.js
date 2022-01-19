import React, { Component } from "react";
import Dante from "Dante2";
import { Formik } from "formik";

export const DisplayFormikState = props => (
  <div style={{ margin: "1rem 0", background: "#f6f8fa", padding: ".5rem" }}>
    <strong>Injected Formik props (the form's state)</strong>
    <div style={{}}>
      <code>touched:</code> {JSON.stringify(props.touched, null, 2)}
    </div>
    <div>
      <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.values, null, 2)}
    </div>
    <div>
      <code>isSubmitting:</code> {JSON.stringify(props.isSubmitting, null, 2)}
    </div>
  </div>
);

const MyForm = props => (
  <Formik
    // initialValues={{ body: "" }}
    initialValues={{ email: "", body: "<p>Hello there</p>" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {formikProps => (
      <form onSubmit={formikProps.handleSubmit}>
        <h2>Using CKEditor 5 build in React</h2>
        <label htmlFor="Story" style={{ display: "block", marginTop: ".5rem" }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          value={formikProps.values.email}
        />
        {formikProps.errors.email &&
          formikProps.touched.email &&
          formikProps.errors.email}

        <label htmlFor="Story" style={{ display: "block", marginTop: ".5rem" }}>
          Story
        </label>
        <Dante
          style={{border: '1px solide #000'}}
          onChange={editor => { console.log('editor content: ', editor.emitSerializedOutput()) }}
        />

        <DisplayFormikState {...formikProps} />
      </form>
    )}
  </Formik>
);

// {
//   values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     isSubmitting,
//     setFieldValue
//   /* and other goodies */
// }

export default MyForm;

{/* <CKEditor
  editor={ClassicEditor}
  // data="<p>Hello from CKEditor 5!</p>"
  onInit={editor => {
    // You can store the "editor" and use when it is needed.
    console.log("Editor is ready to use!", editor);
  }}
  data={formikProps.values.body}
  onChange={(event, editor) => {
    const data = editor.getData();
    console.log("Data", data);
    formikProps.setFieldValue("body", data);
  }}
  onBlur={editor => {
    console.log("Blur.", editor);
  }}
  // onChange={formikProps.handleChange}
  // onBlur={formikProps.handleBlur}
  value={formikProps.values.body}
/> */}

// <CKEditor
//   editor={ClassicEditor}
//   data="<p>Hello from CKEditor 5!</p>"
//   onInit={editor => {
//     // You can store the "editor" and use when it is needed.
//     console.log("Editor is ready to use!", editor);
//   }}
//   onChange={handleChange}
//   onBlur={handleBlur}
// />

