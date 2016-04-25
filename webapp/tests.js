
define([
    'app/main'
    
    ],
    function(main) {
    	QUnit.test( "Invalid Username Test", function( test1 ) {
    	
  		test1.ok( 1 == "1", "Passed!" );
	});
        
    }
);



// Test for error message upon entering invalid GitHub username


// Test for retrieval of all public repositories upon entering valid
// GitHub username
// QUnit.test( "Valid", function( test2 ) {
//   test2.ok( 2 == "2", "Passed")
// });