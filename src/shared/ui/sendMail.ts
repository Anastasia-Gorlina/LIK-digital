type FormData = {
  email: HTMLInputElement;
  company: HTMLInputElement;
  phone: HTMLInputElement;
  freeField: HTMLInputElement;
  fio: HTMLInputElement;
};

function constructMail(formData: FormData) {
  const subject = 'Запрос на дополнительную консультацию с лендинга ЛиК'; // Тема письма
  const email = 'kulturaPB@gazprom-neft.ru';
  const body = `
    ФИО: ${formData.fio.value}%0D%0A
    Организация: ${formData.company.value}%0D%0A
    Телефон: ${formData.phone.value}%0D%0A
    e-mail для ответа: ${formData.email.value}%0D%0A
    Ваше обращение: ${formData.freeField.value}%0D%0A
  `;

  // Создаем ссылку mailto
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Открываем ссылку
  window.location.href = mailtoLink;
}

export function onSendMail(element: HTMLElement | null) {
  if (!element) return;

  element.addEventListener('click', () => {
    // Получаем элементы формы
    const companyInput = document.getElementById('company') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
    const freeFieldInput = document.getElementById('freeField') as HTMLInputElement | null;
    const fioInput = document.getElementById('fio') as HTMLInputElement | null;

    // Проверяем, что все элементы существуют
    if (!companyInput || !emailInput || !phoneInput || !freeFieldInput || !fioInput) {
      console.error('Один или несколько элементов формы не найдены');
      return;
    }

    // Собираем данные формы
    const formData: FormData = {
      company: companyInput,
      email: emailInput,
      phone: phoneInput,
      freeField: freeFieldInput,
      fio: fioInput,
    };

    // Отправляем письмо
    constructMail(formData);

    // Очищаем поля формы
    companyInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    freeFieldInput.value = '';
    fioInput.value = '';
  });
}
