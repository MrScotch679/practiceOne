const forms = () => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll("input[name='user_phone']");

  phoneInputs.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, '');
    });
  });

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