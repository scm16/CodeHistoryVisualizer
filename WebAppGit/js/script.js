$(document).ready(function(){
	$("#submit").on("click", function(e) {
   		e.preventDefault();
    	var username = $('#username').val();
    	var req_uri   = "https://api.github.com/users/" + username;
    	var repo_uri  = "https://api.github.com/users/" + username + "/repos";
    
    	requestJSON(req_uri, function(json) {
      		if(json.message == "Not Found" || username == "") {
        		$("#data").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span> User Not Found!</div>");
      		} else {
		        var name   = json.name;
		        var username   = json.login;
		        var aviurl     = json.avatar_url;
		        var profileurl = json.html_url;
		        var location   = json.location;
		        var followersnum = json.followers;
		        var followingnum = json.following;
		        var reposnum     = json.public_repos;
		        
		        if(name == undefined) { name = username; }

		        var outhtml = "<div class='profile'>"; 
		        outhtml += "<a href='" + profileurl + "' target='_blank'><img class='avatar' src='" + aviurl + "'</a>";
		        outhtml += "<h3>" + name + "</h3>";
		        outhtml += "<a href='" + profileurl + "' target='_blank'><h4>@" + username + "</h4></a>";
		        outhtml += "<div>Followers: <span class='fllwrs'>" + followersnum + "</span></div>";
		        outhtml += "<div> Following: <span class='fllwrs'>" + followingnum + "</span></div>";
		        outhtml += "</div>";

		        
		        var repositories;
		        $.getJSON(repo_uri, function(json){
		          repositories = json;   
		          outputPageContent();   
		          console.log(json);             
		        });          
		        
		        function outputPageContent() {
		        	outhtml+= "<div>";
		          if(repositories.length == 0) { 
		          	outhtml = outhtml + '<h4>No repos!</h4></div>'; 
		          } else {
		            outhtml = outhtml + '<h4><strong>Public Repositories:</strong></h4> <ul>';
		            $.each(repositories, function(index) {
		            	var months = ['s', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
		            	var arr = repositories[index].created_at.split("T"); 
		            	arr = arr[0].split("-"); 
		            	var created_month = months[parseInt(arr[1])]; 
		            	var created_year = arr[0]; 
		            	var created_date = arr[2];

		            	arr = repositories[index].pushed_at.split("T"); 
		            	arr = arr[0].split("-"); 
		            	var pushed_month = months[parseInt(arr[1])]; 
		            	var pushed_year = arr[0]; 
		            	var pushed_date = arr[2];

		            	arr = repositories[index].updated_at.split("T"); 
		            	arr = arr[0].split("-"); 
		            	var updated_month = months[parseInt(arr[1])]; 
		            	var updated_year = arr[0]; 
		            	var updated_date = arr[2];

		            	outhtml += '<li>';
		            	outhtml += '<ul class="list-group">'
		            	outhtml += '<li class="list-group-item active"><h5><span class="glyphicon glyphicon-book" aria-hidden="true"></span>&nbsp&nbsp&nbsp' + repositories[index].name + '</h5>'; 
		            	outhtml += '<li class="list-group-item">Forks: ' + repositories[index].forks_count + '</li>'; 
		            	outhtml += '<li class="list-group-item">Size: ' + repositories[index].size + 'KB</li>'; 
		            	outhtml += '<li class="list-group-item">Created: ' + created_month + " " + created_date + ", " + created_year + '</li>';
		            	outhtml += '<li class="list-group-item">Pushed: ' + pushed_month + " " + pushed_date + ", " + pushed_year + '</li>';
		            	outhtml += '<li class="list-group-item">Last Updated: ' + updated_month + " " + updated_date + ", " + updated_year + '</li>';
		            	outhtml += '<li class="list-group-item"><a target="_blank" href="' + repositories[index].html_url + '">Go to repository</a></li>'
		            	outhtml += '</ul>'
		            	outhtml += '</li>'
		            });
		            outhtml = outhtml + '</ul></div>'; 
		          }
		          $('#data').html(outhtml);
		        } 
		      } 
    }); 
  }); 
  
 	function requestJSON(url, callback) {
	    $.ajax({
	      url: url,
	      complete: function(xhr) {
	        callback.call(null, xhr.responseJSON);
	      }
	    });
  	}
});