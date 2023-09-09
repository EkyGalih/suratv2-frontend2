import LayoutUser from "../layouts/user/LayoutUser";

export const metadata = {
    title: 'User | Dashboard',
    openGraph: {
      title: 'Dashboard',
      description: 'App surat bpkad'
    }
  }

export default function DashboardUser() {
    return (
        <>
        <LayoutUser>
            <h1>Dashboard User</h1>
        </LayoutUser>
        </>
    )
}
