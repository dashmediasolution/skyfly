"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => unknown;
      };
    };
  }
}

type Language = "en" | "es";

export default function GoogleTranslate() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const elementId = "google_translate_element";

    const hideGoogleUI = () => {
      document
        .querySelectorAll(
          ".goog-te-banner-frame, .goog-te-spinner-pos, .goog-te-spinner, .goog-te-balloon-frame"
        )
        .forEach((element) => {
          (element as HTMLElement).style.setProperty(
            "display",
            "none",
            "important"
          );
        });

      document.documentElement.style.setProperty(
        "top",
        "0px",
        "important"
      );

      document.body.style.setProperty("top", "0px", "important");
      document.body.style.setProperty(
        "margin-top",
        "0px",
        "important"
      );
    };

    const observer = new MutationObserver(hideGoogleUI);

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    const initializeGoogleTranslate = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const container = document.getElementById(elementId);

      if (!container || container.childElementCount > 0) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es",
          autoDisplay: false,
        },
        elementId
      );
    };

    window.googleTranslateElementInit = initializeGoogleTranslate;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    } else {
      initializeGoogleTranslate();
    }

    hideGoogleUI();

    return () => {
      observer.disconnect();
      window.googleTranslateElementInit = undefined;
    };
  }, []);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    // Set the Google Translate language cookie.
    const value = `/en/${nextLanguage}`;

    document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;

    // Also try setting the cookie for the current hostname.
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}; SameSite=Lax`;

    const applyLanguage = () => {
      const select = document.querySelector<HTMLSelectElement>(
        "#google_translate_element select.goog-te-combo"
      );

      if (!select) return false;

      select.value = nextLanguage === "en" ? "en" : "es";

      select.dispatchEvent(
        new Event("change", {
          bubbles: true,
        })
      );

      return true;
    };

    if (!applyLanguage()) {
      window.setTimeout(() => {
        if (!applyLanguage()) {
          // The Google Translate widget may not have initialized yet.
          window.location.reload();
        }
      }, 1000);
    }
  };

 return (
  <>
    <div className="language-select-wrapper">
      <img
        src={
          language === "en"
            ? "https://flagcdn.com/w40/us.png"
            : "https://flagcdn.com/w40/es.png"
        }
        alt={language === "en" ? "United States flag" : "Spain flag"}
        className="language-select-flag"
        width={24}
        height={16}
      />

      <select
        aria-label="Select language"
        value={language}
        onChange={(event) =>
          changeLanguage(event.target.value as Language)
        }
        className="language-select"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>

      <svg
        className="language-select-arrow"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <div
      id="google_translate_element"
      className="google-translate-hidden"
      aria-hidden="true"
    />
  </>
);
 
}


