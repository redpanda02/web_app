
function Sidebar() {
    return(
            <aside className="sidebar">
        <div className="brand">Workplace</div>
        <nav className="navigation" aria-label='Main navigation'>
          <a className='navigation-link active' href='/'>
          Dashboard
          </a>
          <a className='navigation-link' href='/items'>
          Items
          </a>
          <a className='navigation-link' href='/settings'>
          Settings
          </a>
        </nav>

        <div className='sidebar-footer'>
            <span className='status-dot'></span>
            Personal Workspace
        </div>
      </aside>
    )
}

export default Sidebar;