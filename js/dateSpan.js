/**
 * @ngdoc filter
 * @name dateSpan
 * @kind function
 *
 * @param {Array} items The array of items to filter through
 * @param {String or Integer} from The first date to be used for checking 
 * @param {String or Integer} to The second date to be used for checking
 * @param {String} objectDateA The object property that should be used as the 'start' date 
 * @param {String} objectDateB The object property that should be used as the 'end' date
 * @description
 * Given a from and to date, check whether the dates of an object (start and/or end) 
 * overlap the time span. If a single object property is given, the validity is 
 * whether or not the property date occurs within the time span.
 * @return 
 * array of valid items
 */
angular.module("app")
  .filter("dateSpan", function(){
    return function(items, from, to, objectDateA, objectDateB) {
      var dateFrom = new Date(), 
          dateTo = new Date;

      if (typeof from !== 'string' && typeof from !== 'number') {
        console.error('dateSpan Filter: "from" must be a string or an integer');
      }

      if (typeof to !== 'string' && typeof to !== 'number') {
        console.error('dateSpan Filter: "to" must be a string or an integer');
      }

      try { 
        dateFrom = new Date(from); 
      } catch (err) { 
        console.error('dateSpan Filter: "from" date invalid\n' + err.toString()); 
      }
      
      try { 
        dateTo = new Date(to); 
      } catch (err) { 
        console.error('dateSpan Filter: "to" date invalid\n' + err.toString()); 
      }


      if (dateFrom > dateTo) {
        console.error('dateSpan Filter: "from" should not occur after "to"');
      }

      // Resulting array to be returned
      var newItems = [];   
      
      // Single date version
      if (objectDateB === undefined) {
        angular.forEach(items, function(item, i) {
          var date = new Date();
        
          try { 
            date = new Date(item[objectDateA]);
          } catch (err) { 
            console.error('dateSpan Filter: Given date property invalid\n' + err.toString()); 
          }

          if (date <= dateFrom && date <= dateTo) {  }  // Do Nothing
          if (date >= dateFrom && date <= dateTo) { newItems.push(item); }
          if (date >= dateFrom && date >= dateTo) {  }  // Do Nothing
        });
      }
      // Start and End date version
      else {
        angular.forEach(items, function(item, i) {
          var start = new Date(),
              end = new Date();

          try { 
            start = new Date(item[objectDateA]); // <--- Change to your specific object's start date
            end = new Date(item[objectDateB]);     // <--- Change to your specific object's end datese
          } catch (err) { 
            console.error('dateSpan Filter: Given date properties invalid\n' + err.toString()); 
          }

          if ((start <= dateFrom && start <= dateTo) && (end <= dateFrom && end <= dateTo)) {  } // Do Nothing
          if ((start <= dateFrom && start <= dateTo) && (end >= dateFrom && end <= dateTo)) { newItems.push(item); }
          if ((start >= dateFrom && start <= dateTo) && (end >= dateFrom && end <= dateTo)) { newItems.push(item); }
          if ((start >= dateFrom && start <= dateTo) && (end >= dateFrom && end >= dateTo)) { newItems.push(item); }
          if ((start >= dateFrom && start >= dateTo) && (end >= dateFrom && end >= dateTo)) {  } // Do Nothing
          if ((start <= dateFrom && start <= dateTo) && (end >= dateFrom && end >= dateTo)) { newItems.push(item); }
        });
      }

      return newItems;
    };
  });