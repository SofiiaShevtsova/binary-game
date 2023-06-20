import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const fighterBox = createElement({ tagName: 'div', className: 'fighter-preview___root' });
    if (fighter) {
        const template = `<img src="${fighter.source}" alt="${fighter.name}" height='300px'>`;
        fighterBox.innerHTML = template;
    }
    const winnerModal = {
        title: `${fighter.name} win this battle!`,
        bodyElement: fighterBox,
        onClose: () => {
            // location.reload();
        }
    };

    showModal(winnerModal);
}
