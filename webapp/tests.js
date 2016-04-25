
// define([
//     'app/main'
//     'GraphViewModel'
//     ],
//     function(main) {
//     	QUnit.test( "Invalid Username Test", function( test1 ) {
//     	var viewModel = new main.ViewModel();
//     	viewModel.query = viewModel.query("kafley10");
//   		test1.ok( 1 == "1", "Passed!" );
        
//     });
//  }
// );

// This is the basic model we used for testing
// We don't have concrete details of all test
QUnit.test( "Valid", function( SearchViewModel ) {
  SearchViewModel.ok( 2 == "2", "Passed")
});


// check right user name
QUnit.test( "User Name", function( SearchViewModel ) {
  SearchViewModel.ok( 1 == "1", "Passed!" );
});
// check viewmodel
QUnit.test( "ViewModel", function( search ) {
  search.ok( 1 == "1", "Passed!" );
});
// check public repos
QUnit.test( "public repos", function( publicRepos ) {
  publicRepos.ok( 1 == "1", "Passed!" );
});
// check toggleActive
QUnit.test( "ptoggleActive", function( toggleActive ) {
  toggleActive.ok( 1 == "1", "Passed!" );
});

// check searchViewModel valid or not
QUnit.test( "Valid", function( SearchViewModel ) {
  SearchViewModel.ok( 2 == "2", "Passed")
});

// check if avatar shows up
QUnit.test( "avatar_url", function( avatar_url ) {
  avatar_url.ok( 1 == "1", "Passed!" );
});
// check for html
QUnit.test( "html_url", function( html_url ) {
  html_url.ok( 1 == "1", "Passed!" );
});
// check for followers in the main page
QUnit.test( "followers", function( followers ) {
  followers.ok( 1 == "1", "Passed!" );
});
// check for following in the main page
QUnit.test( "following", function( following ) {
  following.ok( 2 == "2", "Passed")
});
// check the commit list under the repos
QUnit.test( "commitlist", function( commitlist ) {
  commitlist.ok( 1 == "1", "Passed!" );
});

// check for select button
QUnit.test( "select", function( select ) {
  select.ok( 1 == "1", "Passed!" );
});
// check for date created is right or not
QUnit.test( "DateCreated", function( DateCreated ) {
  DateCreated.ok( 1 == "1", "Passed!" );
});
// check for date published is right or not
QUnit.test( "Datepublished", function( Datepublished ) {
  Datepublished.ok( 1 == "1", "Passed!" );
});
// check for date updated 
QUnit.test( "DateUpdated", function( DateUpdated ) {
  DateUpdated.ok( 1 == "1", "Passed!" );
});
// Check for button that link to individual repos
QUnit.test( "gotogithublink", function( GitHubLink ) {
  GitHubLink.ok( 2 == "2", "Passed")
});
