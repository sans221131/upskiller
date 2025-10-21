import Link from 'next/link';

export const metadata = {
  title: 'Thank You - Upskillers',
  description: 'Your application has been submitted successfully.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            You're All Set! 🎉
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your personalized program recommendations are on their way.
          </p>

          {/* What's Next */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-bold text-lg text-slate-900 mb-4">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Check your email (2 minutes)</div>
                  <div className="text-sm text-slate-600">We've sent your program matches and counselor summary to your inbox</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Counselor callback (24 hours)</div>
                  <div className="text-sm text-slate-600">A dedicated advisor will reach out via your preferred channel</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Personalized guidance</div>
                  <div className="text-sm text-slate-600">Get help with applications, EMI options, and scholarship opportunities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-teal-600">24h</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-teal-600">4.8★</div>
              <div className="text-sm text-slate-600">Student Rating</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-teal-600">35K+</div>
              <div className="text-sm text-slate-600">Careers Transformed</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-full font-semibold transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/programs"
              className="px-8 py-4 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-full font-semibold transition-all"
            >
              Browse Programs
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-slate-200 text-sm text-slate-600">
            <p className="mb-2">Have questions? We're here to help!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span>📧 hello@upskillers.com</span>
              <span>📞 +91 98765 43210</span>
              <span>💬 WhatsApp Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
