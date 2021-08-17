$.global.UIParser = UIParser
function UIParser(global) {
  var _ = global._ = function(selector) {
    if (_.isUI(selector.type)) {
      return _.extend([selector], _.proto)
    }
    return _.proto.find(selector)
  }
  _.global = global

  _.root = {
    children: []
  }
  _.windows = _.root.children
  _.extend = function(target, source) { // give the source to target
    for (var i in source) target[i] = source[i]
    return target
  }
  _.dir = function(obj) {
    var str = ''
    for (var i in obj) str += i + ' : ' + typeof (obj[i]) + '\n'
    return str
  }
  _.removeWin = function(id) {
    for (var i = 0; i < _.windows.length; i++) {
      if (_.windows[i].id === id) _.windows.splice(i, 1)
    }
  }
  _.proto = {// 这里的函数将赋给返回的解析器对象
    find: function(selector, recursive) { // find函数用来返回一个递归匹配后的数组，并且将_.proto的函数也给这个数组
      var matchs = []
      var elements = ('length' in this) ? this : [_.root]
      if (!selector) return _.extend(elements, _.proto)

      // 选择器为选择器表达式
      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector)// 正规化选择器
        for (var i = 0; i < selectors.length; i++) {
          var match = elements
          var process = _.parserSelector(selectors[i])// 解析选择器
          for (var j = 0; j < process.length; j++) { // 逐步执行
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5])// 如果有:标记执行过滤操作
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1], process[j][2])
            }
          }
          matchs = _.merge(match, matchs)
        }
      } else if (typeof selector === 'function') {
        if (!recursive) recursive = 1
        matchs = _.findElementsByFn(elements, selector, recursive)
      }

      return _.extend(matchs, _.proto)
    },
    filter: function(selector) {
      var matchs = []
      var elements = ('length' in this) ? this : [_.root]
      if (!selector) return _.extend(elements, _.proto)

      // 选择器为选择器表达式
      if (typeof selector === 'string') {
        var selectors = _.formalSelector(selector)// 正规化选择器
        for (var i = 0; i < selectors.length; i++) {
          var match = elements
          var process = _.parserSelector(selectors[i])// 解析选择器
          for (var j = 0; j < process.length; j++) { // 逐步执行
            if (!process[j][3] && _.proto[process[j][4]]) {
              match = _.proto[process[j][4]].call(match, process[j][5])// 如果有:标记执行过滤操作
            } else {
              match = _.findElementsByProp(match, process[j][0], process[j][1])
            }
          }
          matchs = _.merge(match, matchs)
        }
      } else if (typeof selector === 'function') {
        matchs = _.filterElementsByFn(elements, selector)
      }

      return _.extend(matchs, _.proto)
    },
    style: function(style, target) {
      if (!target) target = this
      for (var i = 0; i < target.length; i++) {
        for (var j in style) {
          if (target[i].type === j) _.proto.style(style[j], [target[i]])
          else target[i][j] = style[j]
        }
      }
    },
    each: function(command) { for (var i = 0; i < this.length; i++) command(this[i]) }, // command is a function
    setAttr: function(prop, value) { this.each(function(e) { e[prop] = value }) },
    getAttr: function(prop) { if (this.length) return this[0][prop] },
    children: function(selector) { return this.find(selector || '>*') },
    parent: function() { if (this.length > 0 && this[0].parent) return this[0].parent; else return _.extend([], _.proto) },
    on: function(event, fn, useCapture) { this.each(function(e) { e.addEventListener(event, fn, useCapture) }) },
    exe: function(fn, args) { this.each(function(e) { e[fn].apply(e, args) }) },
    addUI: function() { return _.addUI.apply(this[0], arguments) },
    first: function() { return _.extend([this[0]], _.proto) },
    last: function() { return _.extend([this[this.length - 1]], _.proto) },
    eq: function(index) { if (index < this.length && index >= 0) { return _.extend([this[index]], _.proto) } else { return _.extend([], _.proto) } },
    layout: function() { this.each(function(e) { _.layout(e) }) },
    remove: function() { this.each(function(e) { e.parent.remove(e) }) },
    empty: function() { this.children().remove() }
  }
  /** ***********************functions for createUI****************************************************/
  _.createUI = function(UIJson) { // 创建UI
    if (!UIJson) return
    var ISPANEL = global instanceof Panel
    if (ISPANEL) {
      var _newElement = _.addUI(UIJson, global)
      _.root.children.push(global)
      global.layout.layout(true)
      return _newElement
    } else {
      return _.newWindow(UIJson)
    }
  }

  _.newWindow = function(UIJson) { // 添加窗口
    if (!UIJson) return
    var newWindows = []
    for (var i in UIJson) {
      var json = UIJson[i]
      if (_.isWindow(UIJson[i].type)) {
        // create window
        var s = json.type
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}'
        var newWindow = _.root.children[_.root.children.length] = new Window(s)
        newWindows.push(newWindow)
        if (!json.id) newWindow.id = i
        // add other properties for newWindow
        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue
          newWindow[j] = json[j]
        }
        // create children for newWindow
        if (json.children) _.addUI(json.children, newWindow)
      }
    }
    return _.extend(newWindows, _.proto)
  }

  _.addUI = function(UIJson, parent) { // 为parent添加UI
    if (!UIJson) return
    if (!parent) parent = this

    var newItem = []
    for (var i in UIJson) {
      var json = UIJson[i]
      if (_.isElement(json.type)) {
        // create element
        var s = json.type
        if (json.properties) s += '{properties:' + _.JSON.stringify(json.properties) + '}'
        var newElement = parent.add(s)
        if (!json.id) newElement.id = i
        // add other properties for newElement
        for (var j in json) {
          if (j === 'type' || j === 'properties' || j === 'children') continue
          newElement[j] = json[j]
        }
        newItem.push(newElement)
        // create children for newElement
        if (_.isContainer(json.type) && json.children) arguments.callee(json.children, newElement)
      }
    }
    return _.extend(newItem, _.proto)
  }

  _.isWindow = function(type) { // 判断是否为window元素
    var winType = [
      'window', 'palette', 'dialog',
      'Window', 'Palette', 'Dialog'
    ]
    var len = winType.length
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true
    }
    return false
  }

  _.isContainer = function(type) { // 判断是否为容器
    var winType = [
      'window', 'palette', 'dialog', 'group', 'panel', 'tabbedpanel', 'treeview', 'dropdownlist', 'listbox', 'listitem', 'tab', 'node',
      'Window', 'Palette', 'Dialog', 'Group', 'Panel', 'TabbedPanel', 'Treeview', 'DropDownList', 'ListBox', 'ListItem', 'Tab', 'Node'
    ]
    var len = winType.length
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true
    }
    return false
  }

  _.isElement = function(type) { // 判断是否是window元素外的其他UI元素
    var winType = [
      'panel', 'tabbedpanel', 'tab', 'group', 'button', 'checkbox', 'dropdownlist', 'edittext', 'flashplayer', 'iconbutton', 'image', 'item', 'listbox', 'listitem', 'progressbar', 'radiobutton', 'scrollbar', 'slider', 'statictext', 'treeview', 'tab', 'node',
      'Panel', 'TabbedPanel', 'Tab', 'Group', 'Button', 'CheckBox', 'DropDownList', 'EditText', 'FlashPlayer', 'IconButton', 'Image', 'Item', 'ListBox', 'ListItem', 'ProgressBar', 'RadioButton', 'Scrollbar', 'Slider', 'StaticText', 'Treeview', 'Tab', 'Node'
    ]
    var len = winType.length
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true
    }
    return false
  }

  _.isUI = function(type) { // 判断是否为UI元素
    if (_.isWindow(type) || _.isElement(type)) return true
    return false
  }
  /** ********************functions for find*********************************************************/
  _.findElementsByProp = function(elements, prop, value, recursive) {
    var matchs = []
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children
      else if (elements[i].items) atoms = elements[i].items
      else continue
      var match = []
      for (var j = 0; j < atoms.length; j++) {
        if (atoms[j][prop] && (value === '' || atoms[j][prop].toString() === value)) { match.push(atoms[j]) }
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee([atoms[j]], prop, value, 1)
          match = _.merge(temp, match)
        }
      }
      matchs = _.merge(match, matchs)
    }
    return matchs
  }
  _.findElementsByFn = function(elements, fn, recursive) {
    var match = []
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].children) var atoms = elements[i].children
      else if (elements[i].items) atoms = elements[i].items
      else continue
      for (var j = 0; j < atoms.length; j++) {
        if (fn(atoms[j])) match.push(atoms[j])
        if (recursive && (atoms[j].children || atoms[j].items)) {
          var temp = arguments.callee(atoms[j].children, fn, 1)
          match = _.merge(temp, match)
        }
      }
    }
    return match
  }
  _.filterElementByProp = function(elements, prop, value) {
    var matchs = []
    for (var i = 0; i < elements.length; i++) {
      if (elements[i][prop] && (value === '' || elements[i][prop].toString() === value)) { matchs.push(elements[i]) }
    }
    return matchs
  }
  _.filterElementByFn = function(elements, fn) {
    var matchs = []
    for (var i = 0; i < elements.length; i++) {
      if (fn(elements[i])) matchs.push(elements[i])
    }
    return matchs
  }
  _.formalSelector = function(selector) { // 正规化选择器，去掉所有空格，多余字母和多余标记符，得到并列选择器，这时每个选择器中的每个标记符均有效
    /**
      1.去掉空格])及后面的字母，如'[er t ]a:w (w)e'变为'[er:w(w'
      2.去掉标记符前面的所有标记符号，遇到*>,不删除，因为标记号*>,后面不需要字母
      3.将*及其后面的字母替换为*
      4.将,及其后面的字母替换为,
      5.将>及其后面的字母替换为>
      6.将开始处的字母及逗号去掉
      7.用逗号分隔选择器，得到正规化的若干个选择器
      8.返回选择器数组
    */
    return selector.replace(/[\s\]\)]\w*/g, '').replace(/[\#\.\[\:\=]+(?=[\#\.\[\]\,\:\=\>\*])/g, '').replace(/\*+\w*/g, '*').replace(/\,+\w*/g, ',').replace(/\>+\w*/g, '>').replace(/^\w*\,/g, '').split(/\,/g)
  }
  _.parserSelector = function(selector) { // 解析单个的选择器，返回一个表示过程的数组
    var sign, content, prop, value, func, param, doFind // recursive是否递归，doFind是否查找，否则过滤操作
    var recursive = 1
    var process = []
    var parts = selector.replace(/(?=[\#\.\[\:\>\*])/g, '@').replace(/^\@/, '').split('@')// 将选择器根据标记分开

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '>') { // 当出现>的时候find函数将不会递归
        recursive = 0
        i++
      }
      // 初始化
      sign = parts[i][0]
      content = parts[i].substr(1)
      prop = value = func = param = ''
      doFind = 1
      // 判断
      switch (sign) {
        case '*': prop = 'type'; break
        case '#': prop = 'id'; value = content; break
        case '.': prop = 'type'; value = content; break
        case '[':
          var p = content.split('=')
          prop = p[0]
          if (p.length === 2) value = p[1]
          break
        case ':':
          var fn = content.split('(')
          func = fn[0]
          if (fn.length === 2) param = fn[1]
          doFind = 0
          break
      }
      process.push([prop, value, recursive, doFind, func, param])
      recursive = 1
    }

    return process
  }
  _.merge = function(newArray, oldArray) { // 合并两个数组，并且去掉重复元素
    var temp = []
    var b = 1
    for (var i = 0; i < newArray.length; i++) {
      for (var j = 0; j < oldArray.length; j++) {
        if (newArray[i] === oldArray[j]) {
          b = 0
          break
        }
      }
      if (b) temp.push(newArray[i])
    }
    return oldArray.concat(temp)
  }
  /** ********************layout functions*********************************************************/
  _.layout = function(e) { // 默认布局方式
    e.margins = 0
    e.spacing = 5
    if (e.align) {
      switch (e.align) {
        case 'fill':
        case 'fill_fill': e.alignment = ['fill', 'fill']; break

        case 'center':
        case 'center_center': e.alignment = ['center', 'center']; break

        case 'left_fill':
        case 'left': e.alignment = ['left', 'fill']; break
        case 'center_fill': e.alignment = ['center', 'fill']; break
        case 'right_fill':
        case 'right': e.alignment = ['right', 'fill']; break

        case 'fill_top':
        case 'top': e.alignment = ['fill', 'top']; break
        case 'fill_center': e.alignment = ['fill', 'center']; break
        case 'fill_bottom':
        case 'bottom': e.alignment = ['fill', 'bottom']; break

        case 'left_center': e.alignment = ['left', 'center']; break
        case 'right_center': e.alignment = ['right', 'center']; break
        case 'center_top': e.alignment = ['center', 'top']; break
        case 'center_bottom': e.alignment = ['center', 'bottom']; break

        case 'left_top': e.alignment = ['left', 'top']; break
        case 'left_bottom': e.alignment = ['left', 'bottom']; break
        case 'right_top': e.alignment = ['right', 'top']; break
        case 'right_bottom': e.alignment = ['right', 'bottom']; break
      }
    }
  }
  _.extend(_.windows, _.proto)
  /** ********************other functions*********************************************************/
  _.JSON = { // 直接copy过来的代码
    /* eslint-disable no-eval */
    parse: function(strJSON) { return eval('(' + strJSON + ')') },
    stringify: (function() {
      var toString = Object.prototype.toString
      var isArray = Array.isArray || function(a) { return toString.call(a) === '[object Array]' }
      var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'}
      var escFunc = function(m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1) }
      var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g
      return function stringify(value) {
        if (value == null) {
          return 'null'
        } else if (typeof value === 'number') {
          return isFinite(value) ? value.toString() : 'null'
        } else if (typeof value === 'boolean') {
          return value.toString()
        } else if (typeof value === 'object') {
          if (typeof value.toJSON === 'function') {
            return stringify(value.toJSON())
          } else if (isArray(value)) {
            var res = '['
            for (var i = 0; i < value.length; i++) res += (i ? ', ' : '') + stringify(value[i])
            return res + ']'
          } else if (toString.call(value) === '[object Object]') {
            var tmp = []
            for (var k in value) {
              if (value.hasOwnProperty(k)) tmp.push(stringify(k) + ': ' + stringify(value[k]))
            }
            return '{' + tmp.join(', ') + '}'
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"'
      }
    })()
  }

  return _
};
