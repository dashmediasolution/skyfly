import { PreFooterBanner } from '@/components/home_components/PreFooterBanner';
import { Footer } from '@/components/main_components/Footer';
import SiteHeader from '@/components/main_components/SiteHeader';
import Navbar from '@/components/homePage/Navbar';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5EB]/50">
      <Navbar /> 
      <main className="flex-grow ">
        {children}
      </main>
       <Footer />
    </div>
  );
}
