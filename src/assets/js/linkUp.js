import Canvas from "./canvas"
import { mahjong } from "../config/mahjong"
import tools from "../utils/tools"

class LinkUp {

  constructor (opt) {
    // 游戏相关的元素
    this.lv = opt.lv
    this.level = {
      "test": { row: 6, col: 6 },
      "primary": {
        // row: 8,
        row: 10,
        // col: 8,
        col: 10
      },
      "middle": {
        // row: 8,
        row: 10,
        // col: 12,
        col: 14
      },
      "high": {
        // row: 8,
        row: 10,
        // col: 17,
        col: 19
      }
    }

    /**
     * 麻将对应参数
     */
    this.mahjong = mahjong


    this.shuffleElement = []

    // 保存元素的容器
    this.elements = []
    this.testElements = [] // 这里保存着用于测试的元素

    this.firstClick = null // 点击第一个元素标识
    this.secondClick = null // 点击第二个元素标识

    this.gameStatus = "normal"

    
    this.image = new Image()
    this.image.src = this.mahjong.image || "/img/mahjong.png"
    this.lineInfo = []
    
    // 实例化canvas
    this.canvas = new Canvas({
      canvas: opt.dom,
      w: 1160,
      h: 750,
      size: this.level[this.lv]
    })
    
    // this.init()
  }

  async init () {

    await this.loadImage()

    await this.genElement()

    // 绘制麻将
    this.drawElement()
    this.addEvent()
  }


  addEvent () {
    this.canvas.dom.addEventListener("click", this.handleCanvasClick.bind(this), false)
  }

  async changeLevel (lv) {
    this.lv = lv
    await this.genElement()
    // 绘制麻将
    this.drawElement()
  }

  // 加载图片
  loadImage () {
    return new Promise((resolve, reject) => {
      var _this = this
      this.image.onload = function () {
        resolve(_this.image)
      }

      this.image.onerror = function () {
        reject()
      }
    })
  }

  // 洗牌
  // 返回一个按行列区分的二维数组
  shuffle () {
    let types = Object.keys(this.mahjong.types)

    let lv = this.level[this.lv] // 难度
    let number = (lv.col - 2) * (lv.row - 2) / 2 // 除以2是为了有对应的牌

    // 复制一份，并打乱数组
    types = [...types, ...types].sort(() => 0.5 - Math.random())

    let element = types.splice(0, number)

    // 加上对应的牌再打乱
    element = [...element, ...element].sort(() => 0.5 - Math.random()) // [elem1, ...elemn]

    let dimension2 = tools.dimension2(element, lv.row - 2, lv.col - 2) // 拆分成二维数组
    

    // 外围再添加上一层空元素层
    let newArr = dimension2.map((item) => {
      return ["", ...item, ""]
    })

    let empty = Array(lv.col).fill("", 0, lv.col)
    newArr.push(empty)
    newArr.unshift(empty)

    return newArr

  }

  // 存储元素信息
  saveElement () {
    let element = this.shuffleElement,
        length = element.length

    // console.log(element)
    for (let i = 0; i < length; i ++) {
      let item = element[i],
          itemLength = item.length

      this.elements[i] = []

      for (let j = 0; j < itemLength; j ++) {
        let opt = {
          type: item[j],
          x: j,
          y: i,
          remove: !item[j]
        }

        // 存储相关数据
        this.elements[i][j] = opt
        // 绘制
        // this.canvas.drawElement(img, opt)
      }
    }

  }

  // 生成元素
  genElement () {
    return new Promise ((resolve, reject) => {
      // // 全解测试
      if (this.testElement()) {
        resolve()
      }
    })
  }


  // 全解测试
  // 这里是为了保证每一局都可以完全解开
  testElement () {
    // 洗牌
    this.shuffleElement = this.shuffle()
    // 设置元素信息
    this.saveElement()

    this.testElements = this.copyElements()

    const elements = this.testElements.reduce((prev, item) => {
      prev.push(...item)
      return prev 
    }, [])

    let flag = this.testFunction(elements, 0)
    
    const { col, row } = this.level[this.lv]

    // console.log(flag)

    if (flag === col * row) {
      // 所有元素均被移除，游戏可以解开
      console.log("全解测试成功！") // 这个console.log留着
      return true
    } else {
      // 游戏无法解开
      // console.log(1)
      return this.testElement()
    }
  }

