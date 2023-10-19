// для обробки кліку на логотипі
document.getElementById('logo').addEventListener('click', function () {
  window.location.href = '../index.html';
});

// код для обробки форми підписки
document
  .getElementById('subscription-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Заборонити відправку форми

    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

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
        if (data.success) {
          alert('You have successfully subscribed to receive new exercises!');
        } else {
          alert('Subscription error. Please try again.');
        }
      })
      .catch(error => {
        alert('Request error. Please try again later.');
      });
  });
