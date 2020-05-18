import Barrier from "./barrier.js"

class Scenario {
    constructor(barrierWidth, spaceBetweenBarries){
        this.screen = document.querySelector("#screen")

        this.barrierWidth = barrierWidth
        this.spaceBetweenBarries = spaceBetweenBarries

        this.score = 0

        this.pairs = [
            new Barrier(barrierWidth),
            new Barrier(barrierWidth + spaceBetweenBarries),
            new Barrier(barrierWidth + spaceBetweenBarries * 2),
            new Barrier(barrierWidth + spaceBetweenBarries * 3),
            new Barrier(barrierWidth + spaceBetweenBarries * 4)
        ]
    }
    
    createPontuation() {
        if (this.pontuation) {
            this.screen.removeChild(this.pontuation)
            this.score = 0
        }
        this.pontuation = document.createElement("div")
        this.pontuation.setAttribute("class", "progress")
        this.pontuation.innerHTML = 0
        this.screen.appendChild(this.pontuation)
    }

    createBarriers() {
        this.pairs.forEach(pair => {
            this.screen.appendChild(pair.setPairOfBarriers())
        })
    }
    
    animateBarrier() {
        const dislocation = 3
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - dislocation)
            if (pair.getX() < -pair.getBarrierWidth()) {
                pair.setX(pair.getX() + this.spaceBetweenBarries * this.pairs.length)
                pair.setAperture(pair.superiorBarrier, pair.inferiorBarrier)
            }

            this.barrierCrossTheMiddle(pair, dislocation)
        })
    }

    barrierCrossTheMiddle(pair, dislocation) {
        const middle = this.barrierWidth / 2
        const barrierCrossTheMiddle = pair.getX() + dislocation >= middle 
            && pair.getX() < middle
        if (barrierCrossTheMiddle) {
            this.increasePontuation()
        }
    }

    increasePontuation() {
        this.score++
        this.pontuation.innerHTML = this.score
    }

    excludeBarrier() {
        this.pairs.forEach(pair => {
            this.screen.removeChild(pair.pairOfBarrier)
        })
    }
}

export default Scenario

