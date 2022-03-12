/**
     * Easy selector helper function
     */
 const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
       
        return document.querySelector(el);
    }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    if (el |= ""){
        let selectEl = select(el, all);
    
        if (selectEl) {
            console.log(selectEl)
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    }else{
        if (all) {
            document.forEach(e => e.addEventListener(type, listener));
        } else {
           
            document.addEventListener(type, listener);
        }
    }
    
}