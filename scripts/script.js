import Particles2 from './animations/background.js';
import ColorCircles from './animations/colorCircles.js';
import Particles from './animations/script2.js';
import Rings from './animations/spiningCircles.js';
import HorizontalRings from './animations/ParalaxPlanet.js';
import MagicCursor from './animations/hoverDrop.js';
import Groups from './animations/script.js';
import Stars from './animations/StarsCircle.js';
import Menu from './menu.js';

const App = () => {
    const init = () => {
        const currentAnim = getLocalStorage();
        if (currentAnim != null) {
            setAnim(currentAnim);
        } else {
            setAnim('Particles-2');
        }
        Menu();
        const ul = document.querySelector('.nav-list');
        ul.addEventListener('click', (e) => {
        const itemName = e.target;
        if (itemName.tagName === 'LI') {
            const elem = document.querySelector('canvas');
            removeAnim(elem);
            setLocalStorage(itemName.dataset.anim);
            setAnim(itemName.dataset.anim);
        }
    });
    }  

    const getLocalStorage = () => {
        return localStorage.getItem('currentAnim');
    }

    const setLocalStorage = (anim) => {
        localStorage.setItem('currentAnim', anim);
    }

    const removeAnim = (elem) => {
        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }
    }

    const setAnim = (name) => {
        switch(name)
        {
            case 'ColorParticles':
                ColorCircles();
                break;
            case 'Particles-2':
                Particles2();
                break;
            case 'Particles':
                Particles();
                break;
            case 'Rings':
                Rings();
                break;
            case 'Horiaontal-rings':
                HorizontalRings();
                break;
            case 'MagicCursor':
                MagicCursor();
                break;
            case 'Groups':
                Groups();
                break;
            case 'Stars':
                Stars();
                break;
            default:
                console.log("Error");
        }
    }

    init();
};

App();
