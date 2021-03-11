/**
 * 工具类函数
 */

/**
 * 将一维数组按照规定组成一个二维数组
 * @param Array target 需要转化的一维数组
 * @param Number length 数组的长度
 * @param Number n 第二维的数组元素的数目
 * @return Array newArr
 */
const dimension2 = (target, length, n) => {
  let newArr = []

  for (let i = 0; i < length; i ++) {
    newArr[i] = target.splice(0, n)
  }

  return newArr
}

/**
 * 获取滚动条的距离
 */
function getScrollOffset () {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return { // document.body.scrollLeft 要么有值，要么为0，所以可以两者相加获取到值
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

/**
 * 获取鼠标点击的位置
 */
function getPagePos (e) {
  var e = e || window.event,
      scrollLeft = getScrollOffset().left,
      scrollTop = getScrollOffset().top,
      clientLeft = document.documentElement.clientLeft || 0,
      clientTop = document.documentElement.clientTop || 0

  return {
    x: e.clientX + scrollLeft - clientLeft,
    y: e.clientY + scrollTop + clientTop
  }
}

/**
 * 获取元素相对于文档的距离
 * @param el 需要获取定位的元素
 * @return { object } position
 * 
 * offsetLeft offsetTop 如果父级有定位，则相对父级
 * offsetParent 找到有定位的祖先级
 * 
 */
function getElemDocPosition (el) {
  // offsetParent 可以获取到有定位的父级元素
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop

  // 循环加上父级的定位值
  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

export default {
  dimension2,
  getPagePos,
  getElemDocPosition
}