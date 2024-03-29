/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) return array.pop();
    if (n > array.length) return array;
    return (array.slice(array.length - n, array.length));
   
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === "object") {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
    
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function(val) {
      if (test(val)) results.push(val); 
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var results = [];
    _.filter(collection, function(val) {
      if (!(test(val))) results.push(val);
    });
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    array = array.sort();
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== array[i+1]) {
        results.push(array[i]);
      }
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        results.push(iterator(collection[i], i, collection));
      }
    } else if (typeof collection === "object") {
      for (var key in collection) {
        results.push(iterator(collection[key], key, collection));
      }
    }
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === "function") {
      return _.map(collection, function(val) {
        return functionOrKey.apply(val, args);
        });
    } else if (typeof functionOrKey === "string") {
      return _.map(collection, function(val) {
        return val[functionOrKey].apply(val, args);
        });
      }
    };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(val){
      accumulator = iterator(accumulator, val);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    });
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    var answer = true;
    return _.reduce(collection, function(tot, val){
      if (!(iterator(val))) {
        answer = false;
      }
      return answer;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(val) {
      return !iterator(val);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var argsArray = Array.prototype.slice.apply(arguments);
    _.each(argsArray, function(prop) {
      _.each(prop, function(val, key) {
        obj[key] = val;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var argsArray = Array.prototype.slice.apply(arguments);
    _.each(argsArray, function(prop) {
      _.each(prop, function(val, key) {
        if (!(key in obj)) {
          obj[key] = val;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};
    var memoFunc = function(val) {
      if (val in cache) {
        return cache[val];
      } else {
        return cache[val] = func(val);
      }
    };
    return memoFunc;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var argsArray = Array.prototype.slice.call(arguments, 2);
    var waitFunc = function(){ 
      return func.apply(this, argsArray); 
    } 
    return window.setTimeout(waitFunc, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffledArray = [];
    var tempArr = Array.prototype.slice.call(arguments);
    var temp;
    var shufflerFunc = function(arr) {
      if (arr.length === 1) {
        shuffledArray.push(arr[0]);
        tempArr = [];
      } else {
        var randInd = Math.floor(Math.random() * (arr.length));
        temp = arr[randInd];
        shuffledArray.push(temp);
        tempArr.splice(randInd, 1);
      }
      return shuffledArray;
    };
    while (tempArr.length > 0) {
      shufflerFunc(tempArr);
    };
    return shuffledArray;
    
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'function') {
      return collection.sort(function(a,b) {return iterator(a) - iterator(b);});
    }
    if(typeof iterator === 'string') {
      return collection.sort(function(a,b){return a.length - b.length;});
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var largest = 0;
    var arr = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i].length > largest) {
        largest = args[i].length;
      }
    }
    var narr = new Array(largest);
    for (var j = 0; j < narr.length; j++) {
      narr[j] = [];
      arr = _.pluck(args, j);
      for (var k = 0; k < arr.length; k++) {
        narr[j].push(arr[k]);
      }   
    }
    return narr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var narr = [];
    var flattenFunc = function(arr) {
      _.each(arr, function(val, ind){
        if (Array.isArray(val)) {
          flattenFunc(val);
        } else {
          narr.push(val);
        }
      });
      return narr;
    }
    return flattenFunc(nestedArray);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var arr = _.flatten(args);
    var narr = [];
    arr.sort();
    arr.sort(function(a,b){return a-b;});
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i+1]) {
        narr.push(arr[i]);
      }
    }
    return narr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var argsTest = Array.prototype.slice.call(arguments, 1);
    argsTest = _.flatten(argsTest);
    var resultsObj = {};
    for (var j = 0; j < argsTest.length; j++) {
      resultsObj[argsTest[j]] = j;
    }
    var results = [];
    for (var i = 0; i < array.length; i++) {
      if (!(array[i] in resultsObj)){
        results.push(array[i]);
      }
    }
    return results;


  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var called = false;
    var cache = {};
    var args = arguments;
    return function(){
      if (called === false) {
        cache.result = func.apply(this, args);
        called = true;
        return cache.result;
      } else {
        window.setTimeout(func, wait);
        return cache.result;
      }
    }
    
  }

}).call(this);