module("ExstoEngine Setup");
			
test("Preload", function(){
	expect(1);
	
	ok(typeof ex.define != 'undefined', "ex.define included");
});

test("Class Definitions", function(){
	ex.define("ex.DoobieSnack", {
		constructor: function(){
			this.doobieCount = 10;
		},
	});
	ok(typeof ex.DoobieSnack != 'undefined', "ex.DoobieSnack included (base class)");
	
	var doobieSnack = new ex.DoobieSnack();
	ok(doobieSnack.doobieCount == 10, "class members are accessible: doobieSnack.doobieCount is " + doobieSnack.doobieCount);

	ex.define("ex.ExtraDoobieSnack", ex.DoobieSnack, {
		countDoobies: function() {
			return this.doobieCount;
		}
	});
	ok(typeof ex.ExtraDoobieSnack != 'undefined', "ex.ExtraDoobieSnack is included (extended from ex.DoobieSnack)");
	
	var moreDoobies = new ex.ExtraDoobieSnack();
	console.log(moreDoobies);
	console.log(ex.ExtraDoobieSnack);
	ok(moreDoobies.countDoobies() == 10, "class members are accessible: moreDoobies.countDoobies() is " + moreDoobies.countDoobies());
});