import PageHeader from "../components/PageHeader"

function SettingsPage() {
    return (
        <main className="main-content">
            <PageHeader
                eyebrow="Workspace"
                title="Settings"
                description="Adjust your workspace preferences."
            />

            <section className="content-section" aria-labelledby="profile-heading">
                <div className="section-header">
                    <div>
                        <p className="eyebrow">Preferences</p>
                        <h2 id="profile-heading">Profile</h2>
                    </div>
                </div>

                
            </section>
        </main>
    )
}

export default SettingsPage