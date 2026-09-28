(() => {
  const form = document.querySelector('[data-signup-form]');
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  let storedTheme;
  try { storedTheme = window.localStorage.getItem('gatherkeep-theme'); } catch { /* Private browsing can disable storage. */ }
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
  const updateThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    themeButton.setAttribute('aria-label', dark ? (document.documentElement.lang === 'it' ? 'Passa all’aspetto chiaro' : 'Switch to light appearance') : (document.documentElement.lang === 'it' ? 'Passa all’aspetto scuro' : 'Switch to dark appearance'));
  };
  updateThemeLabel();
  themeButton?.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    try { window.localStorage.setItem('gatherkeep-theme', root.dataset.theme); } catch { /* Keep the choice for this page. */ }
    updateThemeLabel();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeLabel);
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
  if (!form) return;

  const messages = {
    en: {
      sending: 'Sending…',
      error: 'We couldn’t send your details. Please try again in a moment.',
      limited: 'Too many requests right now. Please try again later.'
    },
    it: {
      sending: 'Invio in corso…',
      error: 'Non siamo riusciti a inviare i tuoi dati. Riprova tra poco.',
      limited: 'Ci sono troppe richieste al momento. Riprova più tardi.'
    }
  };
  const copy = messages[form.dataset.locale] || messages.en;
  const betaBlock = form.closest('.beta-block');
  const button = form.querySelector('button[type="submit"]');
  const readyContent = button.innerHTML;
  const status = betaBlock.querySelector('[data-form-message]');
  const betaNote = betaBlock.querySelector('[data-beta-note]');
  const success = betaBlock.querySelector('[data-signup-success]');
  let sending = false;
  let submitted = false;

  form.addEventListener('submit', async (event) => {
    if (!form.action || form.action === window.location.href) return;
    event.preventDefault();
    if (sending || submitted || !form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    button.textContent = copy.sending;
    status.textContent = '';
    delete status.dataset.state;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(response.status === 429 ? 'limited' : 'failed');
      form.reset();
      submitted = true;
      form.hidden = true;
      betaNote.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.textContent = error.message === 'limited' ? copy.limited : copy.error;
      status.dataset.state = 'error';
      status.focus();
    } finally {
      sending = false;
      button.disabled = false;
      button.innerHTML = readyContent;
    }
  });
})();
