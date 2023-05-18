import TableContent from '@/components/TableContent'

export default async function Home() {
  const { total, files } = await fetch('http://localhost:3000/api/files', { cache: 'no-cache' }).then(res => res.json())
  return (
    <div className='overflow-x-auto'>
      <TableContent
        files={files}
        total={total}
      />
    </div>
  )
}

export const config = {
  runtime: 'edge'
}
