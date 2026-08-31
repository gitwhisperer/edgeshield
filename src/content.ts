/**
 * EdgeShield Content Script - DOM Heuristic Redaction Engine
 * Synchronously intercepts DOM elements to mask PII prior to visual capture.
 */

export function sanitizeDomInputs(): void {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach((el) => {
    (el as HTMLInputElement).setAttribute('data-edgeshield-masked', 'true');
  });

  const sensitiveFields = document.querySelectorAll('[autocomplete*="cc-"], [autocomplete*="password"]');
  sensitiveFields.forEach((el) => {
    (el as HTMLElement).style.filter = 'blur(12px)';
  });
}

// Intercept DOM mutations in real-time
const observer = new MutationObserver(() => {
  sanitizeDomInputs();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
});

// Run initial pass
sanitizeDomInputs();
