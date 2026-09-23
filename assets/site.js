(() => {
  const form = document.querySelector('[data-signup-form]');
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
  if (!form) return;

  const messages = {
    en: {
      sending: 'Sending…',
      ready: 'Join the beta interest list',
      success: 'Thanks. You’re on the list; we’ll get in touch if a beta place becomes available.',
      error: 'We couldn’t send your details. Please try again in a moment.',
      limited: 'Too many requests right now. Please try again later.'
    },
    it: {
      sending: 'Invio in corso…',
      ready: 'Iscriviti alla lista di interesse',
      success: 'Grazie. Ti contatteremo se si libererà un posto nella beta.',
      error: 'Non siamo riusciti a inviare i tuoi dati. Riprova tra poco.',
      limited: 'Ci sono troppe richieste al momento. Riprova più tardi.'
    }
  };
  const copy = messages[form.dataset.locale] || messages.en;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-message]');
  let sending = false;

  form.addEventListener('submit', async (event) => {
    if (!form.action || form.action === window.location.href) return;
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
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
      status.textContent = copy.success;
      status.dataset.state = 'success';
      status.focus();
    } catch (error) {
      status.textContent = error.message === 'limited' ? copy.limited : copy.error;
      status.dataset.state = 'error';
      status.focus();
    } finally {
      sending = false;
      button.disabled = false;
      button.textContent = copy.ready;
    }
  });
})();
