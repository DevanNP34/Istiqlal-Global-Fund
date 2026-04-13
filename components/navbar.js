fetch("/components/navbar.html")
.then(res => res.text())
.then(data => {
document.getElementById("navbar").innerHTML = data;
});

let lastScroll = 0;

window.addEventListener("scroll", function(){

const wrapper = document.querySelector(".floating-navbar-wrapper");
const navbar = document.querySelector(".floating-navbar");

const currentScroll = window.scrollY;

if(currentScroll > 80){
wrapper.classList.add("shrink");
navbar.classList.add("shrink");
}else{
wrapper.classList.remove("shrink");
navbar.classList.remove("shrink");
}

});