  testFunction (el, removeNum = 0) {

    let len = el.length
    for (let i = 0; i < len - 1; i ++) {
      let start = el[i]
      if (start.remove) {
        continue
      }
      for (let j = i + 1; j < len; j ++) {
        let end = el[j]
        if (end.remove) {
          continue
        }
        if (start.type !== end.type) {
          continue
        }

        if (
          (start.x === end.x && Math.abs(start.y - end.y) === 1)
          || (start.y === end.y && Math.abs(start.x - end.x) === 1)
          || this.line2line(start, end, this.testElements)
        ) {
          this.testElements[start.y][start.x].remove = true
          this.testElements[end.y][end.x].remove = true
          // console.log(1, start, end)
          break
        }
      }
    }

    
    let flag = 0

    flag = el.reduce((prev, item) => {
      return prev + (item.remove ? 1 : 0)
    }, 0)
    // console.log(flag, removeNum)
    if (flag === removeNum) {
      return flag // 递归出口
    }
    if (flag !== 0) {
      return this.testFunction(el, flag)
    }
  }

  // 克隆一份用于测试
  copyElements () {
    return JSON.parse(JSON.stringify(this.elements))
  }

  // 绘制元素
  drawElement () {
    this.canvas.clear() // 先清除画布
    const elements = this.elements

    elements.forEach(item => {
      item.forEach(element => {
        if (!element.remove) { // 被移除后的数据不绘制
          this.canvas.drawElement(this.image, element)
        }
      })
    })
    // 绘制完成后，保存快照
    this.canvas.savePic()
  }

  /**
   * 点击
   */
  handleCanvasClick (ev) {
    const e = ev || window.event
    
    const { col, row } = this.level[this.lv],
          [w, h] = this.mahjong.size

    const pos = this.getCanvasClickPos(e)
    if (pos.x < 0 || pos.y < 0 || pos.x > col * w  || pos.y > row * h) {
      // 点击的非游戏区域。
      return
    }

    if (this.gameStatus !== "normal") {
      // 非正常游戏状态，无法点击
      return
    }

    this.lineInfo = [] // 重置当前的画线内容

    let x = Math.floor(pos.x / w) * w,
        y = Math.floor(pos.y / h) * h
    
    const clickInfo = { x, y, w, h, element: this.elements[y / h][x / w] }
    if (!this.firstClick) { // 第一次点击
      this.firstClick = clickInfo
    } else if (!this.secondClick) { // 第二次点击
      if (clickInfo.x === this.firstClick.x && clickInfo.y === this.firstClick.y) {
        // 点击的是同一个位置
        // 移除元素的标识，并清除当前的点击状态
        this.canvas.drawPics()
        this.firstClick = null
        return
      }
      this.secondClick = clickInfo
    } else {
      // 第三次点击
      return
    }
    // 给选中元素画个边框，标识
    // console.log(x, y)
    if (!this.elements[y / h][x / w].remove) {
      this.canvas.drawBorder(Object.assign({}, clickInfo, {size: 5, color: "orange"}))
    }

    // 检测是否能消除
    this.check()
  }

  // 验证
  check () {
    if (this.firstClick && this.secondClick) {
      // 只有当点击了两个元素之后才做验证
      // 设置游戏状态为验证
      this.gameStatus = "check"

      const fc = this.firstClick,
            sc = this.secondClick,

            x1 = fc.x / fc.w,
            y1 = fc.y / fc.h,
            x2 = sc.x / sc.w,
            y2 = sc.y / sc.h


      // 获取两个元素
      const elements = this.elements,
            el1 = elements[y1][x1],
            el2 = elements[y2][x2]
   
      if (el1.type === el2.type) { // 首先得两个元素都是同类型的
        if (
          (x1 === x2 && Math.abs(y1 - y2) === 1)
          || (y1 === y2 && Math.abs(x1 - x2) === 1)
          || this.line2line(el1, el2, this.elements)
        ) {
          // 1. 相邻的元素
          // 2. 连线情况
          this.removeElement(el1, el2)
          return true
        }
      }

      this.clearRoundRect()
      return false
    }
  }

