//node.js utilities
module.exports = {
    //------------------------------------------------- MISCELLANEOUS ----------------------------------------------------------------
    /*  getRandomInteger

        Returns a random integer between the lower and upper bounds

        Parameters:
            lower - the lower bound
            upper - the upper bound
        Returns:
            A random integer between the lower and upper bounds
    */
    getRandomInteger: function(lower, upper)
    {
        var multiplier = upper - (lower - 1);
        var rnd = Math.floor(Math.random() * multiplier) + lower; //parseInt is buggy

        return rnd;
    },

    //---------------------------------------------------- ARRAYS --------------------------------------------------------------------
    /*  countDuplicatesInArray

        Searches an array for a specific item and returns the number of times that item appears in the array

        Parameters: 
            array - the array
            itm - the search item
        Returns:
            The number of times the itm appears in the array
    */
    countDuplicatesInArray: function(array, itm)
    {
        itmCount = 0;

        for (var i = 0; i < array.length; i++)
            if(itm == array[i])
                itmCount++;

        return itmCount;
    },
    /*  indexesOfArray

        Searches an array for a specific item and returns the index(es) in which it is found

        Parameters:
            array - the array
            itm - the search item
        Returns: 
            An array including all of the indices at which the item appears (empty if item is not in the list)
    */
    indexesOf: function(array, itm)
    {
        var idxList = [];

        for(var i = 0; i < array.length; i++)
            if(itm == array[i])
                idxList.push(i);
        
        return idxList;
    },
    /*  getRandomOfArray

        Returns a random item of an array

        Parameters:
            array - the array
    */
    getRandomOfArray: function(array)
    {
        return array[getRandomInteger(0, (array.length - 1))];
    },
    /* shuffleArray (Fisher-Yates algorithm)

        Returns a shuffled version of an array

        Parameters:
            array - the array   
    */
   shuffleArray: function(array)
   {
        var j, x, i;
        for (i = array.length - 1; i > 0; i--) 
        {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
   },
   /* splitArray

        Returns an array with the split contents of a larger array

        Parameters:
            array - the array to be split
            increment - the length of each content splice
            fillarray - the array to add the split contents to
   */
   splitArray: function(array, increment, fillarray)
   {
        var index = 0;
        if(fillarray) var split = fillarray; else var split = [];
        for(i = 0; i < Math.ceil(array.length / increment); i++){
            if(array.length - index < increment){
                split[i] = array.slice(index, array.length);
            }
            else{
                split[i] = array.slice(index, index + increment)
                index += increment;
            }
        }
        return split;
   },
   getParams: function(func){
        // String representaation of the function code 
        var str = func.toString(); 
    
        // Remove comments of the form /* ... */ 
        // Removing comments of the form // 
        // Remove body of the function { ... } 
        // removing '=>' if func is arrow function  
        str = str.replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\/\/(.)*/g, '')
                .replace(/{[\s\S]*}/, '')
                .replace(/=>/g, '')
                .trim();
    
        // Start parameter names after first '(' 
        var start = str.indexOf("(") + 1; 
    
        // End parameter names is just before last ')' 
        var end = str.length - 1; 
    
        var result = str.substring(start, end).split(", "); 
    
        var params = []; 
    
        result.forEach(element => { 
            // Removing any default value 
            element = element.replace(/=[\s\S]*/g, '').trim(); 
    
            if(element.length > 0) 
                params.push(element); 
        }); 
        
        return params; 
    }
}