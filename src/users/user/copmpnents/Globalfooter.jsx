const sitemap = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
  {
    title: "Products",
    links: ["Templates", "UI Kits", "Icons", "Mockups"],
  },
];

const currentYear = new Date().getFullYear();

export function Globalfooter() {
  return (
    <footer className="relative w-full bg-gray-900 rounded-sm text-white">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {sitemap.map(({ title, links }, key) => (
            <div key={key}>
              <h2 className="mb-4 text-green-400 font-bold uppercase">
                {title}
              </h2>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="inline-block text-sm hover:text-green-300 transition-transform hover:scale-105">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center border-t border-gray-700 py-4 md:flex-row md:justify-between">
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {currentYear}{" "}
            <a
              href="https://material-tailwind.com/"
              className="underline hover:text-green-300">
              Material Tailwind
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
