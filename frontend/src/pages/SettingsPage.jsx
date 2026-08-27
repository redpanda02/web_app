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

                <form>
                    <label htmlFor="workspace-name">Workspace name</label>
                    <input id="workspace-name" name="workspaceName" defaultValue="Workplace" />

                    <label htmlFor="workspace-description">Description</label>
                    <textarea
                        id="workspace-description"
                        name="workspaceDescription"
                        defaultValue="Personal workspace"
                        rows="4"
                    />

                    <button className="primary-button" type="submit">
                        Save changes
                    </button>
                </form>
            </section>
        </main>
    )
}

export default SettingsPage