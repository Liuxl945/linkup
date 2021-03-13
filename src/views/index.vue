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

      <div class="start" @click="startGame" :class="!start? 'disabled' : ''">
        <img src="@/assets/image/開始.png" class="image " alt="">
        <p>开始</p>
      </div>
    </div>
    <div class="game-wrapper">
      <canvas id="J_canvas" class="canvas" width="768" height="640"></canvas>

      <div class="game-start" v-if="start">
        <img src="@/assets/image/未标题-1.png" alt="" srcset="">
      </div>
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

    <div class="game-over" v-if="over">

      <div class="wapper">
        <img src="@/assets/image/showKuang.png" class="bg" alt="" srcset="">

        <p class="text">分数：{{score}}</p>
        <img src="@/assets/image/在玩一遍.png" class="btn" @click="restartGame" alt="" srcset="">
      </div>
      
    </div>
  </div>
</template>

<script>
import LinkUp from "@/assets/js/linkUp"


export default {
  methods: {
    startGame() {

      if(!this.start) {
        return
      }

      this.$store.commit("SET_START", false)

      this.$nextTick(() => {
        let lv = "primary"
        this.linkup = new LinkUp({
            dom: "#J_canvas",
            lv: lv
        }, this)

        this.linkup.init()
        this.$store.dispatch("intervalTimer")
      })
    },
    restartGame() {
      this.$store.commit("SET_SCORE", 0)
      this.$store.commit("SET_TIMER", 120)
      this.$store.commit("SET_OVER", false)
      this.$store.commit("SET_START", false)
      this.$store.dispatch("intervalTimer")

      this.linkup.restartGame()
    }
  },
  
  watch: {
    timer() {
      if(this.timer === 0) {
        console.log("游戏结束")
        this.$store.commit("SET_OVER", true)
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
    },
    start() {
      return this.$store.state.init
    },
    over() {
      return this.$store.state.over
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url("../assets/scss/index.scss");

@keyframes rotate{
    0%{
      transform:scale(1.1)
    }
    50%{
    	transform:scale(1);
    }
    100%{
      transform: scale(1.1);
    }
}

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
      .disabled{
        cursor: not-allowed;
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
      position: relative;
      .game-start{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img{
          height: 250px;
          animation: rotate 1.5s linear infinite;
        }
      }
    }
  
  }

  .game-over{
    background: url('../assets/image/bg-2.png') no-repeat center center;
    position: absolute;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .bg{
      width: 500px;
    }

    .btn{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 14%;
      z-index: 10;
      width: 180px;
      cursor: pointer;
    }

    .text{
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      font-weight: 600;
      font-size: 36px;
      color: #0070c1;
      top: 55%;
    }

    .wapper{
      position: absolute;
      transform: translateY(-10%);
    }
  }
</style>