  isRemove (x, y, el) {
    const element = el || this.elements
    return element[y][x].remove
  }

  line2line (start, end, el) {
    const {x: sx, y: sy} = start,
          {x: ex, y: ey} = end

    // console.log(sx, sy, ex, ey)
    // 水平检测
    return this.horizonCheck(sx, sy, ex, ey, el) || this.verticalCheck(sx, sy, ex, ey, el) || this.turnOnceCheck(sx, sy, ex, ey, el) || this.turnTwiceCheck(sx, sy, ex, ey, el)
  }

  // 水平检测
  // [ ] [ ] [ ] [ ] [ ]
  // [ ] [A] [ ] [B] [ ]
  // [ ] [ ] [ ] [ ] [ ]
  horizonCheck (x1, y1, x2, y2, el) {
    if (y1 !== y2) { // 不在同一条y轴上
      return false
    }

    var startX = Math.min(x1, x2),
        endX = Math.max(x1, x2)

    for (let x = startX + 1; x < endX; x ++) {
      if (!this.isRemove(x, y1, el)) { // 中间有障碍物，GG
        // console.log("horizon: gg")
        return false
      }
    }

    this.lineInfo = [[x1, y1], [x2, y2]]
    return true
  }

  // 垂直检测
  // [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [A] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [B] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ]
  verticalCheck (x1, y1, x2, y2, el) {
    if (x1 !== x2) { // 不在同一条x轴上
      return false
    }

    var startY = Math.min(y1, y2),
        endY = Math.max(y1, y2)

    for (let y = startY + 1; y < endY; y ++) {
      if (!this.isRemove(x1, y, el)) { // 中间有障碍物，GG
        // console.log("vertical: gg")
        return false
      }
    }

    this.lineInfo = [[x1, y1], [x2, y2]]

    return true
  }

  // 一个拐角的检测
  // 等同于：
  // 1. A 到 C 的垂直检测 + C 到 B 的水平检测
  // 2. A 到 D 的水平检测 + D 到 B 的垂直检测
  // [ ] [ ] [ ] [ ] [ ]
  // [ ] [C] [ ] [B] [ ]
  // [ ] [ ] [ ] [ ] [ ]
  // [ ] [A] [ ] [D] [ ]
  // [ ] [ ] [ ] [ ] [ ]
  turnOnceCheck (x1, y1, x2, y2, el) {
    let cx = x1,
        cy = y2,

        dx = x2,
        dy = y1

    let ret = false

    if (this.isRemove(cx, cy, el)) { // c点必须是空元素才行
      ret = this.verticalCheck(x1, y1, cx, cy, el) && this.horizonCheck(cx, cy, x2, y2, el)
    }

    if (ret) {
      this.lineInfo = [[x1, y1], [cx, cy], [x2, y2]]
      return ret
    } else if (this.isRemove(dx, dy, el)) { // 上一条路走不通，且d点也是空元素
      ret = this.horizonCheck(x1, y1, dx, dy, el) && this.verticalCheck(dx, dy, x2, y2, el)

      if (ret) {
        this.lineInfo = [[x1, y1], [dx, dy], [x2, y2]]
      }
    }

    return ret
  }

  // 两次拐角检测
  // 等同于 一个拐角检测 + （水平检测或垂直检测）

  // [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  // [c] [ ] [ ] [ ] [ ] [B] [ ]
  // [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  // [ ] [ ] [ ] [ ] [ ] [ ] [ ]
  // [ ] [x] [ ] [ ] [ ] [ ] [ ]
  // [ ] [c] [ ] [ ] [ ] [c] [ ]
  // [c] [A] [c] [x] [ ] [ ] [ ]
  // [ ] [c] [ ] [ ] [ ] [c] [ ]
  // [ ] [ ] [ ] [ ] [ ] [ ] [ ]

