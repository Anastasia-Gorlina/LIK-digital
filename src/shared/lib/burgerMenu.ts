export function burgerMenu(element: HTMLElement) {
  if (!element) return;
  const menu = document.getElementById('menu')!;
  const setClassList = () => {
    element.classList.toggle('active');
    menu.classList.toggle('active');
  };
  element.addEventListener('click', setClassList);
}
