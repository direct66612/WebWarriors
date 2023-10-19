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
          alert('Ви успішно підписались на розсилку нових вправ!');
        } else {
          alert('Помилка при підписці. Спробуйте ще раз.');
        }
      })
      .catch(error => {
        alert('Помилка при відправці запиту. Спробуйте ще раз пізніше.');
      });
  });
