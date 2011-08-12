(function(window) {

	/**
	 * The base class definition for all classes in ExstoEngine. This function
	 * chains for proper use of instanceof and also supplies a _super method for
	 * accessing base classes.
	 * 
	 * @param namespace
	 *            The namespace of the new class
	 * @param base
	 *            The base class type to extend from or the class definition if
	 *            not extending
	 * @param extension
	 *            The new class that will be extending base
	 * @returns {Class} new class
	 */
	ex.define = function(namespace, base, extension) {
		if (typeof namespace != 'string') {
			throw new Error(
					"Cannot create class, namespace must be of type String.\n"
							+ base.constructor);
			return null;
		}
		if (extension == null) {
			createNewClass(namespace, base);
		} else {
			extendBaseClass(namespace, base, extension);
		}
	};

	/**
	 * creates a new class with no inheritance
	 * @param namespace {string} namespace of new class
	 * @param base {Object} class prototype
	 */
	function createNewClass(namespace, base) {
		function NewClass() {
			// empty function to hold new class
		};

		// --If a constructor is supplied call it
		if (typeof base.constructor == "function" && base.constructor != Object) {
			NewClass = base.constructor;
		}

		NewClass.prototype = base;

		// Generates namespace tree if necessary
		generateNamespace(namespace, NewClass);

	}
	;
	
	/**
	 * creates a new class with inheritance
	 * @param namespace {string} namespace of new class
	 * @param base {Object} base class
	 * @param extension {Object} base class extension (new class)
	 * 
	 */
	function extendBaseClass(namespace, base, extension) {
		// Check for passing in null base class
		if (base == null) {
			throw new Error("The base class has not been defined: "
					+ proto.constructor);
		}

		var _base = base.prototype.clone();

		function NewClass() {

		}
		;

		if (typeof proto.constructor == "function"
				&& proto.constructor != Object) {
			NewClass = proto.constructor;
		} else if (typeof _base.constructor == "function") {
			newClass.constructor = _base.constructor;
		}

		// --Chain the base prototype
		NewClass.prototype = base.prototype.clone();

		// --Mix in the supplied prototype
		NewClass.prototype.mixInto(proto);

		// --Add super() for constructor and base properties
		NewClass.prototype._super = function(func, args) {
			_base[func].apply(this, args);
		};
	};
	
	/**
	 * Generates the namespace tree in the DOMWindow for the
	 * new class.
	 * @param namespace {string} namespace of class
	 * @param newClass {Object} class to be added to namespace
	 */
	function generateNamespace(namespace, newClass){
		var context = window;
		var parts = namespace.split('.');
		for ( var index = 0; index < parts.length; index++) {
			var part = parts[index];
			// Step down to index
			for ( var subIndex = 0; subIndex < index; subIndex++) {
				context = context[parts[subIndex]];
			}
			// Create empty object if it doesn't exist already
			context[part] = context[part] || {};
			if (index == parts.length - 1) {
				context[part] = newClass;
			}
		}
	}

})(window);