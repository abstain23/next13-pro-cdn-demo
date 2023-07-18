'use client'
import React from 'react'

const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='overflow-x-auto'>{children}</div>
}

export default TableWrapper
