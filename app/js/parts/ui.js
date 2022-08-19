document.addEventListener('DOMContentLoaded', () => {

    //PRICE ANIMATION

    let newPrice = gsap.utils.toArray(".order-price__new")

    let animation = gsap.to(newPrice, {
        scale: 1.1,
        duration: 1,
        yoyo: true,
        repeat: -1,
    });


    // TIMER LOGIC

    let timer = document.querySelectorAll(".timer")

    timer.forEach(timer => {
        let target_date = new Date().getTime() + (1000 * 1800); // set the countdown date
        let minutes = 0
        let seconds = 0 // letiables for time units

        getCountdown();

        setInterval(function () { getCountdown(); }, 1000);

        function getCountdown() {

            // find the amount of "seconds" between now and target
            let current_date = new Date().getTime();
            let seconds_left = (target_date - current_date) / 1000;

            minutes = pad(parseInt(seconds_left / 60));
            seconds = pad(parseInt(seconds_left % 60));

            // format countdown string + set tag value
            timer.querySelector(".timer__countdown").innerHTML = "<div class='timer__window'>" + minutes + "</div><div class='timer__divider'></div><div class='timer__window'>" + seconds + "</div>"
        }

        function pad(n) {
            return (n < 10 ? '0' : '') + n;
        }
    })


    //ANCHORS ANIMATION

    function getSamePageAnchor(link) {
        if (
            link.protocol !== window.location.protocol ||
            link.host !== window.location.host ||
            link.pathname !== window.location.pathname ||
            link.search !== window.location.search
        ) {
            return false;
        }

        return link.hash;
    }

    function scrollToHash(hash, e) {
        const elem = hash ? document.querySelector(hash) : false;
        if (elem) {
            if (e) e.preventDefault();
            gsap.to(window, { scrollTo: elem, duration: 1, ease: "expo.easeInOut" });
        }
    }

    document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', e => {
            scrollToHash(getSamePageAnchor(a), e);
        });
    });

    scrollToHash(window.location.hash);

    // INPUT THINGS

    const customInput = document.querySelectorAll(".custom-input")

    function setInputFilter(textbox, inputFilter, errMsg) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            textbox.addEventListener(event, function (e) {
                if (inputFilter(this.value)) {
                    // Accepted value
                    if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                        this.classList.remove("input-error");
                        this.setCustomValidity("");
                    }
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    // Rejected value - restore the previous one
                    this.classList.add("input-error");
                    this.setCustomValidity(errMsg);
                    this.reportValidity();
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    // Rejected value - nothing to restore
                    this.value = "";
                }
            });
        });
    }

    customInput.forEach(input => {
        input.querySelector("input").addEventListener("focus", () => {
            input.classList.remove("error")
            input.classList.add("focus")
        })

        input.querySelector("input").addEventListener("blur", function () {
            if (this.value.length === 0) {
                input.classList.remove("focus")
            }
        })

        if (input.querySelectorAll("input[type='tel']").length > 0){
            input.querySelector("input[type='tel']").addEventListener("input", function (evt) {
                const pattern = /^\d+(\.?)\d*$/g;
    
                const allowedCodes = [8, 9, 27, 35, 36, 37, 38, 39, 46, 110, 188];
    
                this.addEventListener('input', onInput);
    
                function onInput(e) {
    
                    const value = this.value;
    
                    if( !(value.match(pattern) || allowedCodes.some(code => code === e.keyCode)) ) {
                        this.value = value.slice(0, -1);
                    }
                }
            })
        }
    })

    //CHECKBOX THINGS

    const checkboxInput = document.querySelectorAll(".custom-checkbox input")

    checkboxInput.forEach(function (item) {
        item.addEventListener("change", function () {
            item.closest(".custom-checkbox").classList.remove("error")
        })
    })

    //VALIDATION

    let modalOpen = function(window){
        gsap.set(window,{
            autoAlpha: 1,
        })
        gsap.to(window,{
            xPercent: 0,
            x: 0,
            
            duration: 0.5,
            overwrite: true,
        })        

        gsap.to(pageBlur,{
            autoAlpha: 1,
            pointerEvents: "all",
            overwrite: true,
        })

        document.body.classList.add("noscroll")
    }
    
    let modalClose = function(){
        gsap.to(modalSuccess,{
            xPercent: 100,
            autoAlpha: 0,
            duration: 1
        })

        gsap.to(pageBlur,{
            autoAlpha: 0,
            pointerEvents: "none",
            overwrite: true,
        })

        document.body.classList.remove("noscroll")
    }

    const pageBlur = document.querySelector(".page-blur")
    const modalSuccess = document.querySelector(".modal-success")
    let openSuccess = function () {

        setTimeout(() => {
            modalOpen(modalSuccess)
        }, 500);
    }

    document.querySelector(".modal-success__close").addEventListener("click", function(){
        modalClose()
    })
    document.querySelector(".modal-close").addEventListener("click", function(){
        modalClose()
    })

    document.querySelectorAll(".validate-form").forEach((form) => {

        form.addEventListener("submit", function (e) {
            e.preventDefault()
            let errors = 0

            //TELEPHONE VALIDATION -----------------------------------------------

            let tels = form.querySelectorAll(".custom-input input[type='tel'][required]")

            tels.forEach(function (tel) {
                const regularExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

                if (tel.value.match(regularExpression)) {
                    tel.closest(".custom-input").classList.remove("error")
                } else {
                    errors++
                    tel.closest(".custom-input").classList.add("error")
                }
            })

            let texts = form.querySelectorAll(".custom-input input[type='text'][required]")

            texts.forEach(function (text) {

                if (text.value.length) {
                    text.closest(".custom-input").classList.remove("error")
                } else {
                    errors++
                    text.closest(".custom-input").classList.add("error")
                }
            })

            let checkboxes = form.querySelectorAll(".custom-checkbox input[required]")
            checkboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    checkbox.closest(".custom-checkbox").classList.remove("error")
                } else {
                    errors++
                    checkbox.closest(".custom-checkbox").classList.add("error")
                }
            })

            console.log(errors + " errors");

            if (errors === 0) {
                openSuccess()
            }
        })
    })
})