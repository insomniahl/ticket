!function(t){"use strict";t.extend(t.fn.bootstrapTable.defaults,{showFilter:!1});var o=t.fn.bootstrapTable.Constructor,e=o.prototype.init,a=o.prototype.initSearch;o.prototype.init=function(){e.apply(this,Array.prototype.slice.apply(arguments));var o=this;this.$el.on("load-success.bs.table",function(){o.options.showFilter&&t(o.options.toolbar).bootstrapTableFilter({connectTo:o.$el})})},o.prototype.initSearch=function(){a.apply(this,Array.prototype.slice.apply(arguments)),"server"!==this.options.sidePagination&&"function"==typeof this.searchCallback&&(this.data=t.grep(this.options.data,this.searchCallback))},o.prototype.getData=function(){return this.searchText||this.searchCallback?this.data:this.options.data},o.prototype.getColumns=function(){return this.columns},o.prototype.registerSearchCallback=function(t){this.searchCallback=t},o.prototype.updateSearch=function(){this.options.pageNumber=1,this.initSearch(),this.updatePagination()},o.prototype.getServerUrl=function(){return"server"===this.options.sidePagination&&this.options.url},t.fn.bootstrapTable.methods.push("getColumns","registerSearchCallback","updateSearch","getServerUrl")}(jQuery);