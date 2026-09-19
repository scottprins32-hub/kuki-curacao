import { site } from "@/data/site";

export const dynamic = "force-static";

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Calendar file for the next Coffee Party — opens straight into iOS/Android calendar from the phone. */
export function GET() {
  const p = site.nextParty;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kuki Curacao//Coffee Party//EN",
    "BEGIN:VEVENT",
    `UID:coffee-party-${stamp(p.when)}@kuki-curacao`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(p.when)}`,
    `DTEND:${stamp(p.until)}`,
    `SUMMARY:Kuki Coffee Party${p.confirmed ? "" : " (date to be confirmed)"}`,
    `DESCRIPTION:${p.line} New drop at Kuki. ${site.instagram}`,
    `LOCATION:Kuki, ${site.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="kuki-coffee-party.ics"' },
  });
}
