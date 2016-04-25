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
		}

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
					}
				});
			}
		});
	};

	ko.applyBindings(new ViewModel());
});