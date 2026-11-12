import PageHeading from '@/components/ui/PageHeading'

export default function AdminLoginPage() {
  return (
    <section>
      <PageHeading
        title="Admin Login"
        description="Authentication will be connected to Better Auth."
      />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        Admin login form will be rendered here.
      </div>
    </section>
  )
}
