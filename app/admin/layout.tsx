import { SidebarProvider } from '@/components/ui/sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="admin-shell">
      {children}
    </SidebarProvider>
  )
}
