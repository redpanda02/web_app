import { useEffect, useState } from 'react'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
function DashboardPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await fetch('/api/items')
                if (!response.ok) {
                    throw new Error('Unable to load dashboard items')
                }

                const data = await response.json()
                setItems(data)
                setLoadError('')
            } catch (error) {
                console.error('Failed to fetch dashboard data', error)
                setItems([])
                setLoadError('Unable to load dashboard data. Check that the API is running and try again.')
            } finally {
                setLoading(false)
            }
        }

        loadItems()
    }, [])

    return (
        <main className="main-content">
            <PageHeader
                eyebrow="Overview"
                title="Dashboard"
                description="Manage your workspace from one calm, focused place."
                
            />

            <section className="content-section" aria-labelledby="items-heading">
                <div className="section-header">
                    <div>
                        <p className="eyebrow">Your workspace</p>
                        <h2 id="items-heading">Items</h2>
                    </div>
                    <span className="item-count">{items.length} total</span>
                </div>

                {loading ? (
                    <p>Loading items...</p>
                ) : loadError ? (
                    <p className="error-state">{loadError}</p>
                ) : items.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ul className="item-list">
                        {items.map((item) => (
                            <li key={item.id} className="item-card">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}
export default DashboardPage