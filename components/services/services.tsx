'use client'
import { motion } from 'framer-motion'
const services = [
 ['01','HIGH-RETENTION VIDEO EDITING','Short-form, Long-form, Podcast Clips, Social Content'],
 ['02','PERSONAL BRAND CONTENT','Founder Videos, LinkedIn, Reels, YouTube Shorts'],
 ['03','AI / SAAS VIDEO','Product Demos, Explainers, UI Animation, Motion Graphics'],
 ['04','PERFORMANCE CREATIVE','UGC, Product Ads, Meta Ads, Hook Variations'],
]
export default function Services(){return <section className="py-24 md:py-28 px-6 bg-[#080808]"><div className="mx-auto" style={{ maxWidth: 'min(1400px, calc(100% - 64px))' }}><p className="section-kicker">WHAT I DO</p><h2 className="section-title">SERVICES</h2><div className="grid md:grid-cols-2 gap-4 mt-10">{services.map(([n,t,d],i)=><motion.div key={n} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}} className="rounded-2xl border border-white/10 bg-[#161616] p-7 md:p-9 hover:border-[#FF6A00]/50 transition-colors"><span className="text-[#FF6A00] text-sm font-bold">{n}</span><h3 className="font-display text-xl md:text-2xl font-bold mt-6">{t}</h3><p className="text-[#AAA49A] mt-3 leading-7">{d}</p></motion.div>)}</div><div className="mt-12 text-center"><a href="/connect" className="inline-flex rounded-full bg-[#F5F1E8] px-8 py-4 text-sm font-bold text-[#080808] hover:bg-white border border-transparent hover:border-[#FF6A00]/30 transition-all hover:scale-[1.02] hover:-translate-y-0.5">START A PROJECT →</a></div></div></section>}
