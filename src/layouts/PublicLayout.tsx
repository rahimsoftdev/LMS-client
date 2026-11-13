import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
