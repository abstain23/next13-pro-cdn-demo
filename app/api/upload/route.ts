import { PageConfig } from 'next'
import fs from 'fs'
import path from 'path'

const cwd = process.cwd()

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file || typeof file === 'string') {
    return new Response(
      JSON.stringify({
        msg: 'no file'
      }),
      {
        status: 400
      }
    )
  }
  const ab = await file.arrayBuffer()
  const bf = Buffer.from(ab)
  await fs.promises.writeFile(path.join(cwd, 'upload', file.name), bf, { encoding: 'binary' })
  return new Response(
    JSON.stringify({
      msg: 'ok',
      name: file.name
    }),
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  )
}
export const config: PageConfig = {
  api: {
    // bodyParser
  }
}
