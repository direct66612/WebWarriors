document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('logo-link').addEventListener('click', function () {
    window.location.href = '../index.html';
  });

  // код для обробки форми підписки
  document
    .getElementById('subscription-form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Заборонити відправку форми

      const emailInput = document.getElementById('email-input');
      const email = emailInput.value;
      console.log(email);

      // Виконуємо мінімальну валідацію поля email
      if (!emailInput.checkValidity()) {
        alert('https://your-energy.b.goit.study/api/subscription');
        return;
      }

      // Отправити дані на сервер
      fetch('https://your-energy.b.goit.study/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          if (data.message === 'Service not found') {
            throw Error('Request error. Please try again later.');
          } else {
            alert('You have successfully subscribed to receive new exercises!');
            emailInput.value = ''; // Очистити поле email
          }
        })
        .catch(error => {
          alert(error);
        });
    });
});
