export default function FAQ() {
  const faqs = [
    {
      question: 'How quickly do I receive program recommendations?',
      answer: "You'll see AI-generated matches on-screen instantly, with a detailed counselor recap emailed within 10 minutes of submission."
    },
    {
      question: 'Is Upskillers free for learners?',
      answer: 'Yes! All counseling sessions, comparison tools, and guidance are completely free for students. We partner with educational institutions for platform access.'
    },
    {
      question: 'Can I save my progress and return later?',
      answer: 'Absolutely. Your responses auto-save to your browser. Return within 14 days to continue, or request a counselor callback to complete together.'
    },
    {
      question: 'What happens after I submit my assessment?',
      answer: 'Within 24 hours, a dedicated counselor will reach out via your preferred channel (email, phone, or WhatsApp) with personalized program recommendations and next steps.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Questions Before You Start
          </h2>
          <p className="text-xl text-slate-600">
            Clear answers and transparent policies so you never wait for clarity
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
