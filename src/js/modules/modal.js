const modals = () => {
  function modalTrigger(triggerSelector, modalSelector, closeSelector, closeClickOverlay = 'true') {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]');

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach(item => {
          item.style.display = 'none';
        });
  
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  function modalTriggerByTime(modalSelector, triggerTime) {
    setTimeout(() => {
      document.querySelector(modalSelector).style.display = 'block';
      document.body.overflow = 'hidden';
    }, triggerTime);
  }

  modalTrigger('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  modalTrigger('.phone_link', '.popup', '.popup .popup_close');
  modalTrigger('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  modalTrigger('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  modalTrigger('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

  modalTriggerByTime('.popup', 1000);

};

export default modals;