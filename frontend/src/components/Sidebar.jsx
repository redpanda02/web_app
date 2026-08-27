import { NavLink } from "react-router-dom";
function Sidebar() {
    return(
            <aside className="sidebar">
        <div className="brand">Workplace</div>
        <nav className="navigation" aria-label='Main navigation'>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navigation-link active' : 'navigation-link'
          }
          to="/"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navigation-link active' : 'navigation-link'
          }
          to="/items"
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navigation-link active' : 'navigation-link'
          }
          to="/settings"
        >
          Settings
        </NavLink>
        </nav>

        <div className='sidebar-footer'>
            <span className='status-dot'></span>
            Personal Workspace
        </div>
      </aside>
    )
}

export default Sidebar;