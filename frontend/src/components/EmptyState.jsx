function EmptyState() {
    return (
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
    )
}

export default EmptyState