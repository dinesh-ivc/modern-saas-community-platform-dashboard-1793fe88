import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CommunityPreview from '@/components/CommunityPreview';
import CompanyInfo from '@/components/CompanyInfo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CommunityPreview />
        <CompanyInfo />
      </main>
      <Footer />
    </div>
  );
}