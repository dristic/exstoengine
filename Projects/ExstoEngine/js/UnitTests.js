module("ExstoEngine Setup");
			
test("Preload", function(){
	expect(1);
	
	ok(typeof ex.define != 'undefined', "ex.define included");
});

module("ExstoEngine Defines");

test("base class definition", function(){
	ex.define("ex.DoobieSnack", {
		constructor: function(){
			this.doobieCount = 10;
		},
	});
	ok(typeof ex.DoobieSnack != 'undefined', "ex.DoobieSnack included");
	
	var doobieSnack = new ex.DoobieSnack();
	ok(doobieSnack.doobieCount == 10, "class members are accessible: doobieSnack.doobieCount is " + doobieSnack.doobieCount);
});

test("extended class definition", function(){
	ex.define("ex.ExtendedClass", ex.BaseClass, {
		countDoobies: function() {
			return this.doobieCount;
		}
	});
});