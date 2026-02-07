import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, YoutubeIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.sarcoinswap.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://blog.sarcoinswap.finance/",
      },
      {
        label: "Community",
        href: "https://docs.sarcoinswap.finance/contact-us/telegram",
      },
      {
        label: "SRS",
        href: "https://docs.sarcoinswap.finance/tokenomics/sarcoin",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://sarcoinswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.sarcoinswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.sarcoinswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.sarcoinswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/sarcoinswap",
      },
      {
        label: "Documentation",
        href: "https://docs.sarcoinswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@sarcoinswap-1/s/sarcoinswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.sarcoinswap.finance/help/faq#is-sarcoinswap-safe-has-sarcoinswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.sarcoinswap.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/sarcoinswap",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/sarcoinswap",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/sarcoinswapIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/sarcoinswap_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/sarcoinswapVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/sarcoinswap_Ita",
      },
      {
        label: "русский",
        href: "https://t.me/sarcoinswap_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/sarcoinswapturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/sarcoinswapPortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/sarcoinswapES",
      },
      {
        label: "日本語",
        href: "https://t.me/sarcoinswapJP",
      },
      {
        label: "Français",
        href: "https://t.me/sarcoinswapFR",
      },
      {
        label: "Deutsch",
        href: "https://t.me/sarcoinswap_DE",
      },
      {
        label: "Filipino",
        href: "https://t.me/sarcoinswap_PH",
      },
      {
        label: "ქართული ენა",
        href: "https://t.me/sarcoinswapGeorgia",
      },
      {
        label: "हिन्दी",
        href: "https://t.me/sarcoinswap_INDIA",
      },
      {
        label: "Announcements",
        href: "https://t.me/sarcoinswapAnn",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/sarcoinswap",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/sarcoinswap_official",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/sarcoinswap/",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/sarcoinswap",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    href: "https://www.youtube.com/@sarcoinswap_official",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
