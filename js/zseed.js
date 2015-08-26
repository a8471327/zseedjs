/**
 * version : 1.0.0
 * anthor: jiz, a8471327
 * email: 472121883@qq.com
 */
(function(window){
'use strict';
var document = window.document;
var Zseed = function(){};

var Util = Zseed.util = {
	getByClass: function (selector, parent){
		parent = parent ? parent : document;
		if(parent.getElementsByClassName){
			return parent.getElementsByClassName(selector);
		}else{
			var oAll = parent.getElementsByTagName('*');
			var arr = [];
			var len = oAll.length;
			for(var i = 0; i < len; i++){
				var aAll = oAll[i].className.split(' ');
				var l = aAll.length;
				for(var j = 0; j < l; j++){
					if(aAll[j] == selector){
						arr.push(oAll[i]);
						break;
					}
				}
			}
			return arr;
		}
	},
	getStyle: function (obj, attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
	},
	appendBefore: function (obj, nObj){
		var oParent = obj.parentNode;
		if(oParent){
			oParent.insertBefore(nObj, obj);
		}
	},
	appendAfter: function (obj, nObj){
		var oParent = obj.parentNode;
		if(oParent){
			var oNext = obj.nextSibling;
			if(oNext){
				oParent.insertBefore(nObj, oNext);
			}else{
				oParent.appendChild(nObj);
			}
		}
	},
	stopBubble: function (e){
	    if(e && e.stopPropagation){
	        e.stopPropagation();
	    }
	    else{
	        e.cancelBubble=true;
	    }
	    return false;
	},
	startMove: function (obj, json, fn, speed){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop = true;		//设置变量判断所有值是否到达目标值
			for(var attr in json){
				var iCur = 0;	//获取目标当前值
				if(attr == 'opacity'){
					iCur = Math.round(parseFloat(Util.getStyle(obj, attr)) * 100);
				}else{
					iCur = parseInt(Util.getStyle(obj, attr));
				}
				var sp = speed ? speed : 8;
				var iSpeed = (json[attr] - iCur) / sp;	//计算速度
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur != json[attr]){		//判断是否到达目标值
					bStop = false;
				}
				if(attr == 'opacity'){
					iCur += iSpeed;
					obj.style.filter = 'alpha(opacity:'+ iCur +')';
					obj.style.opacity = iCur / 100;
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fn)	fn();
			}
		}, 30);
	}
};

Zseed.prototype.modal = function(id, type){
	type = type ? type : 'show';
	var obj = document.getElementById(id),
		sibling = Util.getByClass('modal-dialog', obj)[0],
		close = Util.getByClass('close', obj)[0],
		backdrop = {};
	if(type === 'show'){
		backdrop = document.createElement('div');
		backdrop.className = 'modal-backdrop';
		Util.appendBefore(sibling, backdrop);
		obj.style.display = 'block';
		close.addEventListener('click', hideModal, false);
		backdrop.addEventListener('click', hideModal, false);
	}else if(type === 'hide'){
		hideModal();
	}

	function hideModal(e){
		backdrop = Util.getByClass('modal-backdrop', obj)[0];
		obj.removeChild(backdrop);
		obj.style.display = 'none';
		close.removeEventListener('click', hideModal, false);
		backdrop.removeEventListener('click', hideModal, false);
		e && Util.stopBubble(e);
	}

	return this;
};

Zseed.prototype.dropdown = function(id){
	var obj = document.getElementById(id),
		a = Util.getByClass('dropdown-btn', obj)[0],
		menu = Util.getByClass('dropdown-menu', obj)[0];

	a.addEventListener('click', initDropdown, false);

	function initDropdown(ev){
		var e = ev || event;
		if(Util.getStyle(menu, 'display') === 'none'){
			menu.style.display = 'block';
			document.addEventListener('click', initDropdown, false);
		}else{
			menu.style.display = 'none';
			document.removeEventListener('click', initDropdown, false);
		}
		Util.stopBubble(e);
	}

	return this;
};

