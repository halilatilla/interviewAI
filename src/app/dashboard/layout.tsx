import Sidebar from '@/components/Sidebar';

const layoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container grid md:grid-cols-[290px_1fr] gap-10 min-h-screen border-t">
      <div className="hidden py-8 h-full md:flex md:w-72 md:flex-col border-r">
        <Sidebar />
      </div>
      <main className="py-10">{children}</main>
    </div>
  );
};

export default layoutDashboard;
