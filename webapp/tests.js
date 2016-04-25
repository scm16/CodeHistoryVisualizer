QUnit.test( "hello test", function( require ) {
  require.ok( 1 == "1", "Passed!" );
  
});
QUnit.test( "SearchViewModel Test", function( SearchViewModel ) {
  SearchViewModel.ok( 2 == "2", "Passed")
});