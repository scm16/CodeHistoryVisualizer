// Wrap app in define function, for require.js
define(function (require) {
	// load dependencies
	var $ = require('../lib/jquery-2.2.3.min'),
		ko = require('../lib/knockout-min'),
		highcharts = require('../lib/highcharts');

	// Main logic goes here
	console.log("Loaded")

	var SearchViewModel = function() {
		this.query = ko.observable("");
		this.repo_json = ko.observable("");
		this.search = function() {
			this.repo_json(JSON.stringify(jQuery.get("https://api.github.com/repos/" + this.query() + "/commits")));
		};
	};

	ko.applyBindings(new SearchViewModel());
});