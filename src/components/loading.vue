<template>
    <div class="loading">
        <div class="loading3">
            <div class="circle circle1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="circle circle2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="circle circle3">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <p class="tips">{{tips}}</p>

        <p class="progress">{{progress}}%</p>
    </div>
</template>

<script>
export default {
    props: {
        tips: {
            type: String,
            default: "数据加载中"
        },
        progress: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>

@function rem($n){
  @return $n/(100)+rem;
}

.tips{
    font-size: rem(16);
}
.progress{
    padding-top: rem(6);
    font-size: rem(16);
}

.loading{
    z-index: 1000;
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    top: 0;
    bottom: 0;
    background: rgb(221, 61, 47, 0.7);
    color: #fff;

    .loading3{
        width:rem(30);
        height:rem(30);
        margin:rem(25) auto;
        position:relative;
    }
    .circle{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    .circle span{
        width:rem(6);
        height:rem(6);
        display:inline-block;
        background:#fff;
        border-radius: 100%;
        position:absolute;
        -webkit-animation: mycircle 1.2s infinite ease-in-out;
        animation: mycircle 1.2s infinite ease-in-out;
        -webkit-animation-fill-mode:both;
        animation-fill-mode:both;
    }
    .circle2{
        -webkit-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
    }
    .circle3{
        -webkit-transform: rotateZ(90deg);
        transform: rotateZ(90deg);
    }
    .circle>span:nth-child(1){
        top:0;
        left:0;
    }
    .circle>span:nth-child(2){
        top:0;
        right:0;
    }
    .circle>span:nth-child(3){
        right:0;
        bottom:0;
    }
    .circle>span:nth-child(4){
        left:0;
        bottom:0;
    }
    .circle2 >span:nth-child(1){
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    .circle3 >span:nth-child(1){
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
    .circle1 >span:nth-child(2){
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    .circle2 >span:nth-child(2){
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    .circle3 >span:nth-child(2){
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
    .circle1 >span:nth-child(3){
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }
    .circle2 >span:nth-child(3){
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
    .circle3 >span:nth-child(3){
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }
    .circle1 >span:nth-child(4){
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }
    .circle2 >span:nth-child(4){
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
    .circle3 >span:nth-child(4){
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }
    @-webkit-keyframes mycircle{
        0%{transform:scale(0.0);}
        40%{transform:scale(1.0);}
        80%{transform:scale(0.0);}
        100%{transform:scale(0.0);}
    }
    @keyframes mycircle{
        0%{transform:scale(0.0);}
        40%{transform:scale(1.0);}
        80%{transform:scale(0.0);}
        100%{transform:scale(0.0);}
    }
}
</style>