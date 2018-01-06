// testingParser.js

/* 
 * findBlank
 * unformQ
 	an instance of e
 * ans
 	array of answers
 * index
 	index does neccessary equal n
 	this represents the index of the instance of n
 * returns [preBlank,postBlank,solution,answer]
 * e.g.
	sentence related to inputs : "this sentence has three key terms."
	input:
		unformQ : "this [[2]] has [[0]] key [[1]]."
		ans : [ "three" , "terms" , "sentence" ]
		index : 1
	output:
		preBlank : "this sentence has "
		postBlank : "key terms."
		solution : "this sentence has three key terms."
		answer : ans[my_key] i.e. "three"
			my_key : 0 derived from number found at index
 */
var findBlank = function( unformQ, ans, index ){
	// used to build the sentence...
	// 		sets preblank
	// 		sets postblank
    var s = "";
    var preBlank = "";
    var postBlank = "";
    // split on '[' expecting [s,'','n]]'s, ... ]
    // 		Potentially : [s,s, ...] in the event of a single '['
    var arr_unformQ_l_split = unformQ.split('[');
    // ideally represents the number of key terms available
    var l = arr_unformQ_l_split.length;
    var cur_index = -1;
    var my_key = -1;
    // used to discover potential key term indexes
    var spot_3 = 0;

    for(var j = 0; j < l; j++){
        spot_3 += 1;
        var point_of_interest = arr_unformQ_l_split[j];
        if ( spot_3 === 1 ) {
            s += point_of_interest;
            continue;
		}
        if ( spot_3 === 2 ) {
        	// If the parent sentence had '[[' in it
        	//		Ideal
            if ( point_of_interest === "" ) {
                continue;
            }
            // found a stray '[' and need to add it into the output question
            spot_3 = 1;
            s += "[";
            s += point_of_interest;
            continue;
        } 
        // have found '[[' in the sentence
        if ( spot_3 === 3 ) {
        	// the point_of_interest is hopefully of the form
        	//		n]] s
        	// should become
        	// 		[ 'n', '', some stuff, only more stuff if there is a stray ']']
            var arr_unformQ_r_split = point_of_interest.split(']');
            // ideally has length 3
            var l_2 = arr_unformQ_r_split.length;
            // get the first item and convert it to a number
            // 		Will be NaN if the item was not in fact a number
            var num = Number(arr_unformQ_r_split[0]);
            // see if it's ideal
            if ( !isNaN(num) && arr_unformQ_r_split[1] === ""){
                cur_index += 1;
                if ( cur_index === index ) {
                    // set the preBlank
                    preBlank = s;
                    // reset s to later be written to "postBlank"
                    s = "";
                    // set the key to be the number found at our desired index
                    my_key = num;
                    // reset spot_3
                    spot_3 = 1;
                } else {
                	// 
                    s += ans[num];
                }
                s += arr_unformQ_r_split[2];
                // super unlikely but there could* be stray ']'
                // 		this should take care of adding them back in with the other strings
                for( var k = 3; k < l_2 ; k += 1 ) {
                    s += "]";
                    s += arr_unformQ_r_split[k];
                }
                // add in the other information
                spot_3 = 1;
                continue;
            }
            // found stray ']'
            s += arr_unformQ_r_split[0];
            s += "]";
            for( var k = 2; k < l_2 ; k += 1 ) {
                s = "]"
                s += arr_unformQ_r_split[k];
            }
            spot_3 = 1;
            continue;
        }
        // I believe this fails on '[[[' or any additional '[' beyond 2
        // also might fail on ']]]'
        console.log("something has gone terribly wrong in findBlank.");
        continue;
    }

    var postBlank = s;
    var answer = ans[my_key];
    var solution = preBlank + answer + postBlank;

    return [preBlank,postBlank,solution,answer];

}

// success case
var unformQ = "this [[2]] has [[0]] key [[1]]."
var ans = [ "three" , "terms" , "sentence" ]
var index = 1
var out = findBlank(unformQ,ans,index)
console.log(out)

// fail cases?

/*
 * getKeyUse
 * input:
    sentence e of the form e ::= s[[n]]e | s
 * output:
    countKeyUse : the number of keys in the sentence
 * e.g.
    sentence : "this [[2]] has [[0]] key [[1]]."
    countKeyUse : 3
 */
var getKeyUse = function( sentence ) {
    var countKeyUse = 0;
    // split on '[' expecting [s,'','n]]'s, ... ]
    //      Potentially : [s,s, ...] in the event of a single '['
    var arr_unformQ_l_split = sentence.split('[');
    var l = arr_unformQ_l_split.length;
    var spot_3 = 0;
    for(var j = 0; j < l; j++){
        spot_3 += 1;
        var point_of_interest = arr_unformQ_l_split[j];
        if ( spot_3 === 1 ) {
            continue;
        } if ( spot_3 === 2 ) {
            // If the parent sentence had '[[' in it
            //      Ideal
            if ( point_of_interest === "" ) {
                continue;
            }
            // found a stray '['
            spot_3 = 1;
            continue;
        } 
        // have found '[[' in the sentence
        if ( spot_3 === 3 ) {
            // the point_of_interest is hopefully of the form
            //      n]] s
            // should become
            //      [ 'n', '', some stuff, only more stuff if there is a stray ']']
            var arr_unformQ_r_split = point_of_interest.split(']');
            // ideally length 3
            var l_2 = arr_unformQ_r_split.length;
            // get the first item and convert it to a number
            //      Will be NaN if the item was not in fact a number
            var num = Number(arr_unformQ_r_split[0]);
            // see if it's ideal
            if ( !isNaN(num) && arr_unformQ_r_split[1] === ""){
                // we found a KeyUse
                countKeyUse += 1;
                // reset spot_3
                spot_3 = 1;
                continue;
            }
            //reset_spot3
            spot_3 = 1;
            continue;
        }
        console.log("something has gone terribly wrong in getKeyUse.");
        return 0;
    }
    return countKeyUse;
}

// success case
var sentence = "this [[2]] has [[0]] key [[1]]."
console.log(getKeyUse(sentence))