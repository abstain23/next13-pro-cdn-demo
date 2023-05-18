'use client'

import React, { ChangeEvent, useState } from 'react'

function Upload() {
  const [file, setFile] = useState('')
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fd = new FormData()
      fd.append('file', e.target.files[0])
      fetch('http://10.24.33.120:3000/api/upload', {
        method: 'POST',
        body: fd
      })
        .then(res => res.json())
        .then(res => {
          console.log('res', res)
          setFile('')
        })
    }
  }
  return (
    <input
      multiple={false}
      type='file'
      className='file-input w-full max-w-xs'
      value={file}
      onChange={handleFileChange}
    />
  )
}

export default Upload
