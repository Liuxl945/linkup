<template>
    <div class="container">
    <div class="side-wrapper">
      <div class="name"></div>
      <div class="level-group" id="J_level">
        <button class="J_btn btn btn-primary" data-level="primary" data-level-text="普通难度"></button>
        <button class="J_btn btn btn-middle" data-level="middle" data-level-text="中等难度"></button>
        <button class="J_btn btn btn-high" data-level="high" data-level-text="高级难度"></button>
      </div>
    </div>
    <div class="game-wrapper">
      <canvas id="J_canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import LinkUp from "@/assets/js/linkUp"

export default {
    mounted() {

        this.$nextTick(() => {
            let lv = "primary"

            const linkup = new LinkUp({
                dom: "#J_canvas",
                lv: lv
            })

            linkup.init()

            const lvGroup = document.querySelector("#J_level")

            lvGroup.addEventListener("click", changeLevel, false)

            function changeLevel (ev) {
            let e = ev || window.event,
                tar = e.target || e.srcElement

            if (tar.nodeName.toUpperCase() === "BUTTON") {
                if (confirm(`是否选择${tar.dataset.levelText}？`)) {
                    linkup.changeLevel(tar.dataset.level)
                    }
                }
            }
        })
        
    }
}
</script>

<style lang="scss" scoped>
// @import url("../assets/scss/index.scss");

html, body {
    margin: 0;
    padding: 0;
  }
  
  .container {
    display: flex;
    width: 1400px;
    height: 750px;
    margin: 50px auto;
    background: url('../assets/image/table-2.jpg') repeat scroll 0 0;
    border: 20px solid transparent;
    border-image-source: url('../assets/image/border.png');
    border-image-slice: 20;
    border-image-width: 20px;
    border-image-outset: 0;
    border-image-repeat: repeat;
    border-radius: 10px;
  
    .side-wrapper {
      width: 240px;
      background-image: url('../assets/image/side/side-bg.jpg');
      background-position: 0 0;
      background-size: 100% 100%;
  
      .name {
        width: 207px;
        height: 154px;
        margin: 100px auto;
        background-image: url('../assets/image/side/name.png');
        background-position: 0 0;
        background-size: 100% 100%;
      }
  
      .level-group {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 207px;
        height: 150px;
        margin: 50px auto;
  
        .btn {
          width: 150px;
          height: 40px;
          margin: 0;
          padding: 0;
          background-position: 0 0;
          background-size: 150px 40px;
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
  
          &.btn-primary {
            background-image: url('../assets/image/side/btn_primary.png');
          }
  
          &.btn-middle {
            background-image: url('../assets/image/side/btn_middle.png');
          }
  
          &.btn-high {
            background-image: url('../assets/image/side/btn_high.png');
          }
        }
      }
    }
  
    .game-wrapper {
      flex: 1;
    }
  
  }
</style>