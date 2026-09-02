# Deploying chinaki.co.in

Target: **https://chinaki.co.in** (apex canonical, `www` redirects to it).
The site is fully static — every route prerenders. No database, no
environment variables, no API keys.

Accounts — this project is deliberately **separate from MSRX**. GitHub,
Vercel and the domain registrar all sit under the business owner's own
accounts. The specific account names are not recorded here: this repository
is public, and account topology is a thing to hand over in person rather
than publish. Check which one you are signed in as before deploying.

---

## 0. Authenticate first (owner only)

Claude cannot enter passwords, so both CLIs have to be signed in by hand.
Check who you currently are before doing anything:

```bash
gh auth status && npx vercel whoami
```

If either answers `mrinalsinghraja` / `mrinalsinghraja-4270`, that is the
MSRX identity and this project must not be pushed there. Switch:

```bash
gh auth logout --hostname github.com && gh auth login --hostname github.com --git-protocol https --web
```

```bash
npx vercel logout && npx vercel login
```

The GitHub account is **Sign in with Google**, so the browser flow is the
only path — there is no password to type. On the Vercel prompt choose
**Continue with GitHub** so both identities match.

---

## 1. Push the repository

```bash
gh repo create chinaki --private --source=. --remote=origin --push
```

---

## 2. Deploy

```bash
npx vercel link && npx vercel --prod --yes
```

**If the deploy is refused with `Vulnerable version of Next.js detected`:**
Vercel blocks deploys on Next versions carrying an open CVE. The fix is to
move *forward* to a patched release — this project pins `next@15.5.22`
exactly for that reason. Do **not** run `npm audit fix --force`; it proposes
`next@9.3.3`, a six-year downgrade. The remaining high advisories are
`postcss` and `sharp` vendored *inside* Next and cannot be resolved here.

---

## 3. DNS at GoDaddy

Add the domain in Vercel first (Project → Settings → Domains → add
`chinaki.co.in` **and** `www.chinaki.co.in`, then set `www` to redirect to
the apex). Vercel prints the exact records to use — **prefer what the
dashboard shows over the table below**, because Vercel has begun issuing
`216.198.79.1` to newer projects instead of the long-standing apex IP.

Two existing records must be **edited, not added** — GoDaddy rejects a
duplicate name:

| Action | Type | Name | Value | TTL |
| --- | --- | --- | --- | --- |
| **Edit** the `Parked` record | `A` | `@` | `76.76.21.21` | 600 |
| **Edit** (currently `chinaki.co.in.`) | `CNAME` | `www` | `cname.vercel-dns.com` | 600 |

Leave everything else alone — the two `NS` records, the `SOA`,
`_domainconnect` and the `_dmarc` `TXT` are not ours to touch.

Verify:

```bash
dig +short chinaki.co.in      # -> 76.76.21.21 (or the IP Vercel showed)
dig +short www.chinaki.co.in  # -> cname.vercel-dns.com.
```

Propagation is usually minutes at TTL 600. Vercel issues the certificate
automatically once the records resolve.

Note for anyone who has deployed the MSRX projects: `vercel alias set` was
the right tool there because `msrx.co.in` was already a domain inside that
Vercel account. It is **not** right here — `chinaki.co.in` is a new apex in
a different account, so it goes through Domains + real DNS records.

---

## 4. Smoke test

```bash
for p in / /services /services/business-services /services/tax-services \
  /services/government-services /services/employee-services \
  /services/student-services /services/documentation-services \
  /about /why-chinaki /faqs /contact /privacy-policy /terms \
  /sitemap.xml /robots.txt /opengraph-image; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' https://chinaki.co.in$p)  $p"
done
```

All 200. `/nope-404` should return 404.

---

## Re-checking contrast after a token change

Every colour pair is measured, and measured against the **darkest surface
the token actually lands on** — not the page ground. Paste into the browser
console on any page:

```js
const lum = (h) => { const [r,g,b] = h.match(/\w\w/g).map(x => parseInt(x,16)/255)
  .map(c => c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4);
  return 0.2126*r + 0.7152*g + 0.0722*b; };
const cr = (a,b) => { const [x,y] = [lum(a),lum(b)].sort((p,q)=>q-p);
  return ((x+0.05)/(y+0.05)).toFixed(2); };
const v = (n) => getComputedStyle(document.documentElement)
  .getPropertyValue(n).trim();

// on paper: measure against --color-sunk, the darkest paper band
[['ink','sunk'],['ink-muted','sunk'],['ink-faint','sunk'],['muga','sunk']]
  .forEach(([f,b]) => console.log(f,'on',b, cr(v(`--color-${f}`), v(`--color-${b}`))));

// on navy: measure against --color-navy-deep, the darkest navy
[['on-navy','navy-deep'],['on-navy-muted','navy-deep'],
 ['gold-lift','navy-deep'],['gold','navy-deep']]
  .forEach(([f,b]) => console.log(f,'on',b, cr(v(`--color-${f}`), v(`--color-${b}`))));
```

Everything must clear 4.5:1, including the 11px mono labels. An earlier
`--color-ink-faint` passed on the ground at 4.67:1 and then failed on the
sunk bands at 4.27:1 — which is why the rule is "darkest surface", not
"the ground".

---

## Owner-only, still outstanding

These need information or accounts Claude does not have:

- [ ] **Real shop coordinates.** `src/lib/site.ts` still carries Nagaon town
      centre (`26.3464, 92.6836`), not the shop. Drop a pin on Google Maps
      and copy the lat/lng. It feeds the `LocalBusiness` schema and the map
      pack.
- [ ] **Google Business Profile** created or claimed, with the name, address
      and phone matching `site.ts` character for character.
- [ ] **Confirm the business hours** are still Mon–Sat 9:30 AM – 8:00 PM.
- [ ] **Google Search Console** — verify the property and submit
      `https://chinaki.co.in/sitemap.xml`.