Zseed.prototype.tab = function(id){
	var obj = document.getElementById(id),
		title = Util.getByClass('tab-title', obj)[0],
		content = Util.getByClass('tab-content', obj)[0],
		li = title.getElementsByTagName('li'),
		cls = Util.getByClass('content', content);

	cls[0].style.display = 'block';
	li[0].className = 'active';

	title.addEventListener('click', function(ev){
		var e = ev || event;
		var tar = e.target;
		if(tar.nodeName.toLowerCase()  === 'li'){
			for(var i = 0, len = li.length; i < len; i++){
				if(tar === li[i]){
					cls[i].style.display = 'block';
					li[i].className = 'active';
				}else{
					cls[i].style.display = 'none';
					li[i].className = '';
				}
			}
			Util.stopBubble(e);
		}
	}, false);

	return this;
};

Zseed.prototype.collapse = function(id){
	var obj = document.getElementById(id),
		aTitle = Util.getByClass('collapse-title', obj),
		aContent = Util.getByClass('collapse-content', obj),
		len = aTitle.length;

	obj.addEventListener('click', function(ev){
		var e = ev || event;
		var tar = e.target;
		if(tar.className === 'collapse-title'){
			var elem = tar.nextSibling;
			do{
				if(elem.nodeType === 1){
					var type = checkShow(elem);
					hideAllContent();
					!type && (elem.style.display = 'block');
					break;
				}
			}while((elem = elem.nextSibling));
			Util.stopBubble(e);
		}
	}, false);

	function checkShow(elem){
		var type = Util.getStyle(elem, 'display');
		if(type === 'none'){
			return false;
		}else if(type === 'block'){
			return true;
		}
	}

	function hideAllContent(){
		Array.prototype.forEach.call(aContent, function(elem, idx){
			elem.style.display = 'none';
		});
	}

	return this;
};

var Carousel = function(opt){
	return this.init(opt);
};
Carousel.prototype = {
	init: function(opt){
		this._obj = document.getElementById(opt.id);
		this._indicators = document.createElement('ol');
		this._content = document.createElement('div');
		this._img = document.createElement('div');
		this._prev = document.createElement('a');
		this._next = document.createElement('a');
		this._auto = opt.auto || false;
		this._speed = opt.speed ? opt.speed * 1000 : 3000;
		var picList = opt.img,
			len = picList.length,
			lFrag = document.createDocumentFragment(),
			iFrag = document.createDocumentFragment();

		this._obj.style.width = opt.width + 'px';
		this._obj.style.height = opt.height + 'px';
		this._indicators.className = 'carousel-indicators';
		this._content.className = 'carousel-content';
		this._img.className = 'carousel-img';
		this._prev.className = 'prev carousel-control';
		this._next.className = 'next carousel-control';
		this._prev.innerHTML = '<span>&#60;</span>';
		this._next.innerHTML = '<span>&#62;</span>';

		picList.forEach(function(elem, i){
			var li = document.createElement('li');
			var img = document.createElement('img');
			img.src = elem;
			if(i === 0){
				li.className = 'active';
			}
			lFrag.appendChild(li);
			iFrag.appendChild(img);
		});

		this._indicators.appendChild(lFrag);
		this._img.appendChild(iFrag);
		this._content.appendChild(this._img);
		this._obj.appendChild(this._indicators);
		this._obj.appendChild(this._content);
		this._obj.appendChild(this._prev);
		this._obj.appendChild(this._next);

		this.listen();
	},
	listen: function(){
		var obj = this._obj,
			prev = this._prev,
			next = this._next,
			indicators = this._indicators,
			li = indicators.getElementsByTagName('li'),
			img = this._img,
			len = img.getElementsByTagName('img').length,
			offset = obj.offsetWidth,
			auto = this._auto,
			speed = this._speed,
			timer = null,
			idx = 0;

		prev.addEventListener('click', function(ev){
			idx--;
			switchImg();
			Util.stopBubble(e);
		}, false);

		next.addEventListener('click', function(ev){
			idx++;
			switchImg();
			Util.stopBubble(e);
		}, false);

		indicators.addEventListener('click', function(ev){
			var e = ev || event;
			var tar = e.target;
			if(tar.tagName.toLowerCase() === 'li'){
				Array.prototype.forEach.call(li, function(elem, i){
					if(elem === tar){
						idx = i;
						switchImg();
						return;
					}
				});
				Util.stopBubble(e);
			}
		}, false);

		if(auto){
			timer = setInterval(function(){
				idx++;
				switchImg();
			}, speed);
		}

		obj.addEventListener('mouseover', function(ev){
			var e = ev || event;
			if(auto && timer){
				clearInterval(timer);
				timer = null;
			}
			Util.stopBubble(e);
		}, false);

		obj.addEventListener('mouseout', function(ev){
			var e = ev || event;
			if(auto && !timer){
				timer = setInterval(function(){
					idx++;
					switchImg();
				}, speed);
			}
			Util.stopBubble(e);
		}, false);

		function switchImg(){
			if(idx < 0){
				idx = len - 1;
			}else if(idx > (len - 1)){
				idx = 0;
			}
			Util.startMove(img, {"left": - offset * idx});
			Array.prototype.forEach.call(li, function(elem, i){
				elem.className = i === idx ? 'active' : '';
			});
		}
	}
};
Carousel.prototype.constructor = Carousel;
Zseed.prototype.carousel = function(opt){
	new Carousel(opt);
	return this;
};

