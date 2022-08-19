import Swiper from 'swiper/bundle'
window.Swiper = Swiper

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import ScrollToPlugin from 'gsap/ScrollToPlugin.js'
window.gsap = gsap

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.ScrollToPlugin = ScrollToPlugin
window.ScrollTrigger = ScrollTrigger

import "../js/parts/ui.js"

import "../js/parts/reviews.js"