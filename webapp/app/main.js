// Wrap app in define function, for require.js
define([
	'../lib/jquery-2.2.3.min',
	'../lib/knockout-min',
	'GraphViewModel'
	], function ($, ko, graphVM) {

	// Main logic goes here
	console.log("Loaded")
	var $ = jQuery; // not sure why this is necessary

	var ViewModel = function() {
		var self = this;

		self.query = ko.observable("");

		self.username = ko.observable("");
		self.login = ko.observable("");
		self.avatar_url = ko.observable("");
		self.html_url = ko.observable("");
		self.location = ko.observable("");
		self.followers = ko.observable("");
		self.following = ko.observable("");
		self.public_repos = ko.observable("");
		self.repos = ko.observableArray();

		self.repo = ko.observable("");
		self.commitlist = ko.observableArray();

		self.selectText = ko.computed(function() {
			return (self.repo()!="") ? "Return to list" : "Select"
		});

		self.search = function() {
			self.repos([]);
			if (self.query() == '') {
				return;
			}

			jQuery.ajax({
				url:"https://api.github.com/users/" + self.query(),
				complete: function(xhr) {
					var json = xhr.responseJSON;
					self.username(json.name);
					self.login(json.login);
					self.avatar_url(json.avatar_url);
					self.html_url(json.html_url);
					self.location(json.location);
					self.followers(json.followers);
					self.following(json.following);
					self.public_repos(json.public_repos);
				}
			});
			jQuery.ajax({
				url:"https://api.github.com/users/" + self.query() + "/repos",
				complete: function(xhr) {
					var json = xhr.responseJSON;
					jQuery.each(json, function(index, elem) {
						elem.isActive = ko.observable(true);
						self.repos.push(elem)
					});
				}
			});
		};
		self.toggleActive = function(data, event) {
			var active = (self.repo() != "");
			self.repo(active ? "" : data.name);
			ko.utils.arrayForEach(self.repos(), function(elem) {
				elem.isActive(active);
			});
			data.isActive(true);
		};



		self.updateGraph = function() {

			if (self.commitlist().length == 0) {
				return;
			}

			var contributors = [];
			ko.utils.arrayForEach(self.commitlist(), function(elem) {
				if (contributors.indexOf(elem.author.login) == -1) {
					contributors.push(elem.author.login);
				}
			});

			var startDate = new Date(self.commitlist()[self.commitlist().length-1].commit.author.date);
			var endDate = new Date(self.commitlist()[0].commit.author.date);
			var n = Math.floor((endDate - startDate)/1000/3600/24 + 1); // number of days
			var m = contributors.length;
			
			var data = [];

			$.each(contributors, function(contrib_index, elem_contrib) {
				data.push(Array.apply(null, Array(n)).map(Number.prototype.valueOf,0));

				ko.utils.arrayForEach(self.commitlist(), function(elem_commit) {
					var currentDate = new Date(elem_commit.commit.author.date);
					var contributor = elem_commit.author.login;
					if (contributor == elem_contrib) {
						var dateIndex = Math.floor((currentDate - startDate)/1000/3600/24);
						data[contrib_index][dateIndex] = data[contrib_index][dateIndex] + 1;
					}
				});

			});

			var sum = new Array(data.length);
			for (var x = 0; x < data.length; x++) {
				sum[x] = 0;
				for (var y = 0; y < data.length; y++) {
					sum[x] += data[y][x];
				}
			}

			layers = data.map(function(d) {
				return d.map(function(p, i) {
					return {
						x: i,
						y: p,
						y0: 0
					};
				});
			});

			var stack = d3.layout.stack().offset("wiggle");

			var width = 960,
				height = 500;

			var x = d3.scale.linear()
				.domain([0, m - 1])
				.range([0, width]);

			var y = d3.scale.linear()
				.domain([0, d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
				.range([height, 0]);

			var color = d3.scale.linear()
				.range(["#fff", "#222"]);

			var area = d3.svg.area()
				.x(function(d) { return x(d.x); })
				.y0(function(d) { return y(d.y0); })
				.y1(function(d) { return y(d.y0 + d.y); });

			var svg = d3.select("#graph").append("svg")
				.attr("width", width)
				.attr("height", height);

			svg.selectAll("path")
				.data(layers)
				.enter().append("path")
				.attr("d", area)
				.style("fill", function() { return color(Math.random()); });

		};

		self.repo.subscribe(function(value) {
			if (value == "") {
				self.commitlist([]);
			} else {
				$.ajax({
					url:"https://api.github.com/repos/" + self.query() + "/" + self.repo() + "/commits",
					complete: function(xhr) {
						var json = xhr.responseJSON;
						$.each(json, function(index, elem) {
							elem.formatted = function() {
								return elem.commit.message + " - by " + elem.author.login
							};
							self.commitlist.push(elem);
						});
						self.updateGraph();
					}
				});


			}
		});
	};

	ko.applyBindings(new ViewModel());
});