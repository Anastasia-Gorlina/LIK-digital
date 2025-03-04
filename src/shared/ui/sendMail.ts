type FormData = {
    email: HTMLInputElement;
    company: HTMLInputElement;
    phone: HTMLInputElement;
    freeField: HTMLInputElement;
    fio: HTMLInputElement;
  };
  
  function constructMail(formData: FormData) {
    const subject = 'Запрос на дополнительную консультацию с лендинга ЛиК'; // Тема письма
    const email = 'example@example.com';
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
      // получаем значение поля
      const formData: FormData = {
        company: document.getElementById('company')! as HTMLInputElement,
        email: document.getElementById('email')! as HTMLInputElement,
        phone: document.getElementById('phone')! as HTMLInputElement,
        freeField: document.getElementById('freeField')! as HTMLInputElement,
        fio: document.getElementById('fio')! as HTMLInputElement,
      };
      constructMail(formData);
  
      return (document.getElementById('email')!.value =
        document.getElementById('company')!.value =
        document.getElementById('phone')!.value =
        document.getElementById('freeField')!.value =
        document.getElementById('fio')!.value =
          '');
    });
  }