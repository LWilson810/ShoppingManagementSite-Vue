export const showPassword = {
    bind(el, binding, vnode) {
        const Element = document.getElementsByName('password');
        // console.log(el.querySelector('.icon'));
        const iconElement = el.querySelector('.icon');
        iconElement.onclick = (e) => {
            const elementType = Element['0'].getAttribute('type');
            const newType = elementType === 'password' ? 'text' : 'password';
            document.getElementsByName('password')['0'].setAttribute('type', newType);
            e.preventDefault();
        }
        // Element[0]
    }
}

export const clickHighlight = {
    bind(el, binding, vnode) {
        // console.log(currentElement)
        document.onclick = (e) => {
            const elements = document.getElementsByClassName('clickHighlight');
            for( var i = 0; i < elements.length; i ++) {
                elements[i].style.color = 'black'
            }
            if(e.target.className === 'clickHighlight') {
                e.target.style.color = 'lightblue'
            }
        }
    }
}