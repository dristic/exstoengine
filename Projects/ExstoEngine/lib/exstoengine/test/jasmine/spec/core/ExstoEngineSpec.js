describe("ExstoEngine.js", function() {
  describe("Array.indexOf", function() {
    it("should allow cross-browser use of Array.indexOf, which does not exist in IE", function() {
      var array = ["Wayne", "Garth", "Billy", "Jean"];
      var result = array.indexOf("Garth");
      expect(result).toEqual(1);
    });
  });
  
  describe("ex.extend", function() {
    it("should copy all properties from one object to another, overwriting properties of the same name", function () {
      var object = { name: 'old name', testVal: 10};
      var other = {name: 'new name', otherVal: 20};
      ex.extend(object, other);
      expect(object.name).toEqual('new name');
      expect(object.testVal).toEqual(10);
      expect(object.otherVal).toEqual(20);
    });
  });
  
  describe("ex.Array", function() {
    var array = [2, 4, 6, 8, 10, 22];
    describe("ex.Array.contains", function() {
      it("should return true if a value exists in the array, false otherwise", function() {
        var trueTest = ex.Array.contains(array, 10);
        expect(trueTest).toBeTruthy();
        
        var falseTest = ex.Array.contains(array, 11);
        expect(falseTest).not.toBeTruthy();
      });
    });
    
    describe("ex.Array.remove", function() {
      it("should remove a value if found in the array", function() {
        //ex.Array.remove(array, -1);
        expect(array.length).toEqual(6);
        
        ex.Array.remove(array, 2);
        expect(array.length).toEqual(5);
        expect(ex.Array.contains(array, 2)).not.toBeTruthy();
      });
    });
    
    describe("ex.Array.average", function() {
      it("should average the numbers in the array if all of them are numbers", function() {
        var result = ex.Array.average(array);
        expect(result).toEqual(10);
      });
    });
  });
});

//describe("base.js", function() {
//  describe("jasmine.MessageResult", function() {
//    it("#toString should pretty-print and concatenate each part of the message", function() {
//      var values = ["log", "message", 123, {key: "value"}, "FTW!"];
//      var messageResult = new jasmine.MessageResult(values);
//      expect(messageResult.toString()).toEqual("log message 123 { key : 'value' } FTW!");
//    });
//  });
//
//  describe("jasmine.log", function() {
//    it("should accept n arguments", function() {
//      spyOn(jasmine.getEnv().currentSpec, 'log');
//      jasmine.log(1, 2, 3);
//      expect(jasmine.getEnv().currentSpec.log).toHaveBeenCalledWith(1, 2, 3);
//    });
//  });
//
//  describe("jasmine.getGlobal", function() {
//    it("should return the global object", function() {
//      var globalObject = (function() {
//        return this;
//      })();
//
//      expect(jasmine.getGlobal()).toBe(globalObject);
//    });
//  });
//});
