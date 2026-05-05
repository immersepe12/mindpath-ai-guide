import CallGate from '@/components/CallGate'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#E8521A]">MindTalk</span>
          <span className="text-xs text-gray-400">by Cadabams</span>
        </div>
        <CallGate location="footer" telNumber="+919741476476">
          <button
            type="button"
            className="inline-flex items-center gap-2.5 bg-[#E8521A] text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#C43D0A] transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Call us: 97414 76476
          </button>
        </CallGate>
        <p className="text-xs text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} Cadabams Group. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
