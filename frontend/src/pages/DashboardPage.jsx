import EmptyState from "../components/EmptyState"

function DashboardPage() {
    return(
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

          <EmptyState />
        </section>
      </main>
    )
}

export default DashboardPage