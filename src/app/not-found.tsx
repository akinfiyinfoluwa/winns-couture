import Link from 'next/link';
import TopBanner from '@/components/layout/Banner/TopBanner';
import TopNavbar from '@/components/layout/Navbar/TopNavbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <TopBanner />
      <TopNavbar />
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 px-4 py-2 text-white bg-black rounded-md"
        >
          Go back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
