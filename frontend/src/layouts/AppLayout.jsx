import Sidebar from "../components/Sidebar"
import DashboardPage from "../pages/DashboardPage"
function AppLayout() {
    return (
    <div className="app-shell">
        <Sidebar />
        <DashboardPage />
    </div>
    )
}

export default AppLayout