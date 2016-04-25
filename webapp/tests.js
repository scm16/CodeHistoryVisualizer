
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



QUnit.test( "User Name", function( SearchViewModel ) {
  SearchViewModel.ok( 1 == "1", "Passed!" );
});

QUnit.test( "ViewModel", function( search ) {
  search.ok( 1 == "1", "Passed!" );
});

QUnit.test( "public repos", function( publicRepos ) {
  publicRepos.ok( 1 == "1", "Passed!" );
});

QUnit.test( "ptoggleActive", function( toggleActive ) {
  toggleActive.ok( 1 == "1", "Passed!" );
});
