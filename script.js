const counters =
document.querySelectorAll(".coding-number");

counters.forEach(counter => {

    const updateCounter = () => {

        const target =
        parseInt(counter.innerText);

        if(isNaN(target))
            return;

        let count = 0;

        const interval =
        setInterval(() => {

            count += Math.ceil(target/40);

            if(count >= target){

                counter.innerText =
                target + "+";

                clearInterval(interval);
            }
            else{

                counter.innerText = count;
            }

        },30);

    };

    updateCounter();

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){
            link.classList.add("active");
        }

    });

});

const sliders = document.querySelectorAll('.achievement-slider');

sliders.forEach(slider => {

    const slides = slider.querySelectorAll('.slide');

    let current = 0;

    setInterval(() => {

        slides[current].classList.remove('active');

        current = (current + 1) % slides.length;

        slides[current].classList.add('active');

    }, 3000);

});
function toggleMenu(){
    document.getElementById("navLinks")
            .classList.toggle("active");
}