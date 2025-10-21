export default function Footer() {
  const explore = [
    { name: 'Programs', href: '#' },
    { name: 'Guidance Tools', href: '#' },
    { name: 'Success Stories', href: '#' },
    { name: 'Assessment', href: '#' }
  ];

  const resources = [
    { name: 'Knowledge Base', href: '#' },
    { name: 'Career Guide', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Partner Program', href: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Refund Policy', href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <span className="text-xl font-bold">Upskillers</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your complete career advancement platform for professionals who want to grow.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {explore.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-teal-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-teal-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin" className="hover:text-teal-400 transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Email: hello@upskillers.com</li>
              <li>Helpline: +91 98765 43210</li>
              <li>WhatsApp: +91 90000 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div>© 2025 Upskillers. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            {legal.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-teal-400 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
