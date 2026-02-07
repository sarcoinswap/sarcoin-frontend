import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("Ecosystem"),
    items: [
      {
        label: t("Trade"),
        href: "/swap",
      },
      {
        label: t("Earn"),
        href: "/farms",
      },
      {
        label: t("Play"),
        href: "/prediction",
      },
      {
        label: t("NFT"),
        href: "/nfts",
      },
      {
        label: t("Tokenomics"),
        href: "https://docs.sarcoinswap.finance/governance-and-tokenomics/sarcoin-tokenomics",
      },
      {
        label: t("Litepaper"),
        href: "https://assets.sarcoinswap.finance/litepaper/v2litepaper.pdf",
      },
      {
        label: t("SRS Emission Projection"),
        href: "https://analytics.sarcoinswap.finance/",
      },
      {
        label: t("Merchandise"),
        href: "https://merch.sarcoinswap.finance/",
      },
    ],
  },
  {
    label: "Business",
    items: [
      {
        label: t("Farms and Pools"),
        href: "https://docs.sarcoinswap.finance/ecosystem-and-partnerships/business-partnerships/syrup-pools-and-farms",
      },
      {
        label: t("IFO"),
        href: "https://docs.sarcoinswap.finance/ecosystem-and-partnerships/business-partnerships/initial-farm-offerings-ifos",
      },
      {
        label: t("NFT Marketplace"),
        href: "https://docs.sarcoinswap.finance/ecosystem-and-partnerships/business-partnerships/nft-market-applications",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      {
        label: t("Contributing"),
        href: "https://docs.sarcoinswap.finance/developers/contributing",
      },
      {
        label: t("Github"),
        href: "https://github.com/sarcoinswap",
      },
      {
        label: t("Bug Bounty"),
        href: "https://docs.sarcoinswap.finance/developers/bug-bounty",
      },
    ],
  },
  {
    label: t("Support"),
    items: [
      {
        label: t("Contact"),
        href: "https://docs.sarcoinswap.finance/contact-us/customer-support",
      },
      {
        label: t("Troubleshooting"),
        href: "https://docs.sarcoinswap.finance/readme/help/troubleshooting",
      },
      {
        label: t("Documentation"),
        href: "https://docs.sarcoinswap.finance/",
      },
    ],
  },
  {
    label: t("About"),
    items: [
      {
        label: t("Terms Of Service"),
        href: "https://sarcoinswap.finance/terms-of-service",
      },
      {
        label: t("Blog"),
        href: "https://blog.sarcoinswap.finance/",
      },
      {
        label: t("Brand Assets"),
        href: "https://docs.sarcoinswap.finance/ecosystem-and-partnerships/brand",
      },
      {
        label: t("Careers"),
        href: "https://docs.sarcoinswap.finance/team/become-a-chef",
      },
    ],
  },
];
