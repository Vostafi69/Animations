const Menu = () => {
    console.log(123);
    const btn = document.querySelector('.back');
    const menu = document.querySelector('.nav');
    btn.addEventListener('click', () => {
        if (menu.classList.contains('close')) {
            menu.classList.remove('close');
            btn.classList.remove('close');
        } else {
            menu.classList.add('close');
            btn.classList.add('close');
        }
    });
}

export default Menu;