  // 上图
  // B点的水平、垂直线，A点的水平、垂直线共四条，扫描这四条线上所有的不包括A或B的点，找到满足以下情况之一的C点：
  // 1. A可以通过垂直或水平检测找到C，然后C可以通过一个拐角检测找到B；
  // 2. A可以通过一个拐角检测找到C，然后C可以通过垂直或水平检测找到B。
  turnTwiceCheck (x1, y1, x2, y2, el) {
    const { col, row } = this.level[this.lv]
    // console.log(col, row)
    for (let i = 0; i < col; i ++) {
      for (let j = 0; j < row; j ++) {
        // console.log([i, j])
        if (i !== x1 && i !== x2 && j !== y1 && j !== y2) {
          // 非线上的点
          continue
        }

        if ((i === x1 && j === y1) || (i === x2 && j === y2)) {
          // 是A点或B点
          continue
        }

        if (!this.isRemove(i, j, el)) {
          // 非空白点也跳过
          continue
        }

        // console.log([x1, y1,],[x2, y2],[i, j])
        let lineInfo = []
        if (
          this.turnOnceCheck(x1, y1, i, j, el) &&
          (lineInfo = this.lineInfo) &&
          (
            this.horizonCheck(i, j, x2, y2, el) || 
            this.verticalCheck(i, j, x2, y2, el)
          )
        ) {
          // A可以通过垂直或水平检测找到C，然后C可以通过一个拐角检测找到B；
          this.lineInfo = [...lineInfo, [x2, y2]]
          return true
        } else if (
          this.turnOnceCheck(i, j, x2, y2, el) &&
          (lineInfo = this.lineInfo) &&
          (
            this.horizonCheck(x1, y1, i, j, el) || 
            this.verticalCheck(x1, y1, i, j, el)
          )
        ) {
          // A可以通过一个拐角检测找到C，然后C可以通过垂直或水平检测找到B。
          this.lineInfo = [[x1, y1], [i, j], ...lineInfo]
          return true
        }
      }
    }
    return false
  }

  async clearRoundRect () {
    this.gameStatus = "loading"
    // console.log(this.firstClick, this.secondClick)
    // if (this.elements[this.firstClick[]])
    if (!this.firstClick.element.remove && !this.secondClick.element.remove) {
      await this.showError()
    }
    await this.canvas.drawPics()
    this.firstClick = null
    this.secondClick = null
    this.gameStatus = "normal"
  }

  showError () {
    return new Promise((resolve, reject) => {

      let timer = null,
          n = 0
      timer = setInterval(() => {
        this.canvas.drawBorder(Object.assign({}, this.firstClick, {"color": n % 2 === 0 ? "red" : "orange"}))
        this.canvas.drawBorder(Object.assign({}, this.secondClick, {"color": n % 2 === 0 ? "red" : "orange"}))
        n ++

        if (n === 4) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  }

  async removeElement (el1, el2) {
    this.gameStatus = "animation"
    el1.remove = true
    el2.remove = true

    // console.log(this.firstClick, this.secondClick)

    if (!this.firstClick.remove && !this.secondClick.remove && this.lineInfo.length > 0) {
      
      this.canvas.drawBorder(Object.assign({}, this.firstClick, {"color": "red"}))
      this.canvas.drawBorder(Object.assign({}, this.secondClick, {"color": "red"}))
      await this.drawLine()
    }

    await this.drawElement() // 重绘
    // 判断游戏状态
    await this.checkGameStatus()
    this.firstClick = null
    this.secondClick = null
    this.gameStatus = "normal"
  }
  
  async drawLine () {
    const lineInfo = this.lineInfo

    for (let i = 0; i < lineInfo.length; i ++) {
        if (i === 0) {
          continue
        }
        await this.canvas.drawLine(lineInfo[i - 1], lineInfo[i])
    }

    this.lineInfo = [] // 重置lineInfo
  }

  // 查询当前的游戏状态
  checkGameStatus () {
    const elements = this.elements,
          {row, col} = this.level[this.lv]

    let flag = 0

    flag = elements.reduce((prev, item) => {
      return prev + item.reduce((ip, ii) => {
        return ip + (ii.remove ? 1 : 0)
      }, 0)
    }, 0)
    if (flag === row * col) {
      alert("you win")
      return true
    }
  }

  /**
   * 获取当前点击canvas的位置
   */
  getCanvasClickPos (e) {
    let {x, y} = tools.getPagePos(e),
        {left, top} = tools.getElemDocPosition(this.canvas.dom)

    return {
      x: x - left,
      y: y - top
    }
  }

}

export default LinkUp