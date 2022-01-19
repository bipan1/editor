import React, { Component, useEffect, useState } from "react";
import MediumEditor from "medium-editor";
// import { Formik } from "formik";
import $ from "jquery";
import MediumEditorInsert from "medium-editor-insert-plugin";

require("medium-editor/dist/css/medium-editor.css");
// require("medium-editor/dist/css/themes/default.css");
require("medium-editor/dist/css/themes/bootstrap.css");
require("medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.css");

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

const MyForm = props => {
  const [content, setContent] = useState("Here is the content");

  const _handleEditableInput = (event, editable) => {
    // console.log("event", event);
    // console.log("target", event.target);
    // console.log("innerHTML", event.target.innerHTML);
    // if(!event.target.innerHTML) return;
    // setContent(event.target.innerHTML);
    // console.log("editable", editable);
    // console.log(editor.serialize());
  };

  const myCustomAdd = () => {
    console.log("Added");
  };

  useEffect(() => {
    // const insertion = new MediumEditorInsert();
    // console.log("insertion", insertion);

    const editor = new MediumEditor(/*dom, */ ".medium-editable", {
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
        buttons: ["bold", "italic", "quote", "anchor", "h1", "h2", "h3"],
        // diffLeft: 25,
        diffTop: -10
      },
      anchor: {
        placeholderText: "Type a link",
        customClassOption: "btn",
        customClassOptionText: "Create Button"
      },
      paste: {
        cleanPastedHTML: true,
        cleanAttrs: ["style", "dir"],
        cleanTags: ["label", "meta"],
        unwrapTags: ["sub", "sup"]
      },
      anchorPreview: {
        hideDelay: 300
      },
      placeholder: {
        text: "Tell your story..."
      },
      extensions: {
        insert: new MediumEditorInsert()
      }
    });

    // console.log("editor", editor);
    // editor.subscribe('editableInput', _handleEditableInput.bind(this));
    editor.subscribe("editableInput", function(event, editable) {
      const content = editor.serialize();
      console.log(content);
      for (var key in content) if (content.hasOwnProperty(key)) break; // getting first json key/value
      const value = content[key].value;
      console.log("Value", content[key].value);
      setContent(value);
    });

    // $('.medium-editable')
    // .bind('fileuploadadd', function (e, data) { console.log("ADDDDED")})
    // .bind('fileuploadsubmit', function (e, data) {/* ... */})
    // .bind('fileuploadsend', function (e, data) {/* ... */})
    // .bind('fileuploaddone', function (e, data) {/* ... */})
    // .bind('fileuploadfail', function (e, data) {/* ... */})
    // .bind('fileuploadalways', function (e, data) {/* ... */})
    // .bind('fileuploadprogress', function (e, data) {/* ... */})
    // .bind('fileuploadprogressall', function (e, data) {/* ... */})
    // .bind('fileuploadstart', function (e) {/* ... */})
    // .bind('fileuploadstop', function (e) {/* ... */})
    // .bind('fileuploadchange', function (e, data) {/* ... */})
    // .bind('fileuploadpaste', function (e, data) {/* ... */})
    // .bind('fileuploaddrop', function (e, data) {/* ... */})
    // .bind('fileuploaddragover', function (e) {/* ... */})
    // .bind('fileuploadchunkbeforesend', function (e, data) {/* ... */})
    // .bind('fileuploadchunksend', function (e, data) {/* ... */})
    // .bind('fileuploadchunkdone', function (e, data) {/* ... */})
    // .bind('fileuploadchunkfail', function (e, data) {/* ... */})
    // .bind('fileuploadchunkalways', function (e, data) {/* ... */});

    $(".medium-editable").mediumInsert({
      editor: editor,
      addons: {
        // (object) Addons configuration
        images: {
          // (object) Image addon configuration
          label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
          uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
          deleteScript: "delete.php", // (string) A relative path to a delete script
          deleteMethod: "POST",
          fileDeleteOptions: {}, // (object) extra parameters send on the delete ajax request, see http://api.jquery.com/jquery.ajax/
          preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
          captions: true, // (boolean) Enable captions
          captionPlaceholder: "Type caption for image (optional)", // (string) Caption placeholder
          autoGrid: 3, // (integer) Min number of images that automatically form a grid
          formData: {}, // DEPRECATED: Use fileUploadOptions instead
          fileUploadOptions: {
            // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
            // url: "upload.php", // (string) A relative path to an upload script
            signatureScript: "https://biolocal.s3.amazonaws.com",
            url: "https://biolocal.s3.amazonaws.com",
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, // (regexp) Regexp of accepted file types
            add: function(e, data) {
              // $('body').append('<p class="upl">Uploading...</p>')
              // data.submit();
              console.log("AAAADDDD function called");
              data.submit();
            },
            always: function(e, data) {
              console.log("ALWAYS function called");
            },
            submit: function(e, data) {
              console.log("SUBMIT function called");
            },
            send: function(e, data) {
              console.log("SEND function called");
            },
            fail: function(e, data) {
              console.log("FAIL function called");
            },
            done: function(e, data) {
              console.log("DONE function called");
            }
            // uploadAdd: function (e, data) {
            //   // $('body').append('<p class="upl">Uploading...</p>')
            //   // data.submit();
            //   console.log("uploadAdd function called")
            // },
            // fileuploadadd: function (e, data) {
            //   // $('body').append('<p class="upl">Uploading...</p>')
            //   // data.submit();
            //   console.log("Add function called")
            // },
            // add: myCustomAdd,
            // fileuploadadd: myCustomAdd
            // done: myCustomDone
          },
          styles: {
            // (object) Available image styles configuration
            wide: {
              // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
              label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
              added: function($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
              removed: function($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
            },
            left: {
              label: '<span class="fa fa-align-left"></span>'
            },
            right: {
              label: '<span class="fa fa-align-right"></span>'
            },
            grid: {
              label: '<span class="fa fa-th"></span>'
            }
          },
          actions: {
            // (object) Actions for an optional second toolbar
            remove: {
              // (object) Remove action configuration
              label: '<span class="fa fa-times"></span>', // (string) Label for an action
              clicked: function($el) {
                // (function) Callback function called when an action is selected
                var $event = $.Event("keydown");

                $event.which = 8;
                $(document).trigger($event);
              }
            }
          },
          messages: {
            acceptFileTypesError: "This file is not in a supported format: ",
            maxFileSizeError: "This file is too big: "
          },
          uploadCompleted: function($el, data) {}, // (function) Callback function called when upload is completed
          uploadFailed: function(uploadErrors, data) {} // (function) Callback function called when upload failed
        },
        embeds: {
          // (object) Embeds addon configuration
          label: '<span class="fab fa-youtube"></span>', // (string) A label for an embeds addon
          placeholder:
            "Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter", // (string) Placeholder displayed when entering URL to embed
          captions: true, // (boolean) Enable captions
          captionPlaceholder: "Type caption (optional)", // (string) Caption placeholder
          // oembedProxy: "http://medium.iframe.ly/api/oembed?iframe=1", // (string/null) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of Iframely. *Null* will make the plugin use pre-defined set of embed rules without making server calls.
          oembedProxy: "https://noembed.com/embed?url=",
          styles: {
            // (object) Available embeds styles configuration
            wide: {
              // (object) Embed style configuration. Key is used as a class name added to an embed, when the style is selected (.medium-insert-embeds-wide)
              label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
              added: function($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
              removed: function($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
            },
            left: {
              label: '<span class="fa fa-align-left"></span>'
            },
            right: {
              label: '<span class="fa fa-align-right"></span>'
            }
          },
          actions: {
            // (object) Actions for an optional second toolbar
            remove: {
              // (object) Remove action configuration
              label: '<span class="fa fa-times"></span>', // (string) Label for an action
              clicked: function($el) {
                // (function) Callback function called when an action is selected
                var $event = $.Event("keydown");

                $event.which = 8;
                $(document).trigger($event);
              }
            }
          }
        }
      }
    });

    // var images = $(".medium-editable").data("plugin_mediumInsertImages"),
    //   originalAdd = images.add,
    //   originalDone = images.done;
    // // originalDone = images.done;

    // images.add = function() {
    //   // do my customizations here
    //   // console.log("images.add");
    //   originalAdd.call(images);
    //   console.log("images.add");
    // };

    // images.done = function() {
    //   // do my customizations here
    //   // console.log("images.add");
    //   originalDone.call(images);
    //   console.log("images.done");
    // };
  }, []);

  return (
    <>
      <h3>The state</h3>
      <p>{content}</p>
      <label htmlFor="Story" style={{ display: "block", marginTop: ".5rem" }}>
        Story
      </label>
      <div className="form-group">
        <textarea
          style={{
            textAlign: "left",
            border: "1px solid #eee",
            minHeight: "200rem"
          }}
          id="medium-editable"
          className="medium-editable"
          value={content}
          // onchange={val => formikProps.setFieldValue("body", val)}
          // onchange={event => formikProps.setFieldValue("body", event.target.value)}
          onChange={event =>
            console.log("On Change Handler", event.target.value)
          }
        />
      </div>
    </>
  );
};

export default MyForm;

// return(
//   <Formik
//     // initialValues={{ body: "" }}
//     initialValues={{ email: "", body: "<p>Hello there</p>" }}
//     onSubmit={(values, { setSubmitting }) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//       }, 400);
//     }}
//   >
//     {formikProps => (
//       <form onSubmit={formikProps.handleSubmit}>
//         <h2>Using CKEditor 5 build in React</h2>
//         <label htmlFor="Story" style={{ display: "block", marginTop: ".5rem" }}>
//           Email
//         </label>
//         <input
//           type="email"
//           name="email"
//           onChange={formikProps.handleChange}
//           onBlur={formikProps.handleBlur}
//           value={formikProps.values.email}
//         />
//         {formikProps.errors.email &&
//           formikProps.touched.email &&
//           formikProps.errors.email}

//         <label htmlFor="Story" style={{ display: "block", marginTop: ".5rem" }}>
//           Story
//         </label>
//         <div className="form-group">
//           <textarea
//             style={{
//               textAlign: "left",
//               border: "1px solid #eee",
//               minHeight: "200rem"
//             }}
//             id="medium-editable"
//             className="medium-editable"
//             value={formikProps.values.body}
//             // onchange={val => formikProps.setFieldValue("body", val)}
//             // onchange={event => formikProps.setFieldValue("body", event.target.value)}
//             onChange={event => console.log(event.target.value)}
//           />
//         </div>

//         <DisplayFormikState {...formikProps} />
//       </form>
//     )}
//   </Formik>
//   );
