/*!
 * Chart JS
 * 04-2021, hiolinh - eyesolution
 */

export function Chart(element, setting) {
  this.setting = {
    backgroundColor: 'black',
    textColor: 'white',
    crashedColor: 'red',
    lineColor: 'white',
    axisTextColor: 'white',
    width: 800,
    height: 400
  }
  const PADDING = 50;

  this.width = 800;
  this.height = 400;

  this.deltaX = 1
  this.minX = 0
  this.maxX = 10

  this.deltaY = 0.2
  this.minY = 1
  this.maxY = 2
  this.sx = 0
  this.sy = 0
  this.points = []

  this.initData = function() {
    this.deltaX = 1
    this.minX = 0
    this.maxX = 10
  
    this.deltaY = 0.2
    this.minY = 1
    this.maxY = 2
    this.sx = 0
    this.sy = 0
  }
  
  this.initChart = function() {
    this.maxX = Math.max(this.maxX, this.points.length ? this.points[this.points.length - 1].x : 0)
    this.maxY = Math.max(this.maxY, this.points.length ? this.points[this.points.length - 1].y : 0)
    if (this.sx == 60) {
      this.deltaX = this.deltaX * 2
    }
  
    if (this.sy == 60) {
      this.deltaY = this.deltaY * 5
    }
    this.sx = Math.max((this.width - PADDING) / ((this.maxX - this.minX) / this.deltaX) + 2, 60)
    this.sy = Math.max((this.height - PADDING) / ((this.maxY - this.minY) / this.deltaY) + 2, 60)
  
    this.ctx.canvas.width = this.width
    this.ctx.canvas.height = this.height
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.setTransform(1, 0, 0, -1, 0, this.height)
    this.ctx.fillStyle = this.setting.backgroundColor
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.translate(PADDING, PADDING)
  
    // Vẽ trục y
    this.ctx.strokeStyle = this.setting.lineColor
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
  
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(0, this.height - PADDING)
    this.ctx.stroke()
    
    // Vẽ trục x
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(this.width - PADDING, 0)
    this.ctx.stroke()
  }
  
  this.drawXTick = function() {
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.translate(PADDING, 0)
    this.ctx.beginPath()
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = this.setting.lineColor
  
    let i = this.minX - this.deltaX
    for (let x = 0; x <= this.width - PADDING; x += this.sx) {
      i += this.deltaX
      this.ctx.font = '11px Arial'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = this.setting.axisTextColor
      this.ctx.fillText(i, x, this.height - PADDING + 15)
      if (x === 0) continue
      this.ctx.moveTo(x + 0.5, this.height - PADDING)
      this.ctx.lineTo(x + 0.5, this.height - PADDING - 7)
      this.ctx.strokeStyle = this.setting.lineColor
      this.ctx.stroke()
     
    }
    this.ctx.restore()
  }
  
  this.drawYTick = function() {
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
  
    this.ctx.translate(PADDING, 0)
    let i = this.minY - this.deltaY
    for (let x = this.height - PADDING; x > 0; x -= this.sy) {
      i = parseFloat((i + this.deltaY).toFixed(1))
      if (x === this.height - PADDING) continue
      this.ctx.strokeStyle = this.setting.lineColor
      this.ctx.moveTo(0 , x - 0.5)
      this.ctx.lineTo(7, x - 0.5)
      this.ctx.stroke()
  
      this.ctx.font = '11px Arial'
      this.ctx.fillStyle = this.setting.axisTextColor
      this.ctx.textAlign = 'start'
      this.ctx.textBaseline = 'center'
      this.ctx.fillText(i + 'x', -30, x)
    }
    this.ctx.restore()
  }
  
  this.drawPolygon = function() {
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.translate(PADDING, 0)
    this.ctx.strokeStyle = this.setting.lineColor
    this.ctx.beginPath()
    this.ctx.lineWidth = 3
    this.ctx.moveTo((this.points[0].x - this.minX) * this.sx / this.deltaX, this.height - PADDING - (this.points[0].y - this.minY) * this.sy / this.deltaY)
    this.points.slice(1, this.points.length).forEach(point => {
      this.ctx.lineTo((point.x - this.minX) * this.sx / this.deltaX, this.height - PADDING - (point.y - this.minY) * this.sy / this.deltaY)
    });
    
    this.ctx.stroke()
    this.ctx.closePath()
  
    this.ctx.font = "normal 120px Arial, sans-serif ";
    this.ctx.fillStyle = this.setting.textColor;
    this.ctx.textBaseline = 'middle'; 
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.points[this.points.length - 1].y.toFixed(2) + 'x', (this.width - PADDING)/2 , this.height/2);
  
    this.ctx.restore()
  }
  
  this.drawCountdown = function(value) {
    this.drawChart()
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.font = "normal 30px Arial, sans-serif ";
    this.ctx.fillStyle = this.setting.textColor;
    this.ctx.textBaseline = 'middle'; 
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Next round in '+ value +'s', this.width/2, this.height/2);
    this.ctx.restore()
  }
  
  this.drawEnd = function() {
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.font = "normal 100px Arial, sans-serif ";
    this.ctx.fillStyle = this.setting.crashedColor;
    this.ctx.textBaseline = 'middle'; 
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Crashed', this.width/2, this.height/2 - 70);
    this.ctx.fillText('@ '+ this.points[this.points.length - 1].y.toFixed(2) + 'x', this.width/2, this.height/2 + 50);
    this.ctx.restore()
  }
  
  this.drawChart = function() {
    this.initChart()
    this.drawXTick()
    this.drawYTick()
  }
  
  this.savePoints = function() {
    localStorage.setItem('points', JSON.stringify(this.points))
  }
  
  this.loadPoints = function() {
    let _points = localStorage.getItem('points')
    if (_points) {
      this.points = JSON.parse(_points)
    }
  }

  this.addData = function(data) {
    this.points = this.points.concat(data)
  }

  this.clear = function() {
    // localStorage.clear()
    this.points = []
    this.initData()
    this.initChart()
    this.drawChart()
  }
  
  this.emit = function(type, value) {
    switch (type) {
      case 'point':
        if (!this.points.find((p) => p.x == 0 && p.y == 1)) {
          this.points.unshift({
            x: 0,
            y: 1
          });
        }
        this.points.push(value);
        // this.savePoints()
        this.drawChart()
        this.drawPolygon()
        break;
      case 'stop':
        this.points.push(value);
        this.initData()
        this.drawChart()
        this.drawEnd()
        break;
      default:
        this.points = []
        this.initData()
        this.drawCountdown(value)
        break;
    }
   
  }

  this.findAncestor = function (el, cls) {
    while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
    return el;
  }

  // RUN

  if (element.indexOf('#') === 0) {
    this.chart = document.getElementById(element.slice(1, element.length))
  } else {
    this.chart = document.getElementsByClassName(element.slice(1, element.length))
  }

  Object.assign(this.setting, setting)
  this.width = this.setting.width
  this.height = this.setting.height

  this.chart.width = this.width
  this.chart.height = this.height

  this.ctx = this.chart.getContext('2d')
  // this.loadPoints()
  this.initData()
  this.drawChart()

}

