export function openModal($el) {
  $el.classList.add('is-active');
}

export function closeModal($el) {
  $el.classList.remove('is-active');
}

export function isOpened($el) {
  return $el.classList.contains('is-active');
}

document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal') || [];
  const triggers = document.querySelectorAll('.js-modal-trigger') || [];
  const closeTargets = document.querySelectorAll('.modal-close, .modal-card-head .delete, .modal-card-foot .button') || [];
  
  function closeAllModals() {
    modals.forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  triggers.forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  closeTargets.forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
});