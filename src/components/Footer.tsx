import { A } from "@solidjs/router";
import { For } from "solid-js";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-solid";

interface FooterLink {
  href: string;
  label: string;
}

interface SocialMedia {
  name: string;
  href: string;
  icon: any;
}

const FOOTER_LINKS: FooterLink[] = [
  { href: "/about-us", label: "เกี่ยวกับเรา" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/contact-us", label: "ติดต่อเรา" },
];

const SOCIAL_MEDIA: SocialMedia[] = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export default function Footer() {
  return (
    <footer class="bg-black border-t border-yellow-500/20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="py-12 lg:py-16">
          {/* Main Footer Content */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div class="flex flex-col space-y-4">
              <A href="/home" class="flex items-center mb-2">
                <img
                  src="/stranger-shop.png"
                  alt="Stranger Shop Logo"
                  class="h-12 w-12 object-contain"
                />
              </A>
              <p class="text-sm text-gray-400 leading-relaxed">
                Stranger Shop - ร้านหนังสือและสินค้าลึกลับ
                <br />
                ค้นพบเรื่องราวที่น่าตื่นเต้นและสินค้าพิเศษ
              </p>
            </div>

            {/* Quick Links */}
            <div class="flex flex-col space-y-4">
              <h3 class="text-yellow-500 font-medium text-sm uppercase tracking-wider">
                ลิงก์ด่วน
              </h3>
              <nav class="flex flex-col space-y-3">
                <For each={FOOTER_LINKS}>
                  {(item) => (
                    <A
                      href={item.href}
                      class="text-sm text-gray-400 hover:text-yellow-500 transition-colors w-fit"
                    >
                      {item.label}
                    </A>
                  )}
                </For>
              </nav>
            </div>

            {/* Contact Info */}
            <div class="flex flex-col space-y-4">
              <h3 class="text-yellow-500 font-medium text-sm uppercase tracking-wider">
                ติดต่อเรา
              </h3>
              <div class="flex flex-col space-y-3 text-sm text-gray-400">
                <p>อีเมล: contact@strangershop.com</p>
                <p>โทร: 02-XXX-XXXX</p>
                <p class="leading-relaxed">
                  ที่อยู่: กรุงเทพมหานคร
                  <br />
                  ประเทศไทย
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div class="flex flex-col space-y-4">
              <h3 class="text-yellow-500 font-medium text-sm uppercase tracking-wider">
                ติดตามเรา
              </h3>
              <div class="flex items-center space-x-4">
                <For each={SOCIAL_MEDIA}>
                  {(social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="p-2 rounded-full bg-gray-900 border border-yellow-500/20 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        <Icon class="w-5 h-5" />
                      </a>
                    );
                  }}
                </For>
              </div>
              <p class="text-xs text-gray-500 mt-4">
                ติดตามข่าวสารและอัปเดตล่าสุด
              </p>
            </div>
          </div>

          {/* Divider */}
          <div class="border-t border-yellow-500/10"></div>

          {/* Copyright */}
          <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-xs text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Stranger Shop. สงวนลิขสิทธิ์
            </p>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <a href="#" class="hover:text-yellow-500 transition-colors">
                นโยบายความเป็นส่วนตัว
              </a>
              <span class="h-3 w-px bg-yellow-500/30"></span>
              <a href="#" class="hover:text-yellow-500 transition-colors">
                เงื่อนไขการใช้งาน
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
