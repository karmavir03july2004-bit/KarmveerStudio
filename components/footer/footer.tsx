import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display font-bold text-lg mb-4">
              KARMVEER STUDIO
            </h3>
            <p className="text-white/60 text-sm">
              Video Editor · Motion Graphics Designer
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4 text-white/80">NAVIGATION</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-white/60 text-sm hover:text-white transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/connect" className="text-white/60 text-sm hover:text-white transition-colors">
                  Connect
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-4 text-white/80">SOCIAL</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/editwithkarmveer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © 2026 Karmveer Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
