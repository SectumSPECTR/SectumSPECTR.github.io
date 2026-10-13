// ==========================================================================
// PRO Творчество — Interactive Logic & Share Handler
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const shareButton = document.getElementById('share-button');
  const toast = document.getElementById('toast-notification');
  let toastTimeout = null;

  // Функция отображения toast-уведомления
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Обработчик кнопки "Поделиться"
  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const shareData = {
        title: document.title || 'PRO Творчество | Мастер-классы по живописи',
        text: 'Приглашаю на мастер-классы по созданию интерьерных картин! Напишите свой шедевр с нуля.',
        url: window.location.href
      };

      // Если поддерживается нативный Web Share API (в мобильных браузерах)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            fallbackCopyToClipboard();
          }
        }
      } else {
        // Fallback: копирование ссылки в буфер обмена
        fallbackCopyToClipboard();
      }
    });
  }

  // Копирование ссылки в буфер обмена
  function fallbackCopyToClipboard() {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(() => showToast('✨ Ссылка на визитку скопирована!'))
        .catch(() => legacyCopy(url));
    } else {
      legacyCopy(url);
    }
  }

  // Legacy метод для копирования (на случай старых браузеров или http)
  function legacyCopy(text) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('✨ Ссылка скопирована в буфер обмена!');
    } catch (e) {
      showToast('Скопируйте адрес из адресной строки');
    }
  }

  // Эффект легкого параллакса на интерактивных кнопках
  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.04}px, ${y * 0.04 - 2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
});
