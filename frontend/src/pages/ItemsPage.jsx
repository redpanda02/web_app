import EmptyState from "../components/EmptyState"
import PageHeader from "../components/PageHeader"

function ItemsPage() {
    return (
        <main className="main-content">
            <PageHeader
                eyebrow="Your workspace"
                title="Items"
                description="Create and organize the things that matter to you."
                action={
                    <button className="primary-button" type="button">
                        Create item
                    </button>
                }
            />

            <section className="content-section" aria-labelledby="all-items-heading">
                <div className="section-header">
                    <div>
                        <p className="eyebrow">Collection</p>
                        <h2 id="all-items-heading">All items</h2>
                    </div>
                    <span className="item-count">0 total</span>
                </div>

                <EmptyState />
            </section>
        </main>
    )
}

export default ItemsPage