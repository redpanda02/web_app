function SettingsPage() {
    return (
        <main className="main-content">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Workspace</p>
                    <h1>Settings</h1>
                    <p className="page-description">
                        Adjust your workspace preferences.
                    </p>
                </div>
            </header>

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