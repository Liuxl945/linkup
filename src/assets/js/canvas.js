import { mahjong } from "../config/mahjong"

class Canvas {
  constructor (opt) {
    this.dom = document.querySelector(opt.canvas)
    this.canvas = this.dom
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = opt.w
    this.canvas.height = opt.h
    this.size = opt.size

    this.pictures = [] // 快照保存的容器

    this.mahjong = mahjong

    // console.log(mahjong)
  }

  get pics () {
    return this.pictures
  }

  set pics (value) {
    this.pictures = value
  }

  // 画直线
  drawLine (coor1, coor2) {
    return new Promise((resolve, reject) => {
      // console.log(coor1, coor2)
      let [x1, y1] = coor1,
          [x2, y2] = coor2

      const [w, h] = this.mahjong.size

      const ctx = this.ctx

      x1 = x1 * w + w / 2
      x2 = x2 * w + w / 2
      y1 = y1 * h + h / 2
      y2 = y2 * h + h / 2

      let changeAxis = x1 === x2 ? "Y" : "X" // 沿着哪条轴来画

      const direction = (changeAxis === "Y" ? (y1 - y2) : (x1 - x2)) > 0 ? "minus" : "plus"
      const speed = Math.abs(changeAxis === "Y" ? (y1 - y2) : (x1 - x2)) / 10

      let timer = null

      ctx.lineWidth = 3
      ctx.strokeStyle = "red"
      ctx.beginPath()
      
      timer = setInterval(() => {
        // 计算坐标值
        let newX,
            newY

        if (changeAxis === "Y") {
          newX = x1
          newY = direction === "minus" ? y1 - speed : y1 + speed
        } else {
          newX = direction === "minus" ? x1 - speed : x1 + speed
          newY = y1
        }
        ctx.moveTo(x1, y1)
        ctx.lineTo(newX, newY)
        ctx.stroke()
        x1 = newX
        y1 = newY
        if ((changeAxis === "Y" && newY === y2) || (changeAxis === "X" && newX === x2)) {
          clearInterval(timer)
          resolve()
        }
      }, 12)
      ctx.closePath()
      
    })
  }

  // 画元素
  drawElement (img, opt) {

    let mahjong = this.mahjong
    const [w, h] = mahjong.size
    const [sx, sy] = mahjong.types[opt.type].pos

    // 源图片，源图片裁剪点的x,y裁剪的宽,高，放置到canvas的x,y，宽高
    this.ctx.drawImage(img, sx * w, sy * h, w, h, opt.x * w, opt.y * h, w, h)
  }

  // 画边框
  drawBorder (opt) {
    const { x, y, w, h, size, color } = opt

    // 设置画笔大小
    this.ctx.lineWidth = size || 5
    this.ctx.strokeStyle = color || "orange"

    // 画圆角
    this.strokeRoundRect(x, y, w, h, 10)
  }

  // 保存快照
  savePic () {
    const pic = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
          pics = this.pics
          
    pics.push(pic)
    this.pics = pics
    return pics
  }

  /**
   * 画圆角矩形路径
   * @param Number x 左上角x坐标
   * @param Number y 左上角y坐标
   * @param Number w 矩形的宽度
   * @param Number h 矩形的高度
   * @param Nubmer r 圆角半径
   */
  drawRoundRectPath (x, y, w, h, r) {
    if (2 * r > w || 2 * r > h) {
      // 圆角的直径比宽度或高度大是不可以的
      return
    }

    // 计算坐标点
    const x1 = x + r, // 左上圆弧x坐标
          y1 = y + r, // 左上圆弧y坐标

          br = w - r * 2, // 横线长度
          hr = h - r * 2, // 竖线长度

          x2 = x1 + br, // 右上圆弧x坐标
          y2 = y1, // 右上圆弧y坐标

          x3 = x1,
          y3 = y1 + hr,

          x4 = x2,
          y4 = y3

    // console.log([x1, y1], [x2, y2], [x3, y3], [x4, y4], [br, hr])

    const ctx = this.ctx
  
    ctx.beginPath()
    // 绘制左上圆弧
    ctx.arc(x1, y1, r, Math.PI, 1.5 * Math.PI, false)
    // 绘制右上圆弧
    ctx.arc(x2, y2, r, 1.5 * Math.PI, 2 * Math.PI, false)

    // 绘制右下圆弧
    ctx.arc(x4, y4, r, 0, 0.5 * Math.PI, false)

    // 绘制左下圆弧
    ctx.arc(x3, y3, r, 0.5 * Math.PI, Math.PI, false)
    ctx.closePath()
  }

  // 绘制描边的圆角矩形
  strokeRoundRect (x, y, w, h, r, lineWidth, lineColor) {
    this.drawRoundRectPath(x, y, w, h, r)

    if (lineWidth) {
      this.ctx.lineWidth = lineWidth
    }
    if (lineColor) {
      this.ctx.strokeStyle = lineColor
    }

    this.ctx.stroke()

  }

  // 绘制填充的圆角矩形
  fillRoundRect (x, y, w, h, r, color) {
    this.ctx.fillStyle = color
    this.strokeRoundRect(x, y, w, h, r,)
    this.ctx.fill()
  }

  // 使用快照中的内容重绘
  drawPics () {
    const pics = this.pics
    const pic = pics.slice(-1)[0]
    // this.pics = pics
    // console.log(pics)
    // 先清除画布
    this.clear()
    this.ctx.putImageData(pic, 0, 0)
  }

  // 清除画布
  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // 角度转换成弧度
  angle2deg (r) {
    return r * (Math.PI / 180)
  }

  // 弧度转换成角度
  deg2angle (deg) {
    return (Math.PI / deg) * 180
  }

}

export default Canvas