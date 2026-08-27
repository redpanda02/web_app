import './App.css';

function App() {
  return (
    <div className="app-shell">
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

      <main className='main-content'>
        <header className='page-header'>
          <div>
            <p className='eyebrow'>Overview</p>
            <h1>Dashboard</h1>
            <p className='page-description'>
              Manage your workspace from one calm, focused place.
            </p>
          </div>

          <button className='primary-button' type="button">
            Create Item
          </button>
        </header>
        <section className='content-section' aria-labelledby="items-heading">
          <div className="section-header">
            <div>
                <p className='eyebrow'>Your workspace</p>
                <h2 id="items-heading">Items</h2>
            </div>
            <span className="item-count">0 total</span>
          </div>

          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">
              +
            </div>
            <h3>No items yet</h3>
            <p>Create your first item to get started.</p>
            <button className="secondary-button" type="button">
              Create your first item
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;