import LayoutAgendaris from "../layouts/agendaris/LayoutAgendaris"

export const metadata = {
  title: 'Admin | Dashboard',
  openGraph: {
    title: 'Dashboard',
    description: 'App surat bpkad'
  }
}

export default function DashboardAdmin() {
  return (
    <LayoutAgendaris>
      <h1>Dashboard</h1>
    </LayoutAgendaris>
  )
}
