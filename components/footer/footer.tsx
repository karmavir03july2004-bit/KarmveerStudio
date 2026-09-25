import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto px-6 py-14" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="font-display font-bold text-lg">KARMVEER STUDIO</h2>
            <p className="text-[#AAA49A] text-sm mt-3">
              Video Editor &amp; Motion Designer
            </p>
            <p className="text-[#AAA49A] text-sm mt-2 max-w-sm">
              High-Retention Content &amp; Performance Ads for AI, SaaS &amp;
              Personal Brands.
            </p>
          </div>
          <div>
            <p className="footer-label">NAVIGATION</p>
            <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm">
              <Link
                href="/"
                className="text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/works"
                className="text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/reviews"
                className="text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                Reviews
              </Link>
              <Link
                href="/connect"
                className="text-[#AAA49A] hover:text-[#F5F1E8] transition-colors"
              >
                Connect
              </Link>
            </div>
          </div>
          <div>
            <p className="footer-label">CONTACT</p>
            <div className="mt-4 space-y-3 text-sm text-[#AAA49A]">
              <a
                href="mailto:karmveerstudio@gmail.com"
                className="block hover:text-[#F5F1E8] transition-colors"
              >
                karmveerstudio@gmail.com
              </a>
              <a
                href="https://wa.me/917280084494"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#F5F1E8] transition-colors"
              >
                WhatsApp · +91 72800 84494
              </a>
              <a
                href="https://www.linkedin.com/in/karmveer-kumar-b5a57b380"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#F5F1E8] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/editwithkarmveer"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#F5F1E8] transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-7 border-t border-white/10 text-xs text-[#AAA49A]">
          © 2026 Karmveer Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
