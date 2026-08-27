import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import ItemsPage from '../pages/ItemsPage'
import SettingsPage from '../pages/SettingsPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/items' element={<ItemsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes