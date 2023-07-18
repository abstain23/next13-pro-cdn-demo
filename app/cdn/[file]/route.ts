import fs from 'fs'
import path from 'path'

import mime from 'mime'
import { redirect } from 'next/navigation'
import { Stream } from 'stream'

const dev = process.env.NODE_ENV !== 'production'
const cwd = process.cwd()

const getContentType = (fileName: string) => {
  const ext = fileName.split('.').pop() || ''
  const type = mime.getType(ext)
  console.log('type', type)
  return type
}

async function streamToBuffer(stream: Stream) {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>()

    stream.on('data', chunk => _buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(_buf)))
    stream.on('error', err => reject(`error converting stream - ${err}`))
  })
}

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
    await fs.promises.stat(filePath)

    const stream = fs.createReadStream(filePath)

    // console.log('Stream', stream)

    // const s = Buffer.from(stream)
    // const blob = Buffer.from(stream)

    const buffer = await streamToBuffer(stream)

    // console.log('getContentType(filePath)', getContentType(filePath))

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'image/' + getContentType(filePath)
    }
    if (!dev) {
      headers['Cache-Control'] = 'public, max-age=31536000'
    }

    return new Response(buffer, {
      status: 200,
      headers
    })
  } catch (error) {
    return redirect('/404')
  }
}

export const runtime = 'nodejs' // 'nodejs' is the default
