document.addEventListener("DOMContentLoaded",() =>{
    const reviewsSwipers = document.querySelectorAll(".reviews-swiper")

    reviewsSwipers.forEach((swiper, i)=>{
        swiper.classList.add("reviews-swiper-" + i)
        swiper.querySelector(".swiper-nav").classList.add("swiper-nav-" + i)
        let reviewsSwiper = new Swiper(document.querySelector(".reviews-swiper-" + i),{
            speed: 1200,

            slidesPerView: 1,
            spaceBetween: 24,
            autoheight: true,
            watchSlidesProgress: true,

            navigation: {
                nextEl: ".reviews-swiper__nav.swiper-nav-" + i + " .swiper-nav__next",
                prevEl: ".reviews-swiper__nav.swiper-nav-" + i + " .swiper-nav__prev",
            },

            breakpoints:{
                768: {
                    slidesPerView: 2,
                },

                1200: {
                    slidesPerView: 3
                }
            }
        })
    })
})