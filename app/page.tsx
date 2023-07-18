import TableContent from '@/components/TableContent'
import TableWrapper from '@/components/TableWrapper'

export default async function Home() {
  const { total, files } = await fetch('http://127.0.0.1:3000/api/files', { cache: 'no-cache' }).then(res => res.json())

  return (
    <TableWrapper>
      <TableContent
        files={files}
        total={total}
      />
    </TableWrapper>
  )
}
