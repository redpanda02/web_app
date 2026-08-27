function ItemsPage() {
    return (
        <main className="main-content">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Your workspace</p>
                    <h1>Items</h1>
                    <p className="page-description">
                        Create and organize the things that matter to you.
                    </p>
                </div>

                <button className="primary-button" type="button">
                    Create item
                </button>
            </header>

            <section className="content-section" aria-labelledby="all-items-heading">
                <div className="section-header">
                    <div>
                        <p className="eyebrow">Collection</p>
                        <h2 id="all-items-heading">All items</h2>
                    </div>
                    <span className="item-count">0 total</span>
                </div>

                <div className="empty-state">
                    <div className="empty-icon" aria-hidden="true">
                        +
                    </div>
                    <h3>Your collection is empty</h3>
                    <p>Add an item to start building your workspace.</p>
                    <button className="secondary-button" type="button">
                        Add an item
                    </button>
                </div>
            </section>
        </main>
    )
}

export default ItemsPage