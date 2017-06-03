document.getElementsByClassName("login-outline")[0].addEventListener("click", function (event) { event.stopPropagation(); } );
document.getElementsByClassName("login-outline")[1].addEventListener("click", function (event) { event.stopPropagation(); } );
function openLogin(shouldOpen) {
    if(shouldOpen) {
        document.getElementsByClassName("login-base")[0].classList.remove("login-hidden");
    } else {
        document.getElementsByClassName("login-base")[0].classList.add("login-hidden");
    }
}
function openAccountcreation(shouldOpen) {
    if(shouldOpen) {
        document.getElementsByClassName("login-base")[1].classList.remove("login-hidden");
    } else {
        document.getElementsByClassName("login-base")[1].classList.add("login-hidden");
    }
}
