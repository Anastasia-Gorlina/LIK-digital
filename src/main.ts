//scripts
import { burgerMenu } from './shared/lib/burgerMenu.ts';
import { BaseButton } from './shared/ui/BaseButton.ts';
import { AccordionItem } from './shared/ui/AccordionItem.ts';
import { onSendMail } from './shared/ui/sendMail.ts';

burgerMenu(document.getElementById('burgerIcon')!);

customElements.define('base-button', BaseButton);

customElements.define('accordion-item', AccordionItem);

onSendMail(document.getElementById('sendMail'));
