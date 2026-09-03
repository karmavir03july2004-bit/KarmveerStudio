import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-50">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
            BEHIND THE EDIT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">About</h2>
                <p className="text-white/60 leading-relaxed">
                  Karmveer Kumar is a Video Editor & Motion Graphics Designer passionate about
                  transforming raw footage into compelling visual narratives. With a keen eye for
                  detail and a deep understanding of storytelling, Karmveer helps creators and brands
                  communicate their messages through powerful visual content.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Philosophy</h2>
                <p className="text-white/60 leading-relaxed">
                  Every frame matters. Great video editing is not just about cutting footage—it is about
                  crafting rhythm, emotion, and meaning. I believe in the power of visual storytelling
                  to connect with audiences on a deeper level.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Skills</h2>
                <ul className="text-white/60 space-y-2">
                  <li>• Video Editing & Post-Production</li>
                  <li>• Motion Graphics Design</li>
                  <li>• Color Grading & Correction</li>
                  <li>• SaaS Product Animation</li>
                  <li>• Visual Storytelling</li>
                  <li>• Sound Design Integration</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Software</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-background-100 rounded-lg border border-white/10">
                    <p className="font-medium">DaVinci Resolve</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg border border-white/10">
                    <p className="font-medium">Adobe Premiere Pro</p>
                  </div>
                  <div className="p-4 bg-background-100 rounded-lg border border-white/10">
                    <p className="font-medium">Adobe After Effects</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Workflow</h2>
                <p className="text-white/60 leading-relaxed">
                  My workflow is designed for efficiency and quality. From initial project discovery
                  through final delivery, I maintain clear communication and attention to detail.
                  Every project goes through a structured process of editing, refinement, and quality
                  assurance to ensure the final output exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
