import Scenario from "./scenario.js"
import Bird from "./bird.js"

class Start {
    constructor() {
        this.pressToStart = document.querySelector(".pressToStart")
        this.bird = new Bird()
        this.scenario = new Scenario(1200, 350)

        this.startGame()
    }

    startGame() {

        this.pressToStart.onclick = () => { 
            this.scenario.createBarriers()
            this.scenario.createPontuation()

            this.createRestartButton()

            this.hideClassToggle()
            
            this.animation()
        }
    }

    animation() {

        let temp = setInterval(() => {
            this.gameSettings()
            if (this.colide()) {
                clearInterval(temp)
                this.toogleRestart()

                this.pressToRestart.onclick = () => {
                    this.bird.resetBirdPosition()
                    this.scenario.excludeBarrier()
                    this.scenario.createPontuation()
                    this.scenario.createBarriers()

                    this.toogleRestart()
                    
                    this.animation()
                }
            }
        }, 20)
     }

    createRestartButton() {
        const screen = this.scenario.screen

        this.pressToRestart = document.createElement("div")
        this.pressToRestart.setAttribute("class", "pressToRestart")
        this.pressToRestart.innerHTML = "RESTART"

        screen.appendChild(this.pressToRestart)
    }

    hideClassToggle() {
        this.bird.bird
            .classList
            .toggle("hide")

        this.pressToStart
            .classList
            .toggle("hide")

        this.toogleRestart()
    }

    gameSettings() {
        this.bird.birdCommands()
        this.scenario.animateBarrier()
    }

    colide() {
        let colide = false

        this.scenario.pairs.forEach(pair => {
            if (!colide) {
                const superior = pair.superiorBarrier
                const inferior = pair.inferiorBarrier
                colide = this.isOverlap(this.bird.bird, superior)
                    || this.isOverlap(this.bird.bird, inferior)
            }
        })
        return colide
    }

    isOverlap(elementA, elementB) {
        const a = elementA.getBoundingClientRect()
        const b = elementB.getBoundingClientRect()

        const horizontal = a.left + a.width >= b.left 
            && b.left + b.width >= a.left

        const vertical = a.top + a.height >= b.top
            && b.top + b.height >= a.top

        return horizontal && vertical
    }
    
    toogleRestart() {
        this.pressToRestart
            .classList
            .toggle("hide")
    }
}

new Start()