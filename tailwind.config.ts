import type { Config } from 'tailwindcss'
const config:Config={content:['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],theme:{extend:{colors:{background:{50:'#080808',100:'#111111',200:'#161616',300:'#1c1c1c'},accent:{orange:'#FF6A00'}},fontFamily:{sans:['var(--font-inter)','system-ui','sans-serif'],display:['var(--font-space-grotesk)','system-ui','sans-serif']}}},plugins:[]}
export default config
