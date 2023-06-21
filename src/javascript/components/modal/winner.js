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
        onClose: hideModal => {
            const root = document.querySelector('.modal-layer');
            root.innerHTML = '';
            const template =
                '<div class="modal-root"><div class="modal-header"><span>Do you want play again?</span></div><div class="link-box"><a href="/">Yes</a><button class="close-modal">No</button></div></div>';
            root.innerHTML = template;
            document.querySelector('.close-modal').addEventListener('click', hideModal);
        }
    };

    showModal(winnerModal);
}
