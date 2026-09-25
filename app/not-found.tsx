import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-50">
      <Navbar />

      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-8xl md:text-9xl font-bold mb-4 text-white/10">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            PAGE NOT FOUND
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-background-50 font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            RETURN HOME
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
