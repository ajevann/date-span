dateSpan
==========
### An AngularJS ng-filter for sorting through dates

This is an angular filter implementation to be used if you need to filter an array of items based
on date conditions. Providing a start and end date/time and an array of items, you can sort and filter
out items matching the conditions. You can either provide one or two date properties to determine
if the item in the array overlaps the date span in one of four ways:
1. The end time ends after the first date and before the second date
2. The start and end time occur within the given window
3. The start and end time occur on opposite sides of the window (encompasses the window)
4. The start time begins after the first date but not before the second date.

The implementation for a single date property is simpler. The date need only to occur during the date
span.


##### HTML
```html
<ul>
  <li ng-repeat="i in items | dateSpan:first_date:next_date:'start'></li>
</ul>
```
or
```html
<ul>
  <li ng-repeat="i in items | dateSpan:first_date:next_date:'start':'end'></li>
</ul>
```

where "first_date" and "next_date" are the dates for which you wish to filter on. "start" and "end" are the object's
properties that contain date values and are used by the filter to sort out which items are to be returned.

_Note: If you find any bugs or have any ideas on how to make this filter better, please let me know!_
