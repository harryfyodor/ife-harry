
var articles;

var text = '[' + '{'+'"id":0,' + '"title":"233",' + '"content":"234"' + '}' + ']';
	
function articleModel(id, title, content) {
	this.id = id;
	this.title = title;
	this.content = content;
}

function editContent() {
	var titleArea = $(".title"),
		contentArea = $(".para"),
		buttonArea = $("button"),
		idIn = 0,
		titleIn,
		contentIn,
		len = articles.length;
	
	idIn = articles[articles.length - 1] + 1;

	$.click(buttonArea, function(){
		titleIn = titleArea.value;
		contentIn = contentArea.value;
		if (titleIn && contentIn) {
			console.log(idIn);
			var newArticle = new articleModel(idIn, titleIn, contentIn);
			articles.push(newArticle);
			save();
		}
	})
}

function catalog() {
	var titleArea = $(".title"),
		contentArea = $(".para"),
		contentContain = $("#content"),
		len = articles.length;
	
	if (articles.length) {
		for (var i = 0; i < len; i++) {
			var text = "<li><a href='#'>" + articles[i].title + "</a></li>";
			contentContain.innerHTML = contentContain.innerHTML + text;
		}
	}
	
	$.delegate(contentContain, "a", "click", function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		for (var i = 0, len = articles.length; i < len; i++) {
			if (articles[i].title == target.innerHTML) {
				titleArea.value = articles[i].title;
				contentArea.value = articles[i].content;
			}
		}
	})
	
}

function save() {
	localStorage.articles = JSON.stringify(articles);
}

window.onload = function() {
	if (!localStorage.getItem("articles")){
		localStorage.articles = text;
	}
	articles = JSON.parse(localStorage.articles);
	
	editContent();
	catalog();
	//localStorage.clear();
}

/*
1,播放要在保存前,保存放最后。
2,localStorage用数组可以添加对象，实现复杂的数据结构。
3,onload里面的顺序是先判断数组是不是空的，空的就给默认值。然后articles再赋值一个json。
4,localStorage里面存的是字符串。
*/
//localStorage.clear();