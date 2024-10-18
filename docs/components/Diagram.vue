<script setup>
import mermaid from "mermaid"
import * as d3 from "d3"
import { onMounted, defineProps, ref } from "vue"

const preview = ref(null);
const fullScreen = ref(null);

const props = defineProps(["id","code"])

onMounted(async () => {
    mermaid.initialize({ startOnLoad: false });

    // Initialize D3 zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 5]) // Min and max zoom level
        .on('zoom', (event) => {

            d3.select(fullScreen.value.querySelector(".diagram")).style('transform', `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`)
        });


    // Render the Mermaid code and extract the SVG
    const { svg } = await mermaid.render(props.id, props.code);
    // Insert rendered SVG into the container
    preview.value.querySelector(".diagram").innerHTML = svg;
    fullScreen.value.querySelector(".diagram").innerHTML = svg;

    d3.select(fullScreen.value).call(zoom);

})

function fullScreenDiagram(e) {
    const fullScreenContainer = e.currentTarget.parentElement.parentElement.nextElementSibling;
    fullScreenContainer.style.display = "flex"
}

function closeFullScreen(e) {
    const fullScreenContainer = e.currentTarget.parentElement;
    fullScreenContainer.style.display = "none"
}

</script>

<template>
    <div class="diagram-container" ref="preview">
        <div class="header"><button @click.capture="fullScreenDiagram"><svg xmlns="http://www.w3.org/2000/svg"
                    width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M4 21q-.425 0-.712-.288T3 20v-6q0-.425.288-.712T4 13t.713.288T5 14v3.6L17.6 5H14q-.425 0-.712-.288T13 4t.288-.712T14 3h6q.425 0 .713.288T21 4v6q0 .425-.288.713T20 11t-.712-.288T19 10V6.4L6.4 19H10q.425 0 .713.288T11 20t-.288.713T10 21z" />
                </svg></button></div>
        <div class="diagram"></div>
    </div>
    <div class="full-screen" ref="fullScreen">
        <button class="close" @click.capture="closeFullScreen"><svg xmlns="http://www.w3.org/2000/svg" width="32"
                height="32" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
            </svg></button>
        <div class="diagram"></div>
    </div>
</template>

<style>
.mermaid {
    display: none;
}

svg {
    position: relative;
}

.header {
    display: flex;
    flex-direction: row-reverse;
    width: 100%
}

.header svg {
    width: 18px;
    height: auto;
}

.diagram-container {
    overflow: hidden;
    box-shadow: #dfdfdf 0 0 0 1px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    margin: 8px 0;
}

.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}


.full-screen .close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    z-index: 10000;
}

.full-screen .diagram {
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    min-width: 60%;
    overflow: auto;
    height: max-content;
    box-sizing: border-box;
}

.full-screen .diagram svg {
    width: 100%;
    height: 100%;
}

.diagram-container .diagram {
    width: 100%;
}
</style>