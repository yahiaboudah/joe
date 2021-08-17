/** ***********************************新界面网格视图的构造函数****************************************/
$.global.GridView = GridView
function GridView(parent, attrs) {
  var keepRef = this
  /** **********************继承函数************************************************************/
  this.extend = function(target, source) {
    for (var i in source) target[i] = source[i]
    return target
  }
  /** *********************item 构造器***********************************************************************/
  this.item = function(text, image, parent) { // item 构造器
    if (!text) text = ''
    if (!image) image = null
    keepRef.extend(this, {
      id: 'item',
      index: 0,
      type: 'item',
      image: image,
      text: text,
      selected: false,
      prev: null,
      next: null,
      parent: parent,
      backgroundColor: null,
      strokeColor: null,
      rect: [0, 0, 100, 60], // item的矩阵信息
      imageRect: [0, 0, 100, 60], // item中图片的矩阵信息，为相对rect的量
      fontRect: [0, 90, 100, 10] // item中文字背景的矩阵信息，为相对rect的量
    })
    /** *****************item 原型****************************************************************************/
    keepRef.extend(this, {
      remove: function(notRefreshList) { // 移除元素, 若notRefreshList为true，默认不刷新列表
        var e = this.parent
        var prev = this.prev
        var next = this.next
        if (prev) {
          prev.next = next
          if (next) {
            next.prev = prev
          }
        } else {
          next.prev = null
        }

        if (this === e.lastSelectedItem) e.lastSelectedItem = null
        e.getChildren()
        e.getSelection()

        if (!notRefreshList) e.refresh()
      },
      moveUp: function() { // 元素上移
        try {
          var e = this.parent
          var prev = this.prev
          var next = this.next
          if (prev) {
            if (prev.prev) { prev.prev.next = this }
            this.prev = prev.prev
            this.next = prev
            prev.prev = this
            prev.next = next
            if (next) { next.prev = prev }
          }
          if (this.prev === null) { e.first = this }
          e.getChildren()
          e.refresh()
        } catch (err) {
          alert(err.line.toString())
        }
      },
      moveDown: function() { // 元素下移
        try {
          var e = this.parent
          var prev = this.prev
          var next = this.next
          if (next) {
            var right = this.next.next
            if (prev) { prev.next = next }
            next.prev = prev
            next.next = this
            this.prev = next
            this.next = right
            if (right) { right.prev = this }
          }
          if (next.prev === null) { e.first = next }
          e.getChildren()
          e.refresh()
        } catch (err) {
          alert(err.line.toString())
        }
      },
      moveBefore: function(item) { // 将当前item移动到指定item之前
        var e = this.parent
        this.remove(1)
        if (this.next) { this.next.prev = this.prev }
        if (this.prev) { this.prev.next = this.next }
        this.next = item
        this.prev = item.prev
        if (item.prev) {
          item.prev.next = this
        }
        item.prev = this
        if (this.prev === null) { e.first = this }
        e.getChildren()
        e.refresh()
      },
      moveAfter: function(item) { // 将当前item移动到指定item之后
        var e = this.parent
        this.remove(1)
        this.prev.next = this.next
        this.next.prev = this.prev
        this.prev = item
        this.next = item.next
        if (item.next) {
          item.next.prev = this
        }
        item.next = this

        e.getChildren()
        e.refresh()
      }
    })
  }

  /** *********************网格视图的默认属性***********************************************************************/
  this.extend(this, {
    id: 'GridView',
    type: 'GridView',

    listHeight: 400, // 列表的总高度
    scale: 1, // 列表缩放
    backgroundColor: [0.15, 0.15, 0.15], // 背景色
    scrollBlockColor: [0.16, 0.16, 0.16], // 滚动条滑块颜色
    scrollBarColor: [0.08, 0.08, 0.08], // 滚动条背景颜色
    scrollBarWidth: 17, // 滚动条宽度
    scrollBarValue: 0, // 滚动条值
    scrollBlockRect: [0, 0, 20, 100], // 滚动条滑块的矩阵信息
    scrollScale: 1, // 滚动条是否显示,为0时滚动条消失（不可设置）
    spacing: [3, 3], // item的间距
    itemBackgroundColor: [0, 0, 0, 0], // item的背景颜色
    itemStrokeColor: [0.2, 0.2, 0.2, 0], // item的边框描边颜色
    itemSelectedColor: [38 / 255, 38 / 255, 38 / 255], // item被选中时的颜色
    itemSelectedRecColor: [0.2, 0.7, 1], // item被选中时的颜色
    itemFontColor: [1, 1, 1], // item的字体颜色
    //          itemFontColor: [0.023, 0.023, 0.023],//item的字体颜色
    itemSize: [100, 60], // item的大小
    itemStrokeSize: 1.6, // item的边框描边大小
    itemFontHeight: 0, // item的字体大小
    itemFontSize: 20, // item的字体大小
    showText: false, // 是否显示文字
    limitText: false,
    version: 'CC2014',
    first: null, // 第一个item
    last: null, // 最后一个item
    children: [], // 所有的item
    selection: [], // 被选中的item
    lastSelectedItem: null, // 最后一次被选中的item

    leftClick: function(event) { }, // 左键单击事件
    leftDoubleClick: function(event) { }, // 左键双击事件
    rightClick: function(event) { }, // 右键单击事件
    rightDoubleClick: function(event) { }, // 右键双击事件
    mouseMove: function(event) { }, // 鼠标移动事件
    mouseOut: function(event) { }
  })

  /** *******************网格视图的原型*************************************************************************/
  this.extend(this, {
    add: function(text, image) { // 添加元素
      var newItem = new this.item(text, image, this)
      if (this.first) {
        this.last.next = newItem
        newItem.prev = this.last
        this.children.push(newItem)
        this.last = this.children[this.children.length - 1]
        this.last.index = this.last.prev.index + 1
      } else {
        this.first = this.last = newItem
        this.children.push(newItem)
        this.first.index = 0
      }

      this.getSelection()

      return newItem
    },
    removeAll: function() { // 移除所有元素
      this.first = this.last = this.lastSelectedItem = null
      this.selection = this.children = []
    },
    getChildren: function() { // 获取子元素
      var children = []
      var item = this.first
      var index = 0

      while (item) {
        children.push(item)
        item.index = index
        item = item.next
        index++
      }

      this.children = children
      if (children.length) {
        this.first = children[0]
        this.last = children[children.length - 1]
      }
      return children
    },
    getSelection: function() { // 获取选中元素
      var selection = []
      var item = this.first

      while (item) {
        if (item.selected) selection.push(item)
        item = item.next
      }

      this.selection = selection
      return selection
    },
    create: function(parent) { // 创建网格视图，包括监听在内
      var e = this
      var GV = e.GV = parent.add("group{orientation: 'stack', alignment: ['fill','fill'], margins: 0, spacing: 0}")
      var list = e.list = GV.add("button{alignment:['fill','fill']}")
      var eventRect = e.eventRect = GV.add("group{alignment:['fill','fill']}")
      var screen = $.screens[0].toString().split('-').pop().split(':')
      GV.maximumSize =
      list.maximumSize =
      eventRect.maximumSize = [parseInt(screen[0]), parseInt(screen[1])]

      eventRect.addEventListener('mousedown', function(event) {
        e.event.mouseMoving = false
        e.event.targetScrollBar = e.getScrollBarFromLocation(event.clientX, event.clientY)
        e.event.targetItem = e.getItemFromLocation(event.clientX, event.clientY)
        if (event.button === 0) { // 左键
          if (event.detail === 1) { // 左键单击
            e.event.leftButtonPressed = true
            e.event.leftButtonPressedLocation = [event.clientX, event.clientY]
            e.event.leftButtonPressedScrollBarValue = e.scrollBarValue
            /***************************************/
            if (event.ctrlKey === false) { e.mouseMove(event, e.event.targetItem, true) }

            /***************************************/
          } else if (event.detail === 2) { // 左键双击
            e.leftDoubleClick(event)
          }
        } else if (event.button === 2) { // 右键
          if (event.detail === 1) { // 右键单击
            e.event.rightButtonPressed = true
            e.event.rightButtonPressedLocation = [event.clientX, event.clientY]
            e.event.rightButtonPressedScrollBarValue = e.scrollBarValue
            /***************************************/

            /***************************************/
          } else if (event.detail === 2) { // 右键双击
          }
        }
      })
      eventRect.addEventListener('mousemove', function(event) {
        e.event.mouseMoving = true
        if (e.event.leftButtonPressed) { // 左键移动
          /***************************************/
          e.defaultLeftMouseMove(event)
          e.refresh()
          /***************************************/
        } else if (e.event.rightButtonPressed) { // 右键移动

          /***************************************/

          /***************************************/
        }
        if (event.ctrlKey === false) { e.mouseMove(event, e.getItemFromLocation(event.clientX, event.clientY)) }
      })
      eventRect.addEventListener('mouseup', function(event) {
        if (e.event.leftButtonPressed) { // 左键
          if (e.event.mouseMoving) {
            /***************************************/
            e.defaultLeftClick(event)
            e.leftClick(event)
            /***************************************/
          } else {
            e.defaultLeftClick(event)
            e.leftClick(event)
          }
        } else if (e.event.rightButtonPressed) { // 右键
          if (e.event.mouseMoving) {
            /***************************************/
            e.rightClick(event)
            /***************************************/
          } else if (event.detail === 1) {
            e.rightClick(event)
          } else if (event.detail === 2) {
            e.rightDoubleClick(event)
          }
        }
        e.event.leftButtonPressed = false
        e.event.rightButtonPressed = false
        e.event.mouseMoving = false
        e.event.targetScrollBar = false
        e.refresh()
      })
      /*
        eventRect.addEventListener('mouseout', function(event) {
            e.event.leftButtonPressed = false;
            e.event.rightButtonPressed = false;
            e.event.mouseMoving = false;
            e.event.targetScrollBar = false;
            e.mouseOut();
            e.refresh();
        });
      */

      list.onDraw = e.listDraw
      list.GV = e
    },
    alignment: function(alignment) {
      this.GV.alignment = alignment
    },
    size: function(size) {
      this.GV.size = size
      this.list.size = size
      this.eventRect.size = size
    },
    location: function(location) {
      this.GV.location = location
    },
    listDraw: function() { // 重绘函数
      var e = this.GV
      var g = this.graphics
      var items = e.children

      var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, e.backgroundColor)
      var itemBgBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemBackgroundColor)
      var strokePen = g.newPen(g.PenType.SOLID_COLOR, e.itemStrokeColor, e.itemStrokeSize)
      var selectedPen = g.newPen(g.PenType.SOLID_COLOR, e.itemSelectedRecColor, e.itemStrokeSize)
      var selectedBrush = g.newBrush(g.PenType.SOLID_COLOR, e.itemSelectedColor)
      var scrollBarBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBarColor)
      var scrollBlockBrush = g.newBrush(g.PenType.SOLID_COLOR, e.scrollBlockColor)

      if (e.showText) e.itemFontHeight = e.itemFontSize
      else e.itemFontHeight = 0
      e.relocationItems()
      e.resizeItems()
      e.resizeScrollBar()
      /******************************************************************************************/
      // 绘制背景
      g.newPath()
      g.rectPath(0, 0, e.list.size[0] - e.scrollBarWidth * e.scale * e.scrollScale, e.list.size[1])
      g.fillPath(bgBrush)
      /******************************************************************************************/
      var shouldDrawArr = []
      var pointArr = []
      var limit = e.GV.size[1]

      for (var i = 0; i < items.length; i++) {
        var target = items[i]
        var height = target.rect[1] + target.imageRect[1] - e.scrollBarValue + target.imageRect[3]
        var shouldDraw = height > 0 && height - target.imageRect[3] + 10 < limit
        shouldDrawArr.push(shouldDraw)
        pointArr.push(
          [
            target.rect[0],
            target.rect[1],
            target.rect[2],
            target.rect[3],
            target.rect[1] - e.scrollBarValue
          ]
        )
      }
      // item背景色填充
      g.newPath()
      for (i = 0; i < items.length; i++) {
        var item = items[i]
        var rect = pointArr[i]
        if (items[i].backgroundColor) continue

        g.rectPath(
          rect[0],
          rect[4],
          rect[2],
          rect[3] - item.fontRect[3]
        )
      }
      g.fillPath(itemBgBrush)
      // 添加item指定的背景色
      for (i = 0; i < items.length; i++) {
        item = items[i]
        rect = pointArr[i]
        if (item.backgroundColor) {
          var brush = g.newBrush(g.PenType.SOLID_COLOR, item.backgroundColor)
          g.newPath()
          g.rectPath(
            rect[0],
            rect[4],
            rect[2],
            rect[3]
          )
          g.fillPath(brush)
        }
        // item图片绘制
        if (item.image && shouldDrawArr[i]) {
          var image = ScriptUI.newImage(item.image)
          g.drawImage(
            image,
            rect[0] + item.imageRect[0],
            rect[1] + item.imageRect[1] - e.scrollBarValue,
            item.imageRect[2],
            item.imageRect[3]
          )
        }
      }

      /******************************************************************************************/
      // item描边
      g.newPath()
      for (i = 0; i < items.length; i++) {
        item = items[i]
        if (!item.selected) {
          if (item.strokeColor) continue
          if (shouldDrawArr[i]) {
            rect = pointArr[i]
            g.rectPath(
              rect[0],
              rect[4],
              rect[2],
              rect[3]
            )
          }
        }
      }
      g.strokePath(strokePen)
      // 为指定了描边颜色的item描边
      for (i = 0; i < items.length; i++) {
        item = items[i]
        if (item.strokeColor && shouldDrawArr[i]) {
          rect = pointArr[i]
          var pen = g.newPen(g.PenType.SOLID_COLOR, item.strokeColor, e.itemStrokeSize)
          g.newPath()
          g.rectPath(
            rect[0],
            rect[4],
            rect[2],
            rect[3]
          )
          g.strokePath(pen)
        }
      }

      if (e.showText) {
        // 为被选中的item文字添加背景色
        g.newPath()
        for (i = 0; i < items.length; i++) {
          item = items[i]
          if (item.selected && shouldDrawArr[i]) {
            g.rectPath(
              item.rect[0] + item.fontRect[0] + 1,
              item.rect[1] + item.fontRect[1] - e.scrollBarValue,
              item.fontRect[2],
              item.fontRect[3]
            )
          }
        }
        g.fillPath(selectedBrush)
      }
      // 为被选中的item描边
      g.newPath()
      for (i = 0; i < items.length; i++) {
        item = items[i]
        if (item.selected && shouldDrawArr[i]) {
          rect = pointArr[i]
          g.rectPath(
            rect[0],
            rect[4],
            rect[2],
            rect[3]
          )
        }
      }
      g.strokePath(selectedPen)

      /******************************************************************************************/
      if (e.showText) {
        // item文字
        var fontPen = g.newPen(g.PenType.SOLID_COLOR, e.itemFontColor, e.itemFontSize * e.scale)
        var font = ScriptUI.newFont('Microsoft YaHei', ScriptUI.FontStyle.REGULAR, e.itemFontSize * e.scale * 0.6)

        var trickWidthForCC2014 = 20
        var trickForOther = 0
        for (i = 0; i < items.length; i++) {
          item = items[i]
          if (!shouldDrawArr[i]) continue
          var textRect = g.measureString(item.text, font)
          var thisText = item.text
          var totalText = item.text
          var base = textRect.width - item.imageRect[2] - e.spacing[0] * 2
          if (e.limitText === true && e.version === 'CC2014') {
            if (base >= -trickWidthForCC2014) {
              for (var j = 0; j < item.text.length; j++) {
                thisText = item.text.slice(0, totalText.length - 2 - j)
                textRect = g.measureString(thisText, font)
                var newBase = textRect.width - item.imageRect[2] - e.spacing[0] * 2
                if (newBase < -trickWidthForCC2014) {
                  break
                }
              }
            }
          } else if (e.version !== 'CC2014') {
            if (base >= trickForOther) {
              for (j = 0; j < item.text.length; j++) {
                thisText = item.text.slice(0, totalText.length - 2 - j)
                textRect = g.measureString(thisText, font)
                newBase = textRect.width - item.imageRect[2] - e.spacing[0] * 2
                if (newBase < trickForOther) {
                  break
                }
              }
            }
          }

          var value = parseInt(thisText)
          if (!isNaN(value) && value.toString() === thisText) {
            // it's a number, add a space after it to avoid location bug in drawString method
            thisText += ' '
          }
          if (e.version === 'CC2014') {
            g.drawString(
              thisText,
              fontPen,
              item.rect[0] + item.fontRect[0],
              item.rect[1] + item.fontRect[1] - e.scrollBarValue - 10,  // trick for CC2014 location bug
              font
            )
          } else {
            g.drawString(
              thisText,
              fontPen,
              item.rect[0] + item.fontRect[0],
              item.rect[1] + item.fontRect[1] - e.scrollBarValue,
              font
            )
          }
        }
      } // end of showText

      /******************************************************************************************/
      if (e.scrollScale) {
        // 绘制滚动条背景
        g.newPath()
        g.rectPath(
          e.list.size[0] * e.scale - e.scrollBarWidth * e.scale,
          0,
          e.scrollBarWidth * e.scale,
          e.list.size[1] * e.scale
        )
        g.fillPath(scrollBarBrush)

        // 绘制滚动条滑块
        g.newPath()
        g.rectPath(
          e.scrollBlockRect[0],
          e.scrollBlockRect[1],
          e.scrollBlockRect[2],
          e.scrollBlockRect[3]
        )
        g.fillPath(scrollBlockBrush)
      }
    },
    resizeItems: function() { // 对所有的item的大小重新指定
      var e = this
      var items = e.children
      for (var i = 0; i < items.length; i++) {
        items[i].rect[2] = e.itemSize[0] * e.scale
        items[i].rect[3] = e.itemSize[1] * e.scale
        items[i].imageRect[2] = e.itemSize[0] * e.scale
        items[i].imageRect[3] = e.itemSize[1] * e.scale
        // items[i].imageRect = e.resizeImage(ScriptUI.newImage(items[i].image));
        items[i].fontRect[0] = 0
        items[i].fontRect[1] = (e.itemSize[1] - e.itemFontHeight) * e.scale + 5
        items[i].fontRect[2] = e.itemSize[0] * e.scale
        items[i].fontRect[3] = 15
      }
    },
    relocationItems: function() { // 对所有的item的位置重新指定
      var e = this
      var list = e.list
      var items = e.children
      e.scrollScale = 0

      var numWidth = Math.floor((list.size[0] * e.scale - e.scrollBarWidth * e.scale * e.scrollScale) / (e.itemSize[0] * e.scale + e.spacing[0]))
      if (numWidth === 0) numWidth = 1
      e.listHeight = Math.ceil(items.length / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1])

      for (var i = 0; i < items.length; i++) {
        items[i].rect[0] = e.spacing[0] + i % numWidth * (e.itemSize[0] * e.scale + e.spacing[0])
        items[i].rect[1] = e.spacing[1] + Math.floor(i / numWidth) * (e.itemSize[1] * e.scale + e.spacing[1])
      }
      e.scrollScale = 1
    },
    resizeImage: function(image) { // 在不改变图片比例的情况下重新指定图片大小
      var e = this

      var WH = [e.itemSize[0], e.itemSize[1]]
      var wh = image.size
      var k = Math.min(WH[0] / wh[0], WH[1] / wh[1])
      var xy
      wh = [k * wh[0], k * wh[1]]
      xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2]

      return [xy[0] * e.scale, xy[1] * e.scale, wh[0] * e.scale, wh[1] * e.scale]
    },
    resizeScrollBar: function() { // 重新指定滚动条的尺寸
      var e = this
      var list = e.list
      e.scrollBarMaxValue = e.listHeight - list.size[1] * e.scale + 7 / e.scale
      if (e.scrollBarMaxValue < 0) e.scrollBarValue = 0

      e.scrollBlockRect[0] = list.size[0] * e.scale - e.scrollBarWidth * e.scale + 1 // 这里加1是为了让滚动条有一条边线
      e.scrollBlockRect[2] = e.scrollBarWidth * e.scale - 2 // 这里减2是为了让滚动条有一条边线
      if (e.listHeight < list.size[1] * e.scale) {
        e.scrollScale = 0
        e.scrollBlockRect[3] = list.size[1] * e.scale
      } else {
        e.scrollScale = 1
        e.scrollBlockRect[3] = list.size[1] * e.scale * list.size[1] * e.scale / e.listHeight * e.scale
      }
      e.scrollBlockRect[1] = (e.list.size[1] * e.scale - e.scrollBlockRect[3]) * e.scrollBarValue / e.scrollBarMaxValue
    },
    defaultLeftClick: function(event) { // 默认的左键点击事件
      var e = this
      var s = e.selection
      var c = e.children
      var currentItem = e.event.targetItem
      if (!currentItem) {
        for (var i = 0; i < s.length; i++) s[i].selected = 0
        e.lastSelectedItem = null
        e.getSelection()
      }

      if (currentItem) {
        var preSelected = currentItem.selected
        if (event.ctrlKey === false) {
          for (i = 0; i < c.length; i++) c[i].selected = 0
        }
        if (e.lastSelectedItem && event.shiftKey === true) {
          var startIndex = e.lastSelectedItem.index
          var endIndex = currentItem.index
          for (i = 0; i < c.length; i++) {
            if ((c[i].index - startIndex) * (c[i].index - endIndex) <= 0) { // 判断e.index是否在startIndex和endIndex之间
              c[i].selected = 1
            }
          }
        }

        currentItem.selected = true
        if (e.lastSelectedItem && event.ctrlKey === true) {
          if (preSelected === true) {
            currentItem.selected = false
          }
        } else {
          e.lastSelectedItem = currentItem
        }

        e.getSelection()
      } else if (e.event.targetScrollBar === 1) {
        e.scrollBarValue = e.scrollBarMaxValue * event.clientY / e.list.size[1]
      }
      /** **********这里添加点击事件***************/

      /********************************************/
    },
    defaultLeftMouseMove: function(event) { // 默认的左键移动事件
      var e = this
      if (e.event.targetScrollBar === 2) {
        e.scrollBarValue = (e.event.leftButtonPressedScrollBarValue + (event.clientY - e.event.leftButtonPressedLocation[1]) * e.scrollBarMaxValue / (e.list.size[1] * e.scale - e.scrollBlockRect[3]))
      } else {
        e.scrollBarValue = (e.event.leftButtonPressedScrollBarValue - event.clientY + e.event.leftButtonPressedLocation[1])
      }
      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue
      }
    },
    defaultRightMouseMove: function(event) { // 默认的右键移动事件
      var e = this
      e.scrollBarValue = e.event.rightButtonPressedScrollBarValue - event.clientY + e.event.rightButtonPressedLocation[1]

      if (e.scrollBarValue < 0) {
        e.scrollBarValue = 0
      } else if (e.scrollBarValue > e.scrollBarMaxValue) {
        e.scrollBarValue = e.scrollBarMaxValue
      }
    },
    getItemFromLocation: function(x, y) { // 从点击位置获取当前item
      var e = this
      var c = e.children
      for (var i = 0; i < c.length; i++) {
        if (x - c[i].rect[0] > 0 && x - c[i].rect[0] < c[i].rect[2] && y - c[i].rect[1] + e.scrollBarValue > 0 && y - c[i].rect[1] + e.scrollBarValue < c[i].rect[3]) { return c[i] }
      }
      return null
    },
    getScrollBarFromLocation: function(x, y) { // 当前位置不是滚动条返回0，为滚动条背景返回1，为滚动条滑块返回2
      var e = this

      if (x > e.list.size[0] * e.scale - e.scrollBarWidth) {
        if (y > e.scrollBlockRect[1] && y < e.scrollBlockRect[1] + e.scrollBlockRect[3]) { return 2 }
        return 1
      }
      return 0
    },
    refresh: function() { // 刷新列表
      this.list.notify('onDraw')
    }
  })

  if (attrs) this.extend(this, attrs) // 将指定属性赋值给新的网格视图

  this.event = { // 监听事件的辅助变量
    leftButtonPressed: false, // 左键是否在按下状态
    leftButtonPressedLocation: [0, 0], // 左键按下时的位置
    rightButtonPressed: false, // 右键是否在按下状态
    rightButtonPressedLocation: [0, 0], // 右键按下时的位置
    leftButtonPressedScrollBarValue: 0, // 左键在按下时的滚动条值
    rightButtonPressedScrollBarValue: 0, // 右键在按下时的滚动条值
    targetItem: null, // 左键在按下时的item目标，没有item为null
    targetScrollBar: 0, // 左键在按下时的滚动条目标，不是滚动条为0，滚动条背景为1，滚动条滑块为2
    mouseMoving: false // 鼠标是否在移动
  }

  if (parent) this.create(parent)
}
