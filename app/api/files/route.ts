import fs from 'fs'
import { PageConfig } from 'next'
import path from 'path'

const cwd = process.cwd()
export const GET = async () => {
  try {
    const uploadDir = path.join(cwd, 'upload')
    const files = await fs.promises.readdir(uploadDir)
    const fileInfoList = [] as any[]
    for (let file of files) {
      const info = await fs.promises.stat(path.join(uploadDir, file))
      fileInfoList.push({
        size: info.size,
        time: info.birthtimeMs,
        path: `/cdn/${file}`,
        name: file
      })
    }
    return new Response(
      JSON.stringify({
        code: 0,
        msg: 'ok',
        total: files.length,
        files: fileInfoList
      })
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: 'server error',
        error
      }),
      {
        status: 500
      }
    )
  }
}
