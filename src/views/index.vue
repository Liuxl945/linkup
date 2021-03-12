<template>
    <div class="container">
    <div class="side-wrapper">

      <div class="score-title">
        <img src="@/assets/image/分數.png" class="image " alt="">
      </div>
      
      <div class="score">
        <img src="@/assets/image/souces.png" class="image souces" alt="">
        <p class="text">{{score}}</p>
      </div>

      <div class="back">
        <img src="@/assets/image/退出.png" class="image " alt="">
        <p>退出</p>
      </div>

      <div class="start">
        <img src="@/assets/image/開始.png" class="image " alt="">
        <p>开始</p>
      </div>
    </div>
    <div class="game-wrapper">
      <canvas id="J_canvas" class="canvas"></canvas>
    </div>

    <div class="right-wapper">
      <div class="clock-wapper">
        <p class="text">{{timer}}s</p>
        <img src="@/assets/image/钟表.png"  class="image" alt="" srcset="">
      </div>
      <div class="process">
        <img src="@/assets/image/進度條.png" :style="position" class="image" alt="" srcset="">
      </div>
      
      
      
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
            }, this)

            linkup.init()

            this.$store.dispatch("intervalTimer")

            // const lvGroup = document.querySelector("#J_level")

            // lvGroup.addEventListener("click", changeLevel, false)

            // function changeLevel (ev) {
            // let e = ev || window.event,
            //     tar = e.target || e.srcElement

            // if (tar.nodeName.toUpperCase() === "BUTTON") {
            //     if (confirm(`是否选择${tar.dataset.levelText}？`)) {
            //         linkup.changeLevel(tar.dataset.level)
            //         }
            //     }
            // }
        })
        
    },
    watch: {
      timer() {
        if(this.timer === 0) {
          console.log("游戏结束")
        }
      }
    },
    computed: {
      score() {
        return this.$store.state.score
      },
      timer() {
        return this.$store.state.timer
      },
      position() {
        return `top: ${(120 - this.timer ) / 120 * 466 }px;`
      }
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
    align-items: center;
    justify-content: center;
    background: url('../assets/image/bg-1.png') no-repeat center center;
    border: 20px solid transparent;
    border-image-slice: 20;
    border-image-width: 20px;
    border-image-outset: 0;
    border-image-repeat: repeat;
    border-radius: 10px;

    .canvas{
      background: #05273c;
    }
  
    .side-wrapper {
      width: 220px;
      height: 640px;
      margin-right: 50px;
      margin-left: 50px;
      // background-image: url('../assets/image/side/side-bg.jpg');
      background-position: 0 0;
      background-size: 100% 100%;
      background: rgba($color: #05273c, $alpha: 0.5);
      
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      text-align: center;
      padding: 50px;

      .score-title{
        margin-bottom: 20px;
      }
      .score {
        margin-bottom: 220px;
        position: relative;
        .text{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 26px;
          font-weight: 600;
          color: #0070c1;
        }
      }
      .start,.back{
        cursor: pointer;
        p{
          margin-top: 5px
        }
      }
      .back{
        margin-bottom: 30px;
      }

      .image{
        height: 56px;
        vertical-align: top;
        img{
          height: 56px;
        }
      }
    }

    .right-wapper{
      width: 200px;
      height: 640px;
      margin-right: 50px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .clock-wapper{
        color: red;
        font-size: 26px;
        .image{
          width: 70px;
          margin-top: 10px;
        }
      }

      .process {
        width: 30px;
        position: relative;
        background: #05273c;
        height: 466px;
        border-radius: 100px;
        box-sizing: border-box;
        margin-top: 20px;
        border: 3px solid #0070c1;
        overflow: hidden;
        .image{
          width: 30px;
          position: absolute;
          left: -3px;
          top: 0;
        }
      }
    }
  
    .game-wrapper {
      flex: 1;
    }
  
  }
</style>