function DoRegisterSearch(config,fun) {
	var htm = "";
	htm += config.caption+ "<input type='text' class='search'>";
	$("#" + config.id).html(htm);
    config.search();


}

var searchConfig = {
	id: "searc",
	caption: "快速检索",
	search: function(v) {

	}
};