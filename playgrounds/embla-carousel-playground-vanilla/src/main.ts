import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { THEME_STYLES } from 'consts/themes'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselDefaultStyles
} from 'components/Examples/createCarouselStyles'
import { createSlides } from './Carousel/setupSlides'
import { addPrevNextBtnsClickHandlers } from './Carousel/setupButtons'
import {
  addDotBtnsClickHandlers,
  createDotBtns,
  toggleDotBtnsActive
} from './Carousel/setupDots'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const carouselStyles = examplesCarouselDefaultStyles(
    '100%',
    '1rem',
    'x',
    styledComponentsStylesToString(
      CONTROLS_STYLES,
      SLIDE_NUMBER_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES
    )
  )

  styleElement.innerHTML =
    SANDBOX_CSS +
    carouselStyles +
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    )

  document.head.appendChild(styleElement)
}

injectBaseStyles()

const SLIDE_COUNT = 6
const OPTIONS: EmblaOptionsType = {}

const emblaNodes = <HTMLElement[]>(
  Array.from(document.querySelectorAll('.embla'))
)

emblaNodes.forEach((emblaNode) => {
  const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
  const containerNode = <HTMLElement>(
    emblaNode.querySelector('.embla__container')
  )
  const prevBtnNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--prev')
  )
  const nextBtnNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--next')
  )
  const dotsNode = <HTMLElement>(
    emblaNode.parentElement.querySelector('.embla__dots')
  )

  createSlides(containerNode, SLIDE_COUNT)

  const emblaApi = EmblaCarousel(viewPortNode, OPTIONS)
  const dotNodes = createDotBtns(emblaApi, dotsNode)
  const toggleDotButtonsActive = toggleDotBtnsActive(emblaApi, dotNodes)
  addPrevNextBtnsClickHandlers(emblaApi, prevBtnNode, nextBtnNode)
  addDotBtnsClickHandlers(emblaApi, dotNodes)

  emblaApi.on('select', toggleDotButtonsActive)
  emblaApi.on('init', toggleDotButtonsActive)

  //@ts-ignore
  window.embla = emblaApi
})
