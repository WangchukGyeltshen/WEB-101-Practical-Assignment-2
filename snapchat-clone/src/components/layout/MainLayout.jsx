import Navbar from '../ui/Navbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
