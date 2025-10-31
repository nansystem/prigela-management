import SideNavigation from "@/components/SideNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNavigation />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
