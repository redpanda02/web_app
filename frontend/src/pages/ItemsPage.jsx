import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { useItemForm } from '../hooks/useItemForm'

function ItemsPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [feedback, setFeedback] = useState({ type: '', message: '' })
    const {
        showForm,
        editingId,
        formValues,
        setFormValues,
        resetForm,
        startCreate,
        startEdit,
    } = useItemForm()

    const formError = useMemo(() => {
        if (!formValues.title.trim()) {
            return 'Title is required.'
        }

        if (!formValues.description.trim()) {
            return 'Description is required.'
        }

        return ''
    }, [formValues])

    async function loadItems() {
        try {
            const response = await fetch('/api/items')
            if (!response.ok) {
                throw new Error('Unable to load items')
            }

            const data = await response.json()
            setItems(data)
            setLoadError('')
        } catch (error) {
            console.error('Failed to fetch items', error)
            setItems([])
            setLoadError('Unable to load items. Check that the API is running and try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadItems()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        if (formError) {
            setFeedback({ type: 'error', message: formError })
            return
        }

        setIsSubmitting(true)
        setFeedback({ type: '', message: '' })

        const payload = {
            title: formValues.title.trim(),
            description: formValues.description.trim(),
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

            setFeedback({
                type: 'success',
                message: editingId ? 'Item updated successfully.' : 'Item created successfully.',
            })
            resetForm()
            await loadItems()
        } catch (error) {
            console.error('Failed to save item', error)
            setFeedback({ type: 'error', message: 'Something went wrong while saving the item.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm('Delete this item?')
        if (!confirmed) {
            return
        }

        setDeletingId(id)
        setFeedback({ type: '', message: '' })

        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Delete failed')
            }

            setFeedback({ type: 'success', message: 'Item deleted successfully.' })
            await loadItems()
        } catch (error) {
            console.error('Failed to delete item', error)
            setFeedback({ type: 'error', message: 'Unable to delete this item.' })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <main className="main-content">
            <PageHeader
                eyebrow="Your workspace"
                title="Items"
                description="Create and organize the things that matter to you."
                action={
                    <button className="primary-button" type="button" onClick={startCreate} disabled={isSubmitting || deletingId !== null}>
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

                {feedback.message && (
                    <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
                )}

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

                        {formError && <p className="field-error">{formError}</p>}

                        <div className="form-actions">
                            <button
                                className="primary-button"
                                type="submit"
                                disabled={isSubmitting || !!formError}
                            >
                                {isSubmitting ? 'Saving...' : editingId ? 'Save changes' : 'Create item'}
                            </button>
                            <button className="secondary-button" type="button" onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <p>Loading items...</p>
                ) : loadError ? (
                    <div className="error-state">
                        <p>{loadError}</p>
                        <button className="secondary-button" type="button" onClick={() => { setLoading(true); loadItems() }}>
                            Try again
                        </button>
                    </div>
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
                                    <button className="secondary-button" type="button" onClick={() => startEdit(item)} disabled={deletingId !== null}>
                                        Edit
                                    </button>
                                    <button className="primary-button danger-button" type="button" onClick={() => handleDelete(item.id)} disabled={deletingId !== null}>
                                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
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