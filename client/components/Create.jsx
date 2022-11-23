import React, { useState } from 'react'
import { create, getS3Url, fetchUrl } from '../apis/create'
import styles from './Create.module.scss'

const Create = () => {
  const [animal, setAnimal] = useState({
    name: '',
    description: '',
    imageUrl: '',
    auth0Id: 1,
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    setAnimal({ ...animal, [event.target.name]: event.target.value })
  }
  const handleFileChange = async (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { uploadUrl } = await getS3Url()
    console.log(uploadUrl, 'uploadUrl')

    await fetchUrl(uploadUrl, file)
    const imageUrl = uploadUrl.split('?')[0]

    const newAnimal = { ...animal, imageUrl }

    await create(newAnimal)
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Add an Animal</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='name' className={styles.label}>
          Name:
        </label>
        <input
          type='text'
          name='name'
          value={animal.name}
          onChange={handleChange}
          className={styles.input}
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
        />
        <label htmlFor='imageUrl' className={styles.label}>
          Pick Image:
        </label>
        <input
          type='file'
          name='imageUrl'
          onChange={handleFileChange}
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {success && <p>Success!</p>}
    </div>
  )
}

export default Create
