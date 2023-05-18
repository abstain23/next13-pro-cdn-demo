import fs, { promises } from 'fs'
import path from 'path'

import { redirect } from 'next/navigation'

const dev = process.env.NODE_ENV !== 'production'
const cwd = process.cwd()

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { file: string }
  }
) {
  const filePath = path.join(cwd, 'upload', params.file)

  try {
    await promises.stat(filePath)
    const stream = fs.createReadStream(filePath, {
      encoding: 'utf-8'
    }) as unknown as ReadableStream

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'charset=utf-8'
    }
    if (!dev) {
      headers['Cache-Control'] = 'public, max-age=31536000'
    }

    return new Response(stream, {
      status: 200,
      headers
    })
  } catch (error) {
    return redirect('/404')
  }
}
