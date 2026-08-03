"use client";

import { useMemo, useState } from "react";
import { serviceOptions } from "@/lib/services";
import { site } from "@/lib/site";
import { IconCheck, IconWhatsApp } from "./Icons";

/**
 * THE ENQUIRY FORM
 *
 * Chinaki's real intake channel is WhatsApp, so the form composes a
 * complete, well-formatted message and hands it to WhatsApp rather
 * than posting to a mailbox nobody watches. The button therefore says
 * what actually happens — "Send on WhatsApp" — and the same wording
 * carries through to the confirmation.
 *
 * Validation runs on blur and clears the moment a field becomes valid,
 * so the form corrects itself as you fix it instead of scolding you
 * on submit.
 */

type FieldName = "name" | "phone" | "email" | "service" | "message";

/**
 * Each field owns its empty-state message. Deriving "X is required"
 * from the label produces sentences like "Service required is
 * required", so the wording is written out rather than assembled.
 */
const rules: Record<
  FieldName,
  { empty?: string; check?: (v: string) => string | null }
> = {
  name: {
    empty: "Tell us your name so we know who to reply to.",
    check: (v) =>
      v.trim().length < 2 ? "Enter your full name." : null,
  },
  phone: {
    empty: "We need a number to reply to.",
    check: (v) =>
      /^[6-9]\d{9}$/.test(v.replace(/\D/g, ""))
        ? null
        : "Enter a 10-digit mobile number.",
  },
  email: {
    check: (v) =>
      v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? null
        : "Check the email address — it looks incomplete.",
  },
  service: {
    empty: "Choose the service you need. Pick “Something else” if it is not listed.",
  },
  message: {},
};

const order: FieldName[] = ["name", "phone", "email", "service", "message"];

export function EnquiryForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sent, setSent] = useState(false);

  const validate = (name: FieldName, value: string): string | null => {
    const rule = rules[name];
    if (value.trim() === "") return rule.empty ?? null;
    return rule.check?.(value) ?? null;
  };

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    /* Clear an existing error as soon as the field becomes valid —
       but never introduce a new error mid-typing. */
    if (errors[name] && !validate(name, value)) {
      setErrors((e) => {
        const next = { ...e };
        delete next[name];
        return next;
      });
    }
  };

  const blur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const error = validate(name, values[name]);
    setErrors((e) => {
      const next = { ...e };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  };

  const state = (name: FieldName): "invalid" | "valid" | undefined => {
    if (errors[name]) return "invalid";
    if (touched[name] && values[name].trim() !== "" && !validate(name, values[name]))
      return "valid";
    return undefined;
  };

  const message = useMemo(() => {
    const lines = [
      `Enquiry from the Chinaki website`,
      ``,
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      values.email.trim() ? `Email: ${values.email.trim()}` : null,
      `Service: ${values.service}`,
      values.message.trim() ? `` : null,
      values.message.trim() ? `${values.message.trim()}` : null,
    ].filter((l) => l !== null);
    return lines.join("\n");
  }, [values]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const found: Partial<Record<FieldName, string>> = {};
    for (const name of order) {
      const error = validate(name, values[name]);
      if (error) found[name] = error;
    }
    setErrors(found);
    setTouched(Object.fromEntries(order.map((n) => [n, true])));

    if (Object.keys(found).length > 0) {
      const first = order.find((n) => found[n]);
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    window.open(
      `https://wa.me/91${site.phone}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-done well" role="status">
        <span className="form-done-tick" aria-hidden="true">
          <IconCheck size={20} />
        </span>
        <h3 className="t-h3">Sent on WhatsApp</h3>
        <p className="t-small form-done-body">
          Your enquiry is open in WhatsApp — press send there and we will reply
          during working hours. If the app did not open, message{" "}
          {site.phone} directly.
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setSent(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field" data-state={state("name")}>
        <input
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          className="field-input"
          placeholder=" "
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          onBlur={() => blur("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "e-name" : undefined}
          required
        />
        <label htmlFor="f-name" className="field-label">
          Your name <Req />
        </label>
        <Note id="e-name" error={errors.name} />
      </div>

      <div className="form-row">
        <div className="field" data-state={state("phone")}>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            className="field-input"
            placeholder=" "
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "e-phone" : "h-phone"}
            required
          />
          <label htmlFor="f-phone" className="field-label">
            Phone or WhatsApp <Req />
          </label>
          <Note
            id={errors.phone ? "e-phone" : "h-phone"}
            error={errors.phone}
            hint="10 digits, no country code."
          />
        </div>

        <div className="field" data-state={state("email")}>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder=" "
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "e-email" : undefined}
          />
          <label htmlFor="f-email" className="field-label">
            Email (optional)
          </label>
          <Note id="e-email" error={errors.email} />
        </div>
      </div>

      <div className="field" data-state={state("service")}>
        <select
          id="f-service"
          name="service"
          className="field-input field-select"
          value={values.service}
          onChange={(e) => {
            setField("service", e.target.value);
            setTouched((t) => ({ ...t, service: true }));
          }}
          onBlur={() => blur("service")}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "e-service" : undefined}
          required
        >
          {/* Empty first option keeps the floating label in its resting
              position until a real choice is made. */}
          <option value="" />
          {serviceOptions.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Something else">Something else</option>
        </select>
        <label
          htmlFor="f-service"
          className={values.service ? "field-label is-lifted" : "field-label"}
        >
          Service required <Req />
        </label>
        <span className="field-caret" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="m2 4 3.5 3.5L9 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <Note id="e-service" error={errors.service} />
      </div>

      <div className="field">
        <textarea
          id="f-message"
          name="message"
          rows={4}
          className="field-input"
          placeholder=" "
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
        />
        <label htmlFor="f-message" className="field-label">
          Anything we should know (optional)
        </label>
      </div>

      <div className="form-foot">
        <button type="submit" className="btn btn-primary">
          <IconWhatsApp size={17} />
          Send on WhatsApp
        </button>
        <p className="t-small form-foot-note">
          Opens WhatsApp with your details filled in. Nothing is stored on this
          website.
        </p>
      </div>
    </form>
  );
}

/** The required mark. Red is used here as a signal, never as brand colour. */
function Req() {
  return (
    <span className="field-req" aria-hidden="true">
      *
    </span>
  );
}

function Note({
  id,
  error,
  hint,
}: {
  id: string;
  error?: string;
  hint?: string;
}) {
  if (!error && !hint) return null;
  return (
    <p
      id={id}
      className={error ? "field-note is-error" : "field-note"}
      role={error ? "alert" : undefined}
    >
      {error ?? hint}
    </p>
  );
}
