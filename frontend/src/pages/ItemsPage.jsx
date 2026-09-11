import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'

function ItemsPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formValues, setFormValues] = useState({ title: '', description: '' })

    async function loadItems() {
        try {
            const response = await fetch('/api/items')
            if (!response.ok) {
                throw new Error('Unable to load items')
            }

            const data = await response.json()
            setItems(data)
        } catch (error) {
            console.error('Failed to fetch items', error)
            setItems([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadItems()
    }, [])

    function resetForm() {
        setShowForm(false)
        setEditingId(null)
        setFormValues({ title: '', description: '' })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const payload = {
            title: formValues.title.trim(),
            description: formValues.description.trim(),
        }

        if (!payload.title || !payload.description) {
            return
        }

        try {
            const method = editingId ? 'PUT' : 'POST'
            const url = editingId ? `/api/items/${editingId}` : '/api/items'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error('Save failed')
            }

            resetForm()
            await loadItems()
        } catch (error) {
            console.error('Failed to save item', error)
        }
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Delete failed')
            }

            await loadItems()
        } catch (error) {
            console.error('Failed to delete item', error)
        }
    }

    function startCreate() {
        resetForm()
        setShowForm(true)
    }

    function startEdit(item) {
        setEditingId(item.id)
        setFormValues({ title: item.title, description: item.description })
        setShowForm(true)
    }

    return (
        <main className="main-content">
            <PageHeader
                eyebrow="Your workspace"
                title="Items"
                description="Create and organize the things that matter to you."
                action={
                    <button className="primary-button" type="button" onClick={startCreate}>
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
                    <span className="item-count">{items.length} total</span>
                </div>

                {showForm && (
                    <form className="item-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <label>
                                <span>Title</span>
                                <input
                                    type="text"
                                    value={formValues.title}
                                    onChange={(event) =>
                                        setFormValues((current) => ({
                                            ...current,
                                            title: event.target.value,
                                        }))
                                    }
                                />
                            </label>

                            <label>
                                <span>Description</span>
                                <textarea
                                    rows="3"
                                    value={formValues.description}
                                    onChange={(event) =>
                                        setFormValues((current) => ({
                                            ...current,
                                            description: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>

                        <div className="form-actions">
                            <button className="primary-button" type="submit">
                                {editingId ? 'Save changes' : 'Create item'}
                            </button>
                            <button className="secondary-button" type="button" onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <p>Loading items...</p>
                ) : items.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ul className="item-list">
                        {items.map((item) => (
                            <li key={item.id} className="item-card">
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>

                                <div className="item-actions">
                                    <button className="secondary-button" type="button" onClick={() => startEdit(item)}>
                                        Edit
                                    </button>
                                    <button className="primary-button" type="button" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}
export default ItemsPage