class Barrier {
    constructor(width) {
        this.width = width
    }

    setPairOfBarriers() {
        this.pairOfBarrier = this.newElement("div", "pair-of-barriers")
    
        this.inferiorBarrier = this.setBarrier(false, this.width)
        this.superiorBarrier = this.setBarrier(true, this.width)

        this.setAperture(this.superiorBarrier, this.inferiorBarrier)
        this.setX(this.width)

        this.pairOfBarrier.appendChild(this.superiorBarrier)
        this.pairOfBarrier.appendChild(this.inferiorBarrier)
        
        return this.pairOfBarrier
    }

    setBarrier(reverse) {
        const barrier = this.newElement("div", "barrier")

        const body = this.newElement("div", "body")
        const border = this.newElement("div", "border")
        
        barrier.appendChild(reverse ? body : border)
        barrier.appendChild(reverse ? border : body)

        return barrier
    }

    setAperture(superior, inferior) {
        const aperture = 230
        const height = 700

        const superiorBodyHeight = Math.random() * (height - aperture)
        const inferiorBodyHeight = height - aperture - superiorBodyHeight
        
        this.setHeight(superior, superiorBodyHeight)
        this.setHeight(inferior, inferiorBodyHeight)
    }

    setHeight(element, height) {
        element.querySelector("div[class=body]").style.height = `${height}px`
    }

    getX() {
        return this.pairOfBarrier.offsetLeft
    }

    setX(x) {
        this.pairOfBarrier.style.left = `${x}px`
    } 

    getBarrierWidth() {
        return this.pairOfBarrier.clientWidth
    }

    newElement(tagName, className) {
        let newElement = document.createElement(tagName)
        newElement.className = className
        return newElement
    }
}

export default Barrier