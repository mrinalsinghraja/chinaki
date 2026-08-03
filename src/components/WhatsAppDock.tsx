import { site, whatsappUrl } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

/**
 * The one control that follows the visitor down every page. Chinaki's
 * real intake channel is WhatsApp, so it stays reachable without
 * hunting for the contact page.
 */
export function WhatsAppDock() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="dock"
      aria-label={`Message Chinaki on WhatsApp at ${site.phone}`}
    >
      <IconWhatsApp size={19} />
      <span className="dock-text">WhatsApp</span>
    </a>
  );
}
