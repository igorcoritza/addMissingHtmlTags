String.prototype.indexesOf = function (searchStr, caseSensitive) {
  var searchStrLen = searchStr.length;
  var str = this;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

var addClosetag = function (data, kindOfCloser){
    var indexList = data.indexesOf(kindOfCloser);

    for(var i in indexList){
        var item = indexList[i];
        var seven = data.substr(item).indexOf(">")
        var mainIndex = item + seven;
        if(data[mainIndex - 1] != "/"){
            data = data.slice(0, mainIndex) + "/" + data.slice(mainIndex);
            var indexList = data.indexesOf(kindOfCloser);
        }

    }

    return data;
};
var addMissingHtmlTags = function (err, data) {
    data = addClosetag(data, "<meta");
    data = addClosetag(data, "<input");
    data = addClosetag(data, "<img");
    data = addClosetag(data, "<br");
    data = addClosetag(data, "<link");
    fs.writeFileSync("igor.html", data);
};

console.log(process.argv);

var fs = require("fs");
fs.readFile("./content/Renfe.html", "utf-8", addMissingHtmlTags.bind(fs));