const DATA_FOR_OCGOTRING = `https://raw.githubusercontent.com/CSS-Tricks/css-webring/main/webring.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>

/* Tooltip container */
.OCGOT-tooltip {
  display: inline-block;
  position: relative;
}

/* Tooltip text */
.OCGOT-tooltip .OCGOT-tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center !important;
  padding: 5px 0;
  border-radius: 6px;
  max-width: 200px;
  bottom: 100%;
  opacity: 0;
  transition: opacity 1s;
}

/* Show the tooltip text when you mouse over the tooltip container */
.OCGOT-tooltip:hover .OCGOT-tooltiptext {
  visibility: visible;
  opacity: 1;
}

.OCGOT-tooltip .OCGOT-tooltiptext::after {
  content: " ";
  position: absolute;
  top: 47%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

OCGOT-name {
font-family: "MS PGothic", sans-serif;
	text-shadow: 1px 1px 1px rgb(255, 255, 255);
}

</style>

<div class="OCGOTring">
  <div id="copy">
    
  </div>
</div>`;

class OCGOTRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_OCGOTRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.websiteurl === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
<div class="OCGOT-home" style="background-image:url('${matchedSite.homeurl}'); height:200px; width: 200px;">
          <span class="OCGOT-name" style="position:relative;left:70px;top:40px">${matchedSite.sitename}</span>
          <div class="OCGOT-tooltip" style="position:relative; bottom:30px;">
          <span class="OCGOT-tooltiptext" style="display:inline-block;">${matchedSite.websiteblurb}</span>
          <img class="OCGOT-character" style="position:relative;left:55px;" src="${matchedSite.charurl}">
          </div>
          <div class="OCGOT-buttons" style="position:relative;left:65px;bottom:30px">
          <a href="${sites[prevSiteIndex].websiteurl}" title="Previous"><img src="${matchedSite.prevbutton}"></a>
          <a href="${sites[randomSiteIndex].websiteurl}" title="Wildcard!"><img src="${matchedSite.randombutton}"></a>
            <a href="${sites[nextSiteIndex].websiteurl}" title="Next"><img src="${matchedSite.nextbutton}"></a>
          </div>
          </div>
          <div class="OCGOT-charms">
          <iframe src="${matchedSite.charm1}" style="border-style:none; display:block; position:relative; margin-bottom:-190px; bottom:190px; margin-left:165px; max-width:75px;" scrolling="no"></iframe>
          <iframe src="${matchedSite.charm2}" style="border-style:none; display:block; position:relative; margin-bottom:-190px; bottom:190px; margin-left:165px; max-width:75px;" scrolling="no"></iframe>
          </div>
          <br><br>
          <div class="OCGOT-masterlink" style="display:inline-block; position:relative; margin-left:63px"><a href="https://asteriddle.github.io/ocgotchi/">OCGotchi!</a></div>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("ocgot-css", OCGOTRing);