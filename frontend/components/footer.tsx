import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0a] py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#d08c60]">Nexus</span>
            </Link>
            <p className="mt-4 text-zinc-400">Build, customize, and deploy AI agents without coding.</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#d08c60]">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#d08c60]">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#d08c60]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-[#d08c60] transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/50 pt-8 text-center text-zinc-400">
          <p>© {new Date().getFullYear()} Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
