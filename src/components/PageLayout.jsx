import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppButton } from "./WhatsAppButton";

export function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
