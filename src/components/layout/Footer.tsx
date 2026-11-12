export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-slate-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} DataPollex LMS</p>
        <p>Simplified Learning Management System</p>
      </div>
    </footer>
  )
}
