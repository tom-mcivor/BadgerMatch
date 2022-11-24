import React, { useState } from 'react'
import { create, getS3Url, fetchUrl } from '../apis/create'
import styles from './Create.module.scss'
import { useDropzone } from 'react-dropzone'
import { useAuth0 } from '@auth0/auth0-react'

const Create = () => {
  const { getAccessTokenSilently } = useAuth0()

  const [animal, setAnimal] = useState({
    name: '',
    description: '',
    imageUrl: '',
    // auth0Id: 1,
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value })
  }
  const handleFileChange = async (acceptedFiles) => {
    setFile(acceptedFiles[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const token = await getAccessTokenSilently()

    const { uploadUrl } = await getS3Url(token)

    await fetchUrl(uploadUrl, file)
    const imageUrl = uploadUrl.split('?')[0]

    const newAnimal = { ...animal, imageUrl }

    await create(newAnimal, token)
    setLoading(false)
    setSuccess(true)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
  })

  return (
    <div className={styles.container} data-testid='create-container'>
      <h1 className={styles.h1}>Add an Animal</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        data-testid='create-form'
      >
        <label htmlFor='name' className={styles.label}>
          Name:
        </label>
        <input
          type='text'
          name='name'
          value={animal.name}
          onChange={handleChange}
          className={styles.input}
          aria-label='Name:'
          data-testid='name-input'
        />
        <label htmlFor='description' className={styles.label}>
          Description:
        </label>
        <input
          type='text'
          name='description'
          value={animal.description}
          onChange={handleChange}
          className={styles.input}
          aria-label='Description:'
          data-testid='description-input'
        />
        <div {...getRootProps()}>
          <input {...getInputProps()} data-testid='image-input' />
          {file ? (
            <p className={styles.dropZone}>{file.name}</p>
          ) : (
            <p className={styles.dropZone}>Drag, or click to select files</p>
          )}
        </div>
        <button
          type='submit'
          className={styles.button}
          data-testid='submit-button'
        >
          Submit
        </button>
      </form>
      {loading && <p data-testid='loading'>Loading...</p>}
      {success && <p data-testid='success'>Success!</p>}
    </div>
  )
}

export default Create
