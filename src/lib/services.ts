/**
 * Every service Chinaki offers, grouped the way a visitor thinks
 * about them rather than the way the departments are organised.
 *
 * This file drives the mega-menu, the services hub, all six
 * category pages, the sitemap and the enquiry dropdown. Add a
 * service here and it appears everywhere.
 */

export type Service = {
  name: string;
  /** Plain-language: what this is, for someone who has not done it before. */
  summary: string;
  /** What the visitor should bring. Kept short — the real list is per case. */
  documents: string[];
  /** Honest ranges, not promises. */
  turnaround: string;
};

export type Category = {
  slug: string;
  /** Mono file code. Encodes the department family, not a sequence. */
  code: string;
  name: string;
  /** Nav-length description. */
  short: string;
  /** Page-length description. */
  intro: string;
  /** Who this category is actually for. */
  audience: string;
  services: Service[];
};

export const categories: Category[] = [
  {
    slug: "business-services",
    code: "BUS",
    name: "Business Services",
    short: "Registration, GST, licences and signatures",
    intro:
      "Everything a business needs to exist on paper and stay compliant — from the first registration certificate to the digital signature you will sign returns with.",
    audience: "Shop owners, traders, contractors, new firms and partnerships",
    services: [
      {
        name: "GST Registration",
        summary:
          "Register your business for GST and receive your GSTIN. We prepare the application, upload your documents and follow the query replies until the certificate is issued.",
        documents: [
          "PAN card of the business or proprietor",
          "Aadhaar of the proprietor or partners",
          "Photograph",
          "Proof of business address — rent agreement, electricity bill or NOC",
          "Bank account details or cancelled cheque",
        ],
        turnaround: "Usually 7–10 working days, subject to department queries",
      },
      {
        name: "GST Amendments",
        summary:
          "Change your registered address, trade name, business activity, partners or bank details on an existing GST registration.",
        documents: [
          "Existing GST certificate",
          "Proof supporting the change being made",
        ],
        turnaround: "Usually 3–7 working days",
      },
      {
        name: "Trade Licence",
        summary:
          "Apply for or renew the municipal trade licence that permits you to operate a shop or business at a given address in Nagaon.",
        documents: [
          "Proof of business premises",
          "Identity proof of the owner",
          "Previous licence, if renewing",
        ],
        turnaround: "Usually 7–15 working days, depending on the municipal board",
      },
      {
        name: "MSME Registration",
        summary:
          "Register as a Micro, Small or Medium Enterprise so your business can access priority lending, subsidies and tender preferences.",
        documents: ["Aadhaar of the proprietor", "PAN", "Business bank details"],
        turnaround: "Same day in most cases",
      },
      {
        name: "UDYAM Registration",
        summary:
          "The current MSME registration portal. We complete the Udyam filing and hand you the certificate with your Udyam Registration Number.",
        documents: ["Aadhaar linked to a mobile number", "PAN", "Business details"],
        turnaround: "Same day in most cases",
      },
      {
        name: "Digital Signature Certificate",
        summary:
          "A DSC is the legal signature you use to file returns, tenders and company forms online. We handle the application, video verification and token setup.",
        documents: [
          "PAN card",
          "Aadhaar or passport",
          "Photograph",
          "Mobile number and email that you control",
        ],
        turnaround: "1–3 working days after video verification",
      },
      {
        name: "GeM Registration",
        summary:
          "Register as a seller on the Government e-Marketplace so government departments can buy from you directly. We complete the seller profile, the organisation and bank verification, and add your first product or service listings.",
        documents: [
          "PAN of the business or proprietor",
          "Aadhaar linked to a mobile number",
          "GST certificate",
          "Udyam or MSME certificate, if you have one",
          "Business bank account details or cancelled cheque",
          "Income tax return of the last assessment year",
        ],
        turnaround: "1–3 working days, subject to portal verification",
      },
      {
        name: "Business Documentation",
        summary:
          "Drafting, formatting and assembling the supporting paperwork a registration or tender needs — declarations, NOCs, affidavit formats and document sets.",
        documents: ["Depends on the document — bring what you have"],
        turnaround: "Same day for most documents",
      },
    ],
  },
  {
    /* Split out of Business Services once the factory and contractor
       work arrived. These are Labour Department and PWD licensing —
       a different counter and a different customer from a shop owner
       registering a firm, and a contractor searching for a renewal
       should land on a page about renewals, not on item eleven of a
       list of fourteen. */
    slug: "licence-services",
    code: "LIC",
    name: "Licence Services",
    short: "Factory, labour and contractor licensing",
    intro:
      "The licences that let work actually start — factory, labour and contractor. These run on department calendars and inspection dates, so the useful thing we do is keep the file complete and tell you where it is sitting.",
    audience:
      "Factory owners, civil contractors and firms employing contract labour",
    services: [
      {
        name: "Factory Licence",
        summary:
          "The licence under the Factories Act that lets a manufacturing unit operate. We prepare the application with your plant details, worker numbers and power load, and follow it through plan approval and inspection.",
        documents: [
          "Proof of ownership or lease of the premises",
          "Approved factory building plan",
          "List of directors, partners or the occupier",
          "Details of machinery and connected power load",
          "Number of workers to be employed",
          "Trade licence and municipal NOC",
        ],
        turnaround:
          "Usually several weeks — plan approval and inspection are department-scheduled",
      },
      {
        name: "Amendment of Factory Licence",
        summary:
          "Change what is recorded on an existing factory licence — the occupier or manager, the worker count, added machinery or increased power load.",
        documents: [
          "Existing factory licence",
          "Proof supporting the change being made",
          "Revised plan or machinery list, where the change needs one",
        ],
        turnaround: "Usually 2–4 weeks, subject to department queries",
      },
      {
        name: "Transfer of Factory Licence",
        summary:
          "Move an existing factory licence to a new occupier when the unit changes hands, so production does not have to stop while a fresh licence is applied for.",
        documents: [
          "Existing factory licence",
          "Sale deed, transfer deed or lease in the new occupier's name",
          "NOC from the outgoing occupier",
          "Identity and address proof of the incoming occupier",
        ],
        turnaround: "Usually 2–4 weeks, subject to department queries",
      },
      {
        name: "Labour Licence of a Contractor",
        summary:
          "The licence a contractor needs under the Contract Labour Act before deploying workers on a principal employer's site. We prepare the application, the Form V from the principal employer, and the fee challans.",
        documents: [
          "Form V certificate from the principal employer",
          "Work order or contract agreement",
          "Number of contract workers to be engaged",
          "PAN and registration papers of the contracting firm",
          "Fee and security deposit challans",
        ],
        turnaround: "Usually 2–3 weeks after the Form V is in hand",
      },
      {
        name: "Contractor Registration and Renewal",
        summary:
          "Registration and renewal of a contractor's licence with Assam government departments — Class I(A), I(B), I(C), Class II and Class III. We assemble the class-specific file and track it to issue.",
        documents: [
          "PAN and GST registration",
          "Solvency certificate from a bank",
          "Experience and completed-work certificates",
          "Machinery and equipment list",
          "Technical staff details and qualifications",
          "Previous licence, if renewing",
        ],
        turnaround:
          "Varies by class and department — we confirm the timeline before you pay",
      },
      {
        name: "Upgradation of Contractors",
        summary:
          "Move up a contractor class — Class III to Class II, Class II to Class I and so on — once your completed work, turnover and equipment meet the higher bracket. We check you actually qualify before filing.",
        documents: [
          "Existing contractor registration certificate",
          "Completed-work certificates for the qualifying value",
          "Turnover proof and audited accounts",
          "Solvency certificate at the higher limit",
          "Machinery and technical staff details",
        ],
        turnaround:
          "Varies by department — assessment is committee-scheduled",
      },
    ],
  },
  {
    slug: "tax-services",
    code: "TAX",
    name: "Tax Services",
    short: "Income tax returns, PAN and compliance",
    intro:
      "Filing done properly the first time. We work from your actual documents, explain what is being claimed, and give you the acknowledgement to keep.",
    audience: "Salaried employees, professionals, small businesses and pensioners",
    services: [
      {
        name: "Income Tax Return",
        summary:
          "We select the correct ITR form for your income, compute the tax, file the return and give you the acknowledgement. Salaried, business and presumptive cases all handled.",
        documents: [
          "PAN and Aadhaar",
          "Form 16, or business income summary",
          "Bank statements for the financial year",
          "Investment and deduction proofs",
          "Previous year's return, if you have it",
        ],
        turnaround: "Same day once documents are complete",
      },
      {
        name: "PAN Services",
        summary:
          "New PAN application, correction of name or date of birth, reprint of a lost card, and Aadhaar–PAN linking.",
        documents: [
          "Aadhaar",
          "Photograph",
          "Proof of date of birth",
          "Existing PAN, for corrections",
        ],
        turnaround: "e-PAN in 1–3 working days; physical card by post",
      },
      {
        name: "Tax Documentation",
        summary:
          "Computation statements, capital gain workings, rent receipts, and the document sets that banks and departments ask for alongside a return.",
        documents: ["Depends on what is being prepared"],
        turnaround: "Same day for most requests",
      },
    ],
  },
  {
    slug: "government-services",
    code: "GOV",
    name: "Government Services",
    short: "CSC, certificates and e-Governance applications",
    intro:
      "The applications people put off because the portal is confusing. We fill them correctly, track the status, and tell you plainly what the department is waiting for.",
    audience: "Residents of Nagaon and surrounding areas",
    services: [
      {
        name: "CSC Services",
        summary:
          "Common Service Centre transactions — the range of central and state citizen services delivered through the CSC network.",
        documents: ["Aadhaar", "Documents specific to the service requested"],
        turnaround: "Most transactions complete the same day",
      },
      {
        name: "e-Governance Applications",
        summary:
          "State and central portal applications: submission, fee payment, document upload and status follow-up until the outcome is issued.",
        documents: ["Varies by application — we confirm before you pay any fee"],
        turnaround: "Depends on the issuing department",
      },
      {
        name: "Government Applications",
        summary:
          "Scheme applications, subsidy claims, licence applications and departmental forms, prepared and submitted with the correct enclosures.",
        documents: ["Identity proof", "Documents named in the scheme guidelines"],
        turnaround: "Submission same day; outcome per department",
      },
      {
        name: "Certificates",
        summary:
          "Applications for income, residence, caste, birth, death and other official certificates, with the supporting affidavits where required.",
        documents: [
          "Aadhaar",
          "Proof of residence",
          "Supporting documents named on the certificate form",
        ],
        turnaround: "Usually 7–21 working days, set by the issuing office",
      },
      {
        name: "Online Registrations",
        summary:
          "Portal registrations and account setup — creating the login, verifying the mobile and email, and completing the profile so the account is actually usable.",
        documents: ["Aadhaar", "Mobile number and email that you control"],
        turnaround: "Same day",
      },
    ],
  },
  {
    slug: "employee-services",
    code: "EMP",
    name: "Employee Services",
    short: "EPF, ESIC and employer compliance",
    intro:
      "Provident fund and insurance work on both sides of the desk — the employee claiming what is theirs, and the employer staying compliant.",
    audience: "Employees, employers and establishments with staff on roll",
    services: [
      {
        name: "EPF Services",
        summary:
          "UAN activation, KYC seeding, transfer of an old account, withdrawal and advance claims, and correcting name or date-of-birth mismatches that block a claim.",
        documents: [
          "UAN or PF number",
          "Aadhaar and PAN",
          "Bank passbook or cancelled cheque",
          "Employment dates",
        ],
        turnaround: "Claim filed same day; settlement per EPFO timelines",
      },
      {
        name: "ESIC Services",
        summary:
          "ESIC registration for employees, insurance number generation, family details, and the paperwork for medical and sickness benefit claims.",
        documents: ["Aadhaar", "Employment details", "Family member details"],
        turnaround: "Registration same day",
      },
      {
        name: "Employer Registration",
        summary:
          "Registering an establishment under EPF and ESIC, generating login credentials, and setting up the monthly filing process.",
        documents: [
          "Business PAN and registration certificate",
          "Address proof of the establishment",
          "Employee list with wage details",
          "Bank details",
        ],
        turnaround: "Usually 3–7 working days",
      },
      {
        name: "Compliance Assistance",
        summary:
          "Monthly ECR filing, challan generation and payment, and clearing the gaps that show up in departmental notices.",
        documents: ["Wage register", "Existing login credentials"],
        turnaround: "Monthly, before the statutory due date",
      },
    ],
  },
  {
    slug: "student-services",
    code: "STU",
    name: "Student Services",
    short: "Entrance forms, scholarships and admissions",
    intro:
      "Entrance and admission forms have short windows and no room for a mistake. We fill them with you sitting there, check every field against your documents, and keep your application number safe.",
    audience: "School and college students, and parents applying on their behalf",
    services: [
      {
        name: "NEET Application",
        summary:
          "The full NEET registration — form filling, photograph and signature to specification, fee payment, and a printed confirmation page for your records.",
        documents: [
          "Class 10 and 12 certificates",
          "Aadhaar",
          "Passport photograph and signature in the required format",
          "Category certificate, if applicable",
        ],
        turnaround: "Completed in one sitting",
      },
      {
        name: "JEE Application",
        summary:
          "JEE Main registration and session selection, image uploads to the exact pixel and size limits, city preferences and fee payment.",
        documents: [
          "Class 10 and 12 details",
          "Aadhaar",
          "Photograph and signature in the required format",
        ],
        turnaround: "Completed in one sitting",
      },
      {
        name: "CUET Application",
        summary:
          "CUET registration including university and subject combination selection — the part most applicants get wrong.",
        documents: [
          "Class 12 details",
          "Aadhaar",
          "Photograph and signature",
          "List of universities you intend to apply to",
        ],
        turnaround: "Completed in one sitting",
      },
      {
        name: "Scholarships",
        summary:
          "National and state scholarship applications, renewals, and the income and caste documentation they depend on.",
        documents: [
          "Previous year's marksheet",
          "Income certificate",
          "Caste certificate, if applicable",
          "Bank passbook in the student's name",
          "Aadhaar",
        ],
        turnaround: "Submission same day; disbursal per scheme",
      },
      {
        name: "College Admission",
        summary:
          "Admission portal registration, choice filling, document verification uploads and fee payment for state and central admissions.",
        documents: [
          "Marksheets",
          "Transfer and character certificates",
          "Aadhaar",
          "Category and domicile certificates, if applicable",
        ],
        turnaround: "Per admission calendar",
      },
      {
        name: "University Forms",
        summary:
          "Semester registration, examination forms, migration and duplicate certificate applications.",
        documents: ["University roll number", "Previous marksheets", "Fee receipts"],
        turnaround: "Same day",
      },
      {
        name: "Online Examination Forms",
        summary:
          "Any examination form with an online window — board, recruitment or competitive — filled to specification with the confirmation page printed.",
        documents: ["As named in the examination notification"],
        turnaround: "Completed in one sitting",
      },
    ],
  },
  {
    slug: "documentation-services",
    code: "DOC",
    name: "Documentation Services",
    short: "Printing, scanning, lamination and uploads",
    intro:
      "The counter work that everything else depends on. Correct sizes, correct formats, correct file limits — so an application is never rejected for a document that was simply too large.",
    audience: "Anyone with a form to submit or a document to prepare",
    services: [
      {
        name: "Printing",
        summary:
          "Black-and-white and colour printing, single or double sided, on paper stock suited to the submission.",
        documents: ["Your file on a phone, drive, email or WhatsApp"],
        turnaround: "Over the counter",
      },
      {
        name: "Scanning",
        summary:
          "Scanning to PDF or JPG at the resolution and file-size limit a portal specifies — the most common reason uploads fail.",
        documents: ["The original document"],
        turnaround: "Over the counter",
      },
      {
        name: "Photocopy",
        summary:
          "Photocopying at any quantity, including reductions and enlargements for attested document sets.",
        documents: ["The original document"],
        turnaround: "Over the counter",
      },
      {
        name: "Lamination",
        summary:
          "Lamination for certificates, identity cards and documents that will be handled often.",
        documents: ["The document to be laminated"],
        turnaround: "Over the counter",
      },
      {
        name: "Online Form Filling",
        summary:
          "Any online form, filled accurately with you present, checked field by field against your documents before submission.",
        documents: ["Documents relevant to the form", "Aadhaar"],
        turnaround: "Completed in one sitting",
      },
      {
        name: "Document Upload",
        summary:
          "Uploading documents to a portal within its format and size rules, with the acknowledgement saved and printed for you.",
        documents: ["The documents", "Portal login, if you already have one"],
        turnaround: "Over the counter",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Anchor id for a service. The index and the category pages must agree. */
export function serviceAnchor(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Flat list for the enquiry form's service dropdown. */
export const serviceOptions: { group: string; items: string[] }[] =
  categories.map((c) => ({ group: c.name, items: c.services.map((s) => s.name) }));

export const totalServices = categories.reduce(
  (n, c) => n + c.services.length,
  0,
);

/**
 * The family count, spelled out for sentence copy.
 *
 * Three pages said "six families" as literal text, so adding a seventh
 * left the site contradicting itself in three places at once. Derived
 * from the array now, which is the only way a count in prose stays
 * true. Numerals are right for data — "32 services" — and wrong in the
 * middle of a sentence, hence the word.
 */
const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

export const totalCategories = categories.length;

export const totalCategoriesWord =
  NUMBER_WORDS[totalCategories] ?? String(totalCategories);