var SearchSelect = function(opt){
	return this.init(opt);
};
SearchSelect.prototype = {
	init: function(opt){
		this._select = document.getElementById(opt.id);
		this._option = document.createElement('div');
		this._data = opt.data;

		this._select.className = 'searchSelect';
		this._option.className = 'searchSelect-option';
		this._option.style.width = (this._select.offsetWidth - 4) + 'px';

		Util.appendAfter(this._select, this._option);

		this.listenClick();
		this.listenKeyUp();
	},
	listenClick: function(){
		var _this = this,
			option = this._option,
			select = this._select;

		select.addEventListener('click', function(ev){
			var e = ev || event;
			var aOption = Util.getByClass('searchSelect-option');
			for (var i = 0, len = aOption.length; i < len; i++) {/*所有searchSelect隐藏*/
				if(Util.getStyle(aOption[i], "display") == "block"){
					aOption[i].style.display = "none";
				}
			}
			_this.updateOption();
			Util.stopBubble(e);
		}, false);

		option.addEventListener('click', function(ev){
			var e = ev || event;
			var tar = e.target;
			if(tar.tagName.toLowerCase() === 'a'){
				select.value = tar.innerHTML;
				option.style.display = "none";
				return;
			}
		});

		document.addEventListener('click', function(ev){
			var e = ev || event;
			if(Util.getStyle(option, "display") == "block"){
				option.style.display = "none";
			}
			Util.stopBubble(e);
		}, false);
	},
	listenKeyUp: function(){
		var _this = this,
			select = this._select;

		select.addEventListener('keyup', function(ev){
			var e = ev || event;
			_this.updateOption();
			Util.stopBubble(e);
		}, false);
	},
	updateOption: function(){
		var option = this._option,
			select = this._select,
			data = this._data,
			val = select.value.replace(/(^\s*)|(\s*$)/g, ""),
			frag = document.createDocumentFragment();
		option.innerHTML = "";
		for(var i = 0, len = data.length; i < len; i++){
			if(!val || data[i].toLowerCase().indexOf(val.toLowerCase()) != -1){
				var a = document.createElement('a');
				a.href = "#";
				a.innerHTML = data[i];
				frag.appendChild(a);
			}
		}
		option.appendChild(frag);
		if(Util.getStyle(option, "display") == "none"){
			option.style.display = "block";
		}
		option.innerHTML || (option.style.display = "none");
	}
};
SearchSelect.prototype.constructor = SearchSelect;
Zseed.prototype.searchSelect = function(opt){
	new SearchSelect(opt);
	return this;
};

window.ZS = window.Zseed = new Zseed();
})(window);