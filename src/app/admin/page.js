import LayoutAdmin from "../layouts/admin/LayoutAdmin";

export const metadata = {
  title: 'Admin | Dashboard',
  openGraph: {
    title: 'Dashboard',
    description: 'App surat bpkad'
  }
}

export default function DashboardAdmin() {
  return (
    <LayoutAdmin>
      <h1>Dashboard</h1>
    </LayoutAdmin>
  )
}
