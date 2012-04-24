$(document).ready(function () {
  QUnit.config.autostart = false;
  
  module('Engine Tests 1');
  
  test('Test 1', function () {
    ok(1 == 1, 'Works');
  });
  
  module('Engine Tests 2');
  
  test('Test 1', function () {
    ok(1 == 1, 'Works Too');
  });
});