class hsShader extends HTMLElement {
    // <span class="hs-shader-percent-indicator show">50%</span>
    template = `
        <span class="hs-shader-upper"></span>
        <span class="hs-shader-handle">
            <span class="hs-shader-percent-holder">50%</span>
        </span>`;
    percent = 50;
    handleHeight = 10;

    handleEl = null;
    //indicatorEl = null;
    upperHalfEl = null;
    connectedCallback() {
        this.id = this.getAttribute("id");
        if (!this.id || this.id === "") {
            console.error("[HSH-Shader] - Shader should have an ID.");
            return;
        }

        this.addTemplate();
        this.getElements();
        this.getAttributes();
        this.addEvents();
    }

    getElements() {
        this.handleEl           = this.querySelector(".hs-shader-handle");
        //this.indicatorEl = this.querySelector(".hs-shader-percent-indicator");
        this.upperHalfEl        = this.querySelector(".hs-shader-upper");
        this.percentHolderEl    = this.querySelector(".hs-shader-percent-holder");
        this.handleHeight       = this.handleEl.offsetHeight;
    }

    getAttributes() {
        this.percent = parseInt(this.getAttribute("percent"));
        this.refreshDisplayPercent();
    }

    addTemplate() {
        this.innerHTML = this.template;
    }

    addEvents() {
        this.handleDrag();
    }

    handleDrag() {
        let self = this;
        ['drag', 'touchmove'].forEach(evt =>
            self.handleEl.addEventListener(evt, function (e) {
                const target = e.target.parentElement;
                const rect = target.getBoundingClientRect();
                let relativeTop;
                if( e.type == "drag" ){
                    relativeTop = e.clientY - rect.top;
                }else{
                    relativeTop = e.touches[0].pageY - rect.top
                }
                self.updateDisplayPixel(relativeTop);
            }, false)
        );

        ['dragstart', 'touchstart', "click"].forEach(evt =>
            self.handleEl.addEventListener(evt, function (e) {
                //self.indicatorEl.classList.add("show");
                e.dataTransfer.setData('application/node type', this);
                window.getSelection().removeAllRanges();
                return false;
            }, false)
        );
        // ['dragend', 'touchend', "touchcancel"].forEach(evt =>
        //     self.handleEl.addEventListener(evt, function (e) {
        //         self.indicatorEl.classList.remove("show");
        //     }, false)
        // );
    }

    getPosPixel() {
        let height = this.offsetHeight;
        return ((height / 100) * this.percent) - (this.handleHeight / 2);
    }

    getPosPercent(pixel) {
        return Math.round( (100 / this.offsetHeight) * pixel);
    }

    refreshDisplayPercent() {
        this.upperHalfEl.style.height   = `${this.percent}%`;
        this.handleEl.style.top         = `${this.getPosPixel()}px`;
        this.percentHolderEl.innerText  = `${this.percent}%`;
        //this.indicatorEl.innerHTML      = `${this.percent}%`;
    }

    updateDisplayPixel(pixel) {
        if (pixel < 0 || pixel > this.offsetHeight) { return; }
        let percent = this.getPosPercent(pixel);
        let posPercentString = `${percent}%`
        this.upperHalfEl.style.height   = `${pixel}px`;
        this.handleEl.style.top         = `${pixel - (this.handleHeight / 2)}px`;
        //this.indicatorEl.innerHTML      = posPercentString;
        this.percentHolderEl.innerText  = posPercentString;
        this.percent = percent;
    }

    setPercent(percent) {
        if (percent > 100 || percent < 0) {
            console.error("[HSH-Shader] - Percent must be between 0 and 100%!");
            return;
        }
        this.percent = percent;
        this.updateDisplayPixel();
    }
};
customElements.define('hs-shader', hsShader);

/* TEST */

let shaders = document.querySelectorAll("hs-shader");

let testPercent = 5;
let interval, intervalTwo;

for (let shader of shaders) {
    if (!shader) { continue; }
    //setIntervalToHundread(shader);
}

function setIntervalToHundread(shader) {
    interval = setInterval(function () {
        shader.setPercent(testPercent);
        testPercent = testPercent + 1;
        if (testPercent >= 100) {
            clearInterval(interval);
            setIntervalToZero(shader);
        }
    }, 20);
}

function setIntervalToZero(shader) {
    intervalTwo = setInterval(function () {
        shader.setPercent(testPercent);
        testPercent = testPercent - 1;
        if (testPercent <= 0) {
            clearInterval(intervalTwo);
            setIntervalToHundread(shader);
        }
    }, 30);
}