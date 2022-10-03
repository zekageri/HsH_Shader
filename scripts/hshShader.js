class hsShader extends HTMLElement {
    template = `
        <span class="hs-shader-upper"></span>
        <span class="hs-shader-handle" draggable="true">
            <span draggable="false" class="hs-shader-percent-holder noselect"></span>
        </span>
        <span class="hs-shader-name-wrap">
            <span class="hs-shader-name"></span>
        </span>
    `;
    minHandleHeight = 20;
    percent = 50;
    handleHeight = 25;
    reverseCompute = false;
    isGroup = false;
    notTeached = true;

    handleEl = null;
    upperHalfEl = null;

    userEvents = {
        "drag" : null,
        "stop" : null
    };

    connectedCallback() {
        this.id = this.getAttribute("id");
        if (!this.id || this.id === "") {
            console.error("[HSH-Shader] - Shader should have an ID.");
            return;
        }
        this.cssRoot = document.querySelector(':root');
        this.setHandleHeight( this.handleHeight );
        this.addTemplate();
        this.getElements();
        this.getAttributes();
        this.addEvents();
    }

    on(event,cb){
        if( !this.userEvents.hasOwnProperty(event) ){
            console.error(`[HSH-Shader] - No such event as ${event}`);
            return;
        }
        this.userEvents[event] = cb;
    }

    setHandleHeight( height ){
        this.handleHeight = height;
        if( this.handleHeight < this.minHandleHeight ){
            this.handleHeight = this.minHandleHeight;
            console.error(`[HSH-Shader] - Minimum handle height is ${this.minHandleHeight}px!`);
        }
        this.cssRoot.style.setProperty('--hsh-shader-handle-height', `${this.handleHeight}px`);
    }

    getElements() {
        this.handleEl           = this.querySelector(".hs-shader-handle");
        this.upperHalfEl        = this.querySelector(".hs-shader-upper");
        this.percentHolderEl    = this.querySelector(".hs-shader-percent-holder");
        this.nameHolder         = this.querySelector(".hs-shader-name");
        //this.handleHeight       = this.handleEl.offsetHeight;
    }

    getAttributes() {
        this.percent    = parseInt(this.getAttribute("percent"));
        if( isNaN(this.percent) ){ this.percent = 50; }
        this.isGroup    = this.classList.contains("group");
        this.name       = this.getAttribute("name");
        this.notTeached = this.classList.contains("notTeached");

        this.nameHolder.innerHTML = this.name;
        if( this.isGroup ){
            this.nameHolder.setAttribute("lang","groupShader");
        }
        setTimeout(() => {
            this.refreshDisplayPercent();
        }, 100);
    }

    addTemplate() {
        this.innerHTML = this.template;
    }

    addEvents() {
        this.handleDrag();
        this.handleClick();
    }
    
    handleClick(){
        let self = this;
        ['mouseup', 'touchend'].forEach(evt =>
            self.addEventListener(evt, function (e) {
                let relativeTop = 0;
                const rect = self.getBoundingClientRect();
                if( e.type == "mouseup" ){
                    relativeTop = e.clientY - rect.top;
                }else{
                    relativeTop = e.touches[0].pageY - rect.top
                }
                let percent = self.getPosPercent(relativeTop);
                self.setPercent( percent );
                return false;
            }, false)
        );
    }
  
    handleDrag() {
        let self = this;
        ['drag', 'touchmove'].forEach(evt =>
            self.handleEl.addEventListener(evt, function (e) {
                if( self.notTeached ){ return; }
                const target = e.target.parentElement;
                const rect = target.getBoundingClientRect();
                let relativeTop;
                if( e.type == "drag" ){
                    relativeTop = e.clientY - rect.top;
                }else{
                    relativeTop = e.touches[0].pageY - rect.top
                }
                self.updateDisplayPixel(relativeTop);
                return false;
            }, false)
        );

        ['dragstart', 'touchstart', "click"].forEach(evt =>
            self.handleEl.addEventListener(evt, function (e) {
<<<<<<< HEAD
                let body = self.handleEl.closest(".hshModalBody");
                if( body ){ body.style.overflow = "hidden"; }
                if( e.type == "click" ){ return; }
                self.setAttribute("touching",true);
                e.dataTransfer.setDragImage(document.createElement('span'), 0, 0);
                //e.dataTransfer.setData('jkhbku', 'anything');
=======
                //self.indicatorEl.classList.add("show");
                //e.dataTransfer.setData('application/node type', this);
>>>>>>> 8dfe25e563569fea71c98af0d0a837b275aaeefd
                window.getSelection().removeAllRanges();
                return false;
            }, false)
        );

        ['dragend', 'touchend'].forEach(evt =>
            self.handleEl.addEventListener(evt, function (e) {
                if( self.userEvents.stop !== null ){
                    self.userEvents.stop(self.percent);
                }
                let body = self.handleEl.closest(".hshModalBody");
                if( body ){ body.style.overflow = "auto"; }
                self.setAttribute("touching",false);
                return false;
            }, false)
        );
    }

    scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    getReversePercent(){
        return this.scale(this.percent,100,0,0,100);
    }

    getPosPixel() {
        let height = this.offsetHeight;
        return this.clamp( ((height / 100) * this.percent) - (this.handleHeight / 2) );
    }

    getPosPercent(pixel) {
<<<<<<< HEAD
        let rawPercent = (100 / this.offsetHeight) * pixel;
        // Don't want to deal with float
        return Math.round( rawPercent );
=======
        return this.clamp( Math.round( (100 / this.offsetHeight) * pixel) );
>>>>>>> 8dfe25e563569fea71c98af0d0a837b275aaeefd
    }

    refreshDisplayPercent() {
        this.upperHalfEl.style.height   = `${this.percent}%`;
        this.handleEl.style.top         = `${this.getPosPixel()}px`;
        if( this.notTeached ){
            this.percentHolderEl.innerText  = `-`;
        }else{
            this.percentHolderEl.innerText  = `${this.percent}%`;
        }
    }

    updateDisplayPixel(pixel) {
        if (pixel < 0 || pixel > this.offsetHeight) { return; }
        let percent = this.getPosPercent(pixel);
        this.percent = percent;
        let posPercentString = `${this.percent}%`
        this.upperHalfEl.style.height   = `${pixel}px`;
        this.handleEl.style.top         = `${pixel - (this.handleHeight / 2)}px`;
        this.percentHolderEl.innerText  = posPercentString;
        
        if( this.userEvents.drag !== null ){
            this.userEvents.drag(this.percent);
        }
    }

    clamp(val, min, max) {
        return val > max ? max : val < min ? min : val;
    }

    setPercent(percent) {
        if (percent > 100 || percent < 0) {
            console.error("[HSH-Shader] - Percent must be between 0 and 100%!");
        }
<<<<<<< HEAD
        this.percent = percent;
        this.refreshDisplayPercent();
    }
};
customElements.define('hs-shader', hsShader);

