import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <main className="main-content">
            <div className="empty-state">
                <p className="eyebrow">404 error</p>
                <h1>Page not found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link className="secondary-button" to="/">
                    Return to dashboard
                </Link>
            </div>
        </main>
    )
}

export default NotFoundPage