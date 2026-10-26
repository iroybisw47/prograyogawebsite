import Link from "next/link";
import { Wordmark } from "./wordmark";

type Page = "home" | "studios" | "trainers";

const LINK = "text-muted transition-colors duration-150 hover:text-brand";

/** Link hover color follows the page's theme accent (`text-brand`). */
export function SiteFooter({ page }: { page: Page }) {
  return (
    <footer className={`bg-white ${page === "home" ? "border-t border-rule" : ""}`}>
      <div className="page-container flex flex-wrap items-center gap-x-8 gap-y-4 py-9">
        <Wordmark height={22} color={page === "studios" ? "purple" : "navy"} />
        <span className="text-[13px] text-caption">Progra is an iOS app.</span>
        <span className="flex-1" />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium">
          {page !== "home" && (
            <Link href="/" className={LINK}>
              Home
            </Link>
          )}
          <Link href="/studios" className={LINK}>
            For studios
          </Link>
          <Link href="/trainers" className={LINK}>
            For trainers
          </Link>
          <a href="https://instagram.com/progra.world" target="_blank" rel="noopener noreferrer" className={LINK}>
            Instagram
          </a>
          {/* TODO: point these at the real pages once they exist. */}
          <a href="#" className={LINK}>
            Privacy policy
          </a>
          <a href="#" className={LINK}>
            Terms of service
          </a>
        </nav>
      </div>
    </footer>
  );
}
