import React from 'react'
import SwitchTheme from './SwitchTheme'
import Upload from './Upload'

function Nav() {
  return (
    <div className='navbar bg-base-100 shadow-lg shadow-#ccc-500/50'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>CDN</a>
      </div>
      <div className='flex-none'>
        <Upload />
        <SwitchTheme />
      </div>
    </div>
  )
}

export default Nav
