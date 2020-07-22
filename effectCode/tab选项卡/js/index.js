window.onload = function () {
    var allLi = $('tab_header').getElementsByTagName('li');
    var allDom = $('tab_content').getElementsByClassName('dom');
    for(var i=0; i<allLi.length; i++){
        var li = allLi[i];
        li.index = i;
        li.onclick = function () {
            for(var j=0; j<allLi.length; j++){
                allLi[j].className = '';
                allDom[j].style.display = 'none';
            }
            this.className = 'selected';
            allDom[this.index].style.display = 'block';
        }
    }
};
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}