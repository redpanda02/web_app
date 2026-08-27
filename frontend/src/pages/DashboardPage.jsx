import EmptyState from "../components/EmptyState"
import PageHeader from "../components/PageHeader"

function DashboardPage() {
    return(
        <main className='main-content'>
        <PageHeader
          eyebrow="Overview"
          title="Dashboard"
          description="Manage your workspace from one calm, focused place."
          action={
            <button className="primary-button" type="button">
              Create item
            </button>
          }
        />
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