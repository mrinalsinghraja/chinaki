import Image from "next/image";

/**
 * SERVICE PHOTOGRAPHY
 *
 * One photograph per service family, showing the thing this business
 * actually sells: a person on the other side of the counter. The
 * drawn document plates say what you walk out holding; these say who
 * hands it to you, and they are the first thing a visitor sees.
 *
 * Rules the set is held to, because a photograph that breaks any of
 * them costs more trust than it earns:
 *
 *  1. NO TEXT IN THE IMAGE. Not a headline, not a caption. Words
 *     baked into a JPEG go soft on a phone, cannot be translated,
 *     cannot be selected and are invisible to search. The page's own
 *     type carries the message. Two generations of these images came
 *     back with "Customer Care" and "Application Process" burned into
 *     them and were thrown away.
 *  2. NO LEGIBLE PAPERWORK. Generated documents produce confident
 *     nonsense — one candidate proudly held up a "Registration Cat
 *     Certificate" issued to "Official Couple Owners". On a site whose
 *     promise is accurate documentation that is disqualifying, so
 *     every form here is angled away or thrown out of focus.
 *  3. ONE GRADE. Warm daylight, wood and cream, navy clothing. Six
 *     photographs have to read as one afternoon in one office, not as
 *     six stock purchases.
 *
 * Files are 1600×900 JPEGs in /public/images/services. Next's image
 * pipeline serves AVIF/WebP at the requested width, so the 200 KB
 * source never reaches a phone.
 */

export type ServicePhoto = {
  src: string;
  /** Describes the photograph for someone who cannot see it. */
  alt: string;
};

export const servicePhotos: Record<string, ServicePhoto> = {
  "business-services": {
    src: "/images/services/business-services.jpg",
    alt: "A shop owner smiling as a Chinaki assistant hands him his completed business registration file across the counter.",
  },
  "tax-services": {
    src: "/images/services/tax-services.jpg",
    alt: "A Chinaki assistant at a laptop working through a customer's return with him at the counter, his papers spread in front of him.",
  },
  "government-services": {
    src: "/images/services/government-services.jpg",
    alt: "A completed government application being stamped at the Chinaki counter, ink pad beside it.",
  },
  "employee-services": {
    src: "/images/services/employee-services.jpg",
    alt: "A Chinaki assistant going through a provident fund statement with an employee at a desk.",
  },
  "student-services": {
    src: "/images/services/student-services.jpg",
    alt: "A student filling an entrance examination form at a computer at Chinaki, with both parents watching over their shoulder.",
  },
  "documentation-services": {
    src: "/images/services/documentation-services.jpg",
    alt: "A freshly printed stack of documents being lifted from the copier at the Chinaki counter.",
  },
};

/**
 * `card` sizes for the three-up grid, `feature` for the masthead.
 * Getting `sizes` right is the whole point: without it Next ships the
 * full-width image to a 380px card and the page weighs four times
 * what it should.
 */
export function ServicePhoto({
  slug,
  variant = "card",
  priority = false,
  className,
}: {
  slug: string;
  variant?: "card" | "feature";
  priority?: boolean;
  className?: string;
}) {
  const photo = servicePhotos[slug];
  if (!photo) return null;

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={1600}
      height={900}
      priority={priority}
      className={className}
      sizes={
        variant === "feature"
          ? "(max-width: 60rem) 92vw, 520px"
          : "(max-width: 48rem) 92vw, (max-width: 72rem) 46vw, 400px"
      }
      quality={78}
    />
  );
}
