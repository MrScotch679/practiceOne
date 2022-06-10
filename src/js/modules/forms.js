import checkNumberInputs from "./checkNumberInputs";

const forms = (state) => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  checkNumberInputs("input[name='user_phone']");

  const message = {
    loading: 'Загрузка данных',
    succes: 'Спасибо! Скоро с вами свяжутся!',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMassedge = document.createElement('div');
      statusMassedge.classList.add('status');
      item.append(statusMassedge);

      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData('assets/server.php', formData)
      .then(res => {
        console.log(res);
        statusMassedge.textContent = message.succes;
      })
      .catch(() => statusMassedge.textContent = message.failure)
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMassedge.remove();
        }, 5000);
      });
    });
  });

};

export default forms;