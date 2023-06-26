import { Formik } from 'formik';
import { AiOutlineEdit } from 'react-icons/ai';
import './App.css';
import Dropzone from 'react-dropzone';
import * as yup from 'yup';
;
function Form() {
  const picSchema = yup.object().shape({
    picture: yup.string().required('Required'),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name);
    await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      body: formData,
    });
    onSubmitProps.resetForm()
alert("Image Uploaded")
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ name: '', picture: '' }}
      validationSchema={picSchema}
    >
      {({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <div className='page'>
        <form className='main' onSubmit={handleSubmit}>
          <div>
            <h2 className='head'>Image Upload</h2>
          </div>
          <input
          
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            id='name'
            name="name"
            className='namefeild'
            placeholder="Name"
            />
          <div className='outer'>

          <Dropzone
            acceptedFiles='.jpeg,.jpg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
            >
            {({ getInputProps, getRootProps }) => (
              <div {...getRootProps()} className='dropbox'>
                <input {...getInputProps()} className='drop' />
                {!values.picture ? <p>Drag and drop files here, or click to select files</p> : <p className='nameZone'>{values.picture.name} <span><AiOutlineEdit /></span></p> }
              </div>
            )}
          </Dropzone>
            </div>
          <button type='submit'>SUBMIT</button>
        </form>
      </div>
      )}
    </Formik>
  );
}

export default Form;
