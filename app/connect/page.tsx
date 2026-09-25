'use client'
import { useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'

const wa = 'https://wa.me/917280084494?text=Hi%20Karmveer%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20editing%20project.'

export default function ConnectPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    referenceLink: ''
  })
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const change = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: any) => {
    e.preventDefault()
    setState('sending')
    try {
      const r = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const d = await r.json()
      if (!r.ok || !d.success) throw new Error(d.error || 'Something went wrong.')
      setState('success')
      setForm({ name: '', email: '', company: '', projectType: '', message: '', referenceLink: '' })
    } catch (e: any) {
      setError(e.message)
      setState('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}>
          <p className="section-kicker">CONTACT</p>
          <h1 className="section-title">LET&apos;S WORK TOGETHER.</h1>
          <p className="text-[#AAA49A] text-lg mt-4 max-w-2xl">
            Tell me what you&apos;re building. I work with clients in India and internationally.
          </p>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 mt-12">
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 md:p-8">
              {state === 'success' ? (
                <div className="py-16 text-center">
                  <div className="text-[#FF6A00] text-4xl">✓</div>
                  <h2 className="font-display text-2xl font-bold mt-5">Message sent successfully.</h2>
                  <p className="text-[#AAA49A] mt-2">I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      ['name', 'Name', 'text'],
                      ['email', 'Email', 'email'],
                      ['company', 'Company / Brand', 'text']
                    ].map(([n, l, t]) => (
                      <label key={n} className="block">
                        <span className="field-label">{l}</span>
                        <input
                          required={n !== 'company'}
                          type={t}
                          name={n}
                          value={(form as any)[n]}
                          onChange={change}
                          className="field"
                        />
                      </label>
                    ))}
                  </div>
                  <label className="block">
                    <span className="field-label">PROJECT TYPE</span>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={change}
                      className="field"
                    >
                      <option value="">Select project type</option>
                      <option value="Short-form Video">Short-form Video</option>
                      <option value="Long-form Video">Long-form Video</option>
                      <option value="Motion Graphics">Motion Graphics</option>
                      <option value="Performance Ads">Performance Ads</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="field-label">MESSAGE</span>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={change}
                      rows={5}
                      className="field resize-none"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">REFERENCE LINK (OPTIONAL)</span>
                    <input
                      type="url"
                      name="referenceLink"
                      value={form.referenceLink}
                      onChange={change}
                      className="field"
                    />
                  </label>
                  {state === 'error' && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="w-full rounded-full bg-[#FF6A00] px-8 py-4 text-sm font-bold text-black hover:bg-[#FF8533] transition-colors disabled:opacity-50"
                  >
                    {state === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </div>
            <div className="space-y-8">
              <div>
                <p className="field-label">DIRECT CONTACT</p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span>WhatsApp</span>
                  <span>+91 72800 84494</span>
                </a>
                <a href="mailto:karmveerstudio@gmail.com" className="contact-link">
                  <span>Email</span>
                  <span>karmveerstudio@gmail.com</span>
                </a>
              </div>
              <div>
                <p className="field-label">SOCIAL</p>
                <a
                  href="https://www.linkedin.com/in/karmveer-kumar-b5a57b380"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/editwithkarmveer"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <span>Instagram</span>
                </a>
              </div>
              <div>
                <p className="field-label">BASED IN</p>
                <p className="text-[#F5F1E8] mt-4">India · Available worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