/*
*   There is a bug in firefox where you can not get user pointers
*       inside drag event handlers. This function is intended to
*       fix this error.
*   It first checks if we are in firefox so it will not act if it
*       does not a firefox browser.
*   Please note, it isn't an exact fix. x / y coordinates might
*       be slightly off.
*   Since 'drag' event occurs before 'dragover', it executes
*       with the coordinates from the previous event frame.
*/
function patchFireFoxEventHandler(){
    if(/Firefox\/\d+[\d\.]*/.test(navigator.userAgent)
            && typeof window.DragEvent === 'function'
            && typeof window.addEventListener === 'function') (function(){
        // patch for Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=505521
        var cx, cy, px, py, ox, oy, sx, sy, lx, ly;
        function update(e) {
            cx = e.clientX; cy = e.clientY;
            px = e.pageX;   py = e.pageY;
            ox = e.offsetX; oy = e.offsetY;
            sx = e.screenX; sy = e.screenY;
            lx = e.layerX;  ly = e.layerY;
        }
        function assign(e) {
            e._ffix_cx = cx; e._ffix_cy = cy;
            e._ffix_px = px; e._ffix_py = py;
            e._ffix_ox = ox; e._ffix_oy = oy;
            e._ffix_sx = sx; e._ffix_sy = sy;
            e._ffix_lx = lx; e._ffix_ly = ly;
        }
        window.addEventListener('mousemove', update, true);
        window.addEventListener('dragover', update, true);
        // bug #505521 identifies these three listeners as problematic:
        // (although tests show 'dragstart' seems to work now, keep to be compatible)
        window.addEventListener('dragstart', assign, true);
        window.addEventListener('drag', assign, true);
        window.addEventListener('dragend', assign, true);

        var me = Object.getOwnPropertyDescriptors(window.MouseEvent.prototype),
            ue = Object.getOwnPropertyDescriptors(window.UIEvent.prototype);
        function getter(prop,repl) {
            return function() {return me[prop] && me[prop].get.call(this) || Number(this[repl]) || 0};
        }
        function layerGetter(prop,repl) {
            return function() {return this.type === 'dragover' && ue[prop] ? ue[prop].get.call(this) : (Number(this[repl]) || 0)};
        }
        Object.defineProperties(window.DragEvent.prototype,{
            clientX: {get: getter('clientX', '_ffix_cx')},
            clientY: {get: getter('clientY', '_ffix_cy')},
            pageX:   {get: getter('pageX', '_ffix_px')},
            pageY:   {get: getter('pageY', '_ffix_py')},
            offsetX: {get: getter('offsetX', '_ffix_ox')},
            offsetY: {get: getter('offsetY', '_ffix_oy')},
            screenX: {get: getter('screenX', '_ffix_sx')},
            screenY: {get: getter('screenY', '_ffix_sy')},
            x:       {get: getter('x', '_ffix_cx')},
            y:       {get: getter('y', '_ffix_cy')},
            layerX:  {get: layerGetter('layerX', '_ffix_lx')},
            layerY:  {get: layerGetter('layerY', '_ffix_ly')}
        });
    })();
}
patchFireFoxEventHandler();
=======
        this.percent = this.clamp(percent,0,100);
        this.refreshDisplayPercent();
    }
};
customElements.define('hs-shader', hsShader);
>>>>>>> 8dfe25e563569fea71c98af0d0a837b275aaeefd
