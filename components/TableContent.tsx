'use client'

import dayjs from 'dayjs'
import { useState } from 'react'

type IFile = {
  name: string
  time: number
  path: string
}

type Props = {
  files: IFile[]
  total: number
}

const origin = window.location?.origin

function TableContent(props: Props) {
  const [page, setPage] = useState(1)
  console.log('TableContent ==>')
  const maxPage = Math.ceil(props.total / 10)

  const handlePre = () => {
    if (page === 1) return
    setPage(page => page - 1)
  }

  const handleNext = () => {
    if (maxPage === page) return
    setPage(page => page + 1)
  }

  return (
    <>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>文件名</th>
            <th>上传时间</th>
            <th>链接</th>
          </tr>
        </thead>
        <tbody>
          {props.files.slice((page - 1) * 10, (page - 1) * 10 + 10).map((file, index) => {
            return (
              <tr
                className='hover'
                key={file.name}
              >
                <th>{index + 1}</th>
                <td>{file.name}</td>
                <td>{dayjs(file.time).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>
                  {origin}
                  {file.path}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='btn-group grid grid-cols-2 mt-[24px] w-[240px] ml-[700px]'>
        <button
          className={`btn btn-outline ${page === 1 ? 'btn-disabled' : ''}`}
          onClick={handlePre}
        >
          上一页
        </button>
        <button
          className={`btn btn-outline ${page === maxPage ? 'btn-disabled' : ''}`}
          onClick={handleNext}
        >
          下一页
        </button>
      </div>
    </>
  )
}

export default TableContent

export const runtime = 'edge'
