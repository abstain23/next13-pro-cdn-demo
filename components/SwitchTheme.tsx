'use client'

import React, { useEffect } from 'react'
import { themeChange } from 'theme-change'

function SwitchTheme() {
  useEffect(() => {
    themeChange(false)
  }, [])

  console.log('SwitchTheme ===>')

  return (
    <div>
      🌞
      <div className='inline-block w-10'>
        <span
          data-toggle-theme='dark'
          data-act-class='pl-4'
          className='border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0'
        >
          <span className='rounded-full w-3 h-3 m-1 bg-green-700'></span>
        </span>
      </div>
      🌚
    </div>
  )
}

export default SwitchTheme
