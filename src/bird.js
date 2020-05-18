class Bird {
    constructor() {
        this.bird = document.querySelector(".bird") 

        this.screenHeight = document.querySelector("#screen").clientHeight

        this.flying = false
    }

    birdCommands() {
        this.birdStartFalling()
        this.birdGetUp()

        const newY = this.getY() + (this.flying ? -5 : 6)
        const maxHeight = this.screenHeight - this.bird.clientHeight

        if (newY <= 0) {
            this.setY(0)
        } else if (newY >= maxHeight) {
            this.setY(maxHeight)
        } else {
            this.setY(newY)
        }
    }

    birdStartFalling() {
        window.onkeyup = e => { 
            this.flying = false
        }
    }

    birdGetUp() {
        window.onkeydown = e => { 
            const keyCode = e.keyCode
            if (keyCode === 32) {
                this.flying = true
            }
        }
    }

    getY() {
        return this.bird.offsetTop
    }

    setY(x) {
        this.bird.style.top = `${x}px`
    }

    resetBirdPosition() {
        this.bird.style.top = "0px"
    }
}



export default Bird