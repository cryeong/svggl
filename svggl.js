(function(window) {
	var Point = function(px, py, pz, pw) {
		px = typeof(px) != 'undefined' ? px : 0;
		py = typeof(py) != 'undefined' ? py : 0;
		pz = typeof(pz) != 'undefined' ? pz : 0;
		pw = typeof(pw) != 'undefined' ? pw : 0;
		this.init(px, py, pz, pw);
	};
	Point.prototype = {
		x: 0,
		y: 0,
		init: function(px, py, pz, pw) {
			this.x = px;
			this.y = py;
			this.z = pz;
			this.w = pw;
		},
		clone: function() {
			return new Point(this.x, this.y, this.z, this.w);
		},
		copy: function() {
			if(arguments.length > 1) {
				this.x = arguments[0] || 0;
				this.y = arguments[1] || 0;
				this.z = arguments[1] || 0;
				this.w = arguments[1] || 0;
			} else {
				var arg0 = arguments[0];
				if(arg0 instanceof Point) {
					this.x = arg0.x;
					this.y = arg0.y;
					this.z = arg0.z;
					this.w = arg0.w;
				} else {
					this.x = arg0;
				}
			}
			return this;
		},
		buildWithAngleR: function( R, angle ) {
			this.x = R * Math.cos( angle );
			this.y = R * Math.sin( angle );
			return this;
		},
		length: function() {
			return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
		},
		add: function(p) {
			if(!this.check(p)) return;
			this.x += p.x;
			this.y += p.y;
			this.z += p.z;
			this.w += p.w;
			return this;
		},
		add_r: function(p) {
			if(!this.check(p)) return;
			return new Point(this.x + p.x, this.y + p.y, this.z + p.z, this.w + p.w);
		},
		sub: function(p) {
			if(!this.check(p)) return;
			this.x -= p.x;
			this.y -= p.y;
			this.z -= p.z;
			this.w -= p.w;
			return this;
		},
		sub_r: function(p) {
			if(!this.check(p)) return;
			return new Point(
				this.x - p.x,
				this.y - p.y,
				this.z - p.z,
				this.w - p.w
			);
		},
		normalize: function(mag) {
			mag = typeof(mag) != 'undefined' ? mag : 1.0;
			var len = this.length();
			this.x /= len * mag;
			this.y /= len * mag;
			this.z /= len * mag;
			this.w /= len * mag;
			return this;
		},
		rotate: function(ang) {
			var _x = this.x;
			this.x = _x * Math.cos(ang) - this.y * Math.sin(ang)
			this.y = _x * Math.sin(ang) + this.y * Math.cos(ang)
			return this;
		},
		angle: function() {
			return Math.atan2( this.y, this.x );
		},
		check: function(p) {
			if(!p) throw "cannot access property of a null object.";
			return p != 'undefined';
		},
		toString: function() {
			return "{x:"+this.x+",y:"+this.y+",z:"+this.z+",w:"+this.w+"}";
		}
	};
	window.Point = Point;
}(window));
(function(window){
	// static class
	var SVGSettings = function() {};
	SVGSettings.namespace = 'http://www.w3.org/2000/svg';
	SVGSettings.xhtmlNS = 'http://www.w3.org/1999/xhtml';
	SVGSettings.fontName = 'Arial';
	SVGSettings.fontSize = '10px';
	window.SVGSettings = SVGSettings;
}(window));
(function(window){
	var SVGRect = function()
	{
		var line = this.element = document.createElementNS(SVGSettings.namespace,'rect');
		line.setAttribute('style','stroke:#000000;stroke-width:1;fill:transparent;');
		this.color = '#000000';
		this.fillcolor = 'transparent';
		this.fillalpha = '1.0';
		this.strokealpha = '1.0';
		this.strokewidth = 1;
	};
	var s = SVGRect.prototype = {
		setRect: function(sx, sy, w, h) {
			if(isNaN(sx) || sx == Number.POSITIVE_INFINITY || sx == Number.NEGATIVE_INFINITY) sx = 0;
			if(isNaN(sx) || sy == Number.POSITIVE_INFINITY || sy == Number.NEGATIVE_INFINITY) sy = 0;
			if(isNaN(w) || w == Number.POSITIVE_INFINITY || w == Number.NEGATIVE_INFINITY) w = 0;
			if(isNaN(h) || h == Number.POSITIVE_INFINITY || h == Number.NEGATIVE_INFINITY) h = 0;
			this.element.setAttribute('x', sx.toString());
			this.element.setAttribute('y', sy.toString());
			this.element.setAttribute('width', w.toString());
			this.element.setAttribute('height', h.toString());
		},
		setStyle: function( style ) {
			this.element.setAttribute( 'style', style );
		},
		setStrokeWidth: function( width ) {
			this.strokewidth = width;
		},
		setColor: function( color, transparency ) {
			if( this.color === color ) return;
			if( typeof(transparency) != 'undefined') this.strokealpha = transparency;
			this.color = color;
			this.element.setAttribute('style','stroke:'+this.color+';stroke-width:'+this.strokewidth+';fill:'+this.fillcolor+';fill-opacity:'+this.fillalpha+';stroke-opacity:'+this.strokealpha+';');
		},
		setFillColor: function( color, transparency ) {
			if( this.fillcolor === color ) return;
			if( typeof(transparency) != 'undefined') this.fillalpha = transparency;
			this.element.setAttribute('style','stroke:'+this.color+';stroke-width:'+this.strokewidth+';fill:'+this.fillcolor+';fill-opacity:'+this.fillalpha+';stroke-opacity:'+this.strokealpha+';');
		}
	};
	window.SVGRect = SVGRect;
}(window));
(function(window){
	var SVGLine = function()
	{
		var line = this.element = document.createElementNS(SVGSettings.namespace,'line');
		line.setAttribute('style','stroke:#000000;stroke-width:1');
		this.color = '#000000';
		this.strokealpha = '1.0';
		this.strokewidth = 1;
	};
	var s = SVGLine.prototype = {
		setLine: function(sx, sy, ex, ey) {
			if(isNaN(sx) || sx == Number.POSITIVE_INFINITY || sx == Number.NEGATIVE_INFINITY) sx = 0;
			if(isNaN(sy) || sy == Number.POSITIVE_INFINITY || sy == Number.NEGATIVE_INFINITY) sy = 0;
			if(isNaN(ex) || ex == Number.POSITIVE_INFINITY || ex == Number.NEGATIVE_INFINITY) ex = 0;
			if(isNaN(ey) || ey == Number.POSITIVE_INFINITY || ey == Number.NEGATIVE_INFINITY) ey = 0;
			this.element.setAttribute('x1', sx.toString());
			this.element.setAttribute('y1', sy.toString());
			this.element.setAttribute('x2', ex.toString());
			this.element.setAttribute('y2', ey.toString());
		},
		setStyle: function( style ) {
			this.element.setAttribute( 'style', style );
		},
		setStrokeWidth: function( width ) {
			this.strokewidth = width;
		},
		setColor: function( color, transparency ) {
			if( this.color === color ) return;
			if( typeof(transparency) != 'undefined' ) this.strokealpha = transparency;
			this.color = color;
			this.element.setAttribute('style','stroke:'+this.color+';stroke-width:'+this.strokewidth+';stroke-opacity:'+this.strokealpha+';');
		}
	};
	window.SVGLine = SVGLine;
}(window));
(function(window){
	var SVGArc = function()
	{
		var line = this.element = document.createElementNS(SVGSettings.namespace,'path');
		line.setAttribute('stroke','#000000');
		line.setAttribute('stroke-width','1');
		line.setAttribute('fill','none');
		this.color = '#000000';
		this.lineWidth = 1;
		this.position = new Point();
		this.radius = 0.0;
		this.starta = 0.0;
		this.enda = 0.0;
		this.sp = new Point();
		this.ep = new Point();
	};
	var s = SVGArc.prototype = {
		setArc: function(px ,py, ra, sa, ea) {
			this.position.copy(px, py);
			this.radius = ra;
			this.starta = sa;
			this.enda = ea;
			this.sp.x = this.position.x + Math.cos(this.starta) * this.radius;
			this.sp.y = this.position.y + Math.sin(this.starta) * this.radius;
			this.ep.x = this.position.x + Math.cos(this.enda) * this.radius;
			this.ep.y = this.position.y + Math.sin(this.enda) * this.radius;

			if(isNaN(this.sp.x) || this.sp.x == Number.POSITIVE_INFINITY || this.sp.x == Number.NEGATIVE_INFINITY) this.sp.x = 0;
			if(isNaN(this.sp.y) || this.sp.y == Number.POSITIVE_INFINITY || this.sp.y == Number.NEGATIVE_INFINITY) this.sp.y = 0;
			if(isNaN(this.ep.x) || this.ep.x == Number.POSITIVE_INFINITY || this.ep.x == Number.NEGATIVE_INFINITY) this.ep.x = 0;
			if(isNaN(this.ep.y) || this.ep.y == Number.POSITIVE_INFINITY || this.ep.y == Number.NEGATIVE_INFINITY) this.ep.y = 0;

			var da = sa-ea;
			if(da>Math.PI) da = da-Math.PI*2;
			if(da<-Math.PI) da = Math.PI*2+da;

			this.element.setAttribute('d','M '+this.sp.x+' '+this.sp.y+' A '+(this.radius)+' '+(this.radius)+' 1 '+((da>0)?'1':'0')+' 1 '+this.ep.x+' '+this.ep.y);
		}
	};
	window.SVGArc = SVGArc;
}(window));
(function(window){
	var SVGText = function() {
		var t = this.element = document.createElementNS(SVGSettings.namespace,'text');
		t.setAttribute('font-size',SVGSettings.fontSize);
		t.setAttribute('font-family',SVGSettings.fontName);
		t.setAttribute('x','0');
		t.setAttribute('y','0');
		this.text = document.createTextNode(":D");
		this.element.appendChild(this.text);
	};
	var s = SVGText.prototype = {
		setText: function( px, py, p_str ) {
			this.element.setAttribute('x',px.toString());
			this.element.setAttribute('y',py.toString());
			this.text.nodeValue = p_str;
		}
	};
	window.SVGText = SVGText;
}(window));
(function(window){
	var SVGGL = function(params) {
		var svg = this.surface = document.createElementNS(SVGSettings.namespace, 'svg');
		//svg.setAttribute("version", "1.2");
		//svg.setAttribute("baseProfile", "tiny");
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		svg.setAttribute("version", "1.1");
		svg.setAttribute("style", "width: 100%; height: 100%;");
		this.scaleX = 1.0;
		this.scaleY = 1.0;
		this.rects = [];
		this.rectCount = 0;
		this.lines = [];
		this.lineCount = 0;
		this.arcs = [];
		this.arcCount = 0;
		this.texts = [];
		this.textCount = 0;
		this.lineColor = '#000000';
		this.lineAlpha = 1.0;
		this.lineWidth = 1.0;
		this.fillColor = 'transparent';
		this.fillAlpha = 1.0;
		this.m = new Point();
		this.lastAngle = 0.0;
		this.radius = 15;
		this.offset = new Point();
		this.shouldPrint = true;
		this.autoDispose = true;
		if(typeof(params) != 'undefined')
		{
			if(typeof(params.offset) != 'undefined')
			{
				this.offset.x = typeof(params.offset.x) != 'undefined' ? params.offset.x: 0;
				this.offset.y = typeof(params.offset.y) != 'undefined' ? params.offset.y: 0;
			}
		}
	};
	var s = SVGGL.prototype = {
		drawRect: function( sx, sy, w, h) {
			sx = sx / this.scaleX;
			sy = sy / this.scaleY;
			w = w / this.scaleX;
			h = h / this.scaleY;
			var rect;
			if(this.rectCount>=this.rects.length) {
				var newRect = new SVGRect();
				this.rects.push(newRect);
				this.surface.appendChild(newRect.element);
			}
			rect = this.rects[this.rectCount];
			rect.setRect(sx+this.offset.x, sy+this.offset.y, w, h);
			rect.setStyle('\
				stroke:'+this.lineColor+';\
				stroke-opacity:'+this.lineAlpha+';\
				stroke-width:'+this.lineWidth+';\
				fill:'+this.fillColor+';\
				fill-opacity:'+this.fillAlpha+';\
			');

			this.rectCount++;
		},
		drawLine: function( sx, sy, ex, ey) {
			sx = sx / this.scaleX;
			sy = sy / this.scaleY;
			ex = ex / this.scaleX;
			ey = ey / this.scaleY;
			var line;
			if(this.lineCount>=this.lines.length) {
				var newLine = new SVGLine();
				this.lines.push(newLine);
				this.surface.appendChild(newLine.element);
			}
			line = this.lines[this.lineCount];
			line.setLine(sx+this.offset.x, sy+this.offset.y, ex+this.offset.x, ey+this.offset.y);
			line.setStyle('\
				stroke:'+this.lineColor+';\
				stroke-opacity:'+this.lineAlpha+';\
				stroke-width:'+this.lineWidth+';\
			');

			// print
			if(this.shouldPrint) {
				var vx = (ex - sx)*this.scaleX;
				var vy = (ey - sy)*this.scaleY;
				var len = Math.sqrt(vx*vx+vy*vy);
				this.print(sx+(ex - sx)/2.0, sy+(ey - sy)/2.0, "len: "+len );
			}			

			this.lineCount++;
		},
		drawArc: function( px, py, radius, startr, endr) {
			px = px / this.scaleX;
			py = py / this.scaleY;
			var arc;
			if(this.arcCount>=this.arcs.length) {
				var newArc = new SVGArc();
				this.arcs.push(newArc);
				this.surface.appendChild(newArc.element);
			}
			arc = this.arcs[this.arcCount];
			arc.setArc(px+this.offset.x, py+this.offset.y, radius, startr, endr);
			
			// print
			if(this.shouldPrint) {
				var diffa = endr - startr;
				var mida = startr + diffa/2.0;
				if(diffa<0) mida += Math.PI;
				var vx = px + Math.cos(mida) * 30;
				var vy = py + Math.sin(mida) * 30;
				if(diffa<0) diffa += Math.PI*2;
				diffa *= 180/Math.PI;
				this.print(vx, vy, "arc: "+diffa );
			}

			this.arcCount++;
		},
		print: function( px, py, p_str ) {
			var text;
			if(this.textCount>=this.texts.length) {
				var newText = new SVGText();
				this.texts.push(newText);
				this.surface.appendChild(newText.element);
			}
			text = this.texts[this.textCount];
			text.setText(px+this.offset.x, py+this.offset.y, p_str);
			
			this.textCount++;
		},
		moveTo: function( px, py ) {
			this.m.copy(px, py);
		},
		lineTo: function( px, py ) {
			var la = Math.atan2(py-this.m.y, px-this.m.x);
			this.drawLine(this.m.x, this.m.y, px, py);
			this.drawArc(this.m.x, this.m.y, this.radius, la, this.lastAngle );
			this.lastAngle = Math.atan2(this.m.y-py, this.m.x-px);
			this.m.copy(px, py);
		},
		lineStyle: function( color, width, alpha ) {
			if( typeof(alpha) != 'undefined' ) this.lineAlpha = alpha;
			if( typeof(width) != 'undefined' ) this.lineWidth = width;
			this.lineColor = color;
		},
		beginFill: function( color, alpha ) {
			if( typeof(alpha) != 'undefined' ) this.fillAlpha = alpha;
			this.fillColor = color;
		},
		end: function() {
			if(this.autoDispose) {
				for(var i = this.rectCount; i < this.rects.length; i++) {
					this.surface.removeChild(this.rects[i].element);
					this.rects[i] = null;
				}
				for(i = this.lineCount; i < this.lines.length; i++) {
					this.surface.removeChild(this.lines[i].element);
					this.lines[i] = null;
				}
				for(i = this.arcCount; i < this.arcs.length; i++) {
					this.surface.removeChild(this.arcs[i].element);
					this.arcs[i] = null;
				}
				for(i = this.textCount; i < this.texts.length; i++) {
					this.surface.removeChild(this.texts[i].element);
					this.texts[i] = null;
				}
			}
		},
		clear: function() {
			this.rectCount = 0;
			this.lineCount = 0;
			this.arcCount = 0;
			this.textCount = 0;
		},
		scale: function( px, py ) {
			this.scaleX = px;
			this.scaleY = py;
		},
		flush: function() {
			this.rectCount = 0;
			this.lineCount = 0;
			this.arcCount = 0;
			this.textCount = 0;
			this.rects = [];
			this.lines = [];
			this.arcs = [];
			this.texts = [];
			var scn;
			for( var i = 0; i < this.surface.childNodes.length; i++)
			{
				scn = this.surface.childNodes[i];
				if(scn.tagName != 'foreignObject')
				{
					this.surface.removeChild(scn);
					i--;
				}
			}
		}
	};
	window.SVGGL = SVGGL;
}(window));