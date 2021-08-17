var ArrayUtil={};ArrayUtil.arrayToSet=function(r){for(var t={},n=0,a=r.length;a>n;n++)t[r[n]]=1;return t},ArrayUtil.compareSets=function(r,t){if(!ArrayUtil.isArray(r)||!ArrayUtil.isArray(t))throw new Error("Both a and b must be arrays.");var n=r.length<t.length?1:0;if(t.length<r.length){var a=r;r=t,t=a}for(var e=0,i=r.length;i>e;e++)if(r[e]!==t[e])return-1;return n},ArrayUtil.is2dArray=function(r){return ArrayUtil.isArray(r)&&ArrayUtil.isArray(r[0])},ArrayUtil.getUniqueElementsIn2dArray=function(r){if(!ArrayUtil.isArray(r)||0<r.length&&!ArrayUtil.isArray(r[0]))throw new Error("Must pass an 2d array.");if(r.length<1)return[];for(var t,n,a={},e=[],i=0,o=r.length;o>i;i++){t=r[i];for(var u=0,y=t.length;y>u;u++)a[t[u]]||(a[t[u]]={count:0,value:t[u]}),a[t[u]].count++}for(n in a)a.hasOwnProperty(n)&&a[n]&&1===a[n].count&&e.push(a[n].value);return e},ArrayUtil.map=function(r,t){if(!ArrayUtil.isArray(r))throw new Error("arr must be an array.");if("function"!=typeof t)throw new Error("fn must be a function");for(var n=[],a=0,e=r.length;e>a;a++)n.push(t(r[a],a,r));return n},ArrayUtil.filter=function(r,t){if(!ArrayUtil.isArray(r))throw new Error("arr must be an array.");if("function"!=typeof t)throw new Error("fn must be a function");for(var n=[],a=0,e=r.length;e>a;a++)t(r[a],a,r)&&n.push(r[a]);return n},ArrayUtil.insertionSort=function(r){for(var t,n,a=r.length?r.length-1:0,e=1;a--;){for(n=parseInt(r[e],10),t=e-1;n<+r[t];)r[t+1]=r[t],t--;r[t+1]=n,e++}return r},ArrayUtil.getUniqueNumbers=function(r){if(r.length<1)return r;for(var t={},n=[],a=0,e=r.length;e>a;a++)t[r[a]]||(t[r[a]]=1,n.push(+r[a]));return n},ArrayUtil.getUniqueSortedNumbers=function(r){return ArrayUtil.getUniqueNumbers(ArrayUtil.insertionSort(r))},ArrayUtil.isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};
var BinaryFunction={};BinaryFunction.getArgNameAtIndex=function(n){var r=26,t=97,e="";return n>=r&&(e=Math.floor(n/r),n%=r),String.fromCharCode(t+n)+e},BinaryFunction.getAllArgNames=function(n){for(var r=[],t=0,e=parseInt(n,10);e>t;t++)r.push(BinaryFunction.getArgNameAtIndex(t));return r},BinaryFunction.convertArrayToHashTable=function(n){for(var r={},t=0,e=n.length;e>t;t++)r[n[t]]=1;return r},BinaryFunction.test=function(n,r){var t=27;if(!ArrayUtil.isArray(n)||0<n.length&&isNaN(n[0]))throw new Error("Must pass an array of numbers as the first argument.");if("function"!=typeof r||r.length<1)throw new Error("Must pass a function as second argument.");if(t<r.length)throw new Error("The passed function must have less then "+t+" arguments.");for(var e,i,o=r.length,a=Math.pow(2,o),u=50,c=[],s=BinaryFunction.convertArrayToHashTable(n),f=[],g=0;a>g&&(i=Number(g).toString(2).split(""),f=new Array(o-i.length).concat(i),e=!!r.apply(0,f),expected=!!s[g],expected!=e&&c.push({index:g,expected:expected,output:e}),!(u<c.length));g++);return c},BinaryFunction.formBooleanStringFromBinary=function(n,r){for(var t="",e="",i=0,o=r.length;o>i;i++)switch(i>0&&(e="&"),r.charAt(i)){case"1":""!==t&&(t+=e),t+="("+n[i]+"|0) ";break;case"0":""!==t&&(t+=e),t+="!("+n[i]+"|0) ";break;case"-":break;default:throw new Error("Invalid character `"+r.charAt(i)+"` passed for binary string.")}return"("+t+")"},BinaryFunction.formBooleanFunctionFromBinaryArray=function(n){if(!ArrayUtil.isArray(n)||n.lenght<1)throw new Error("Must pass an non-empty array of binary strings.");for(var r="",t=[],e=BinaryFunction.getAllArgNames(n[0].length),i=0,o=n.length;o>i;i++)t.push(BinaryFunction.formBooleanStringFromBinary(e,n[i]));return r="return "+t.join(" || ")+";",new Function(e.join(", "),r)},BinaryFunction.createBinaryLoop=function(n,r){var t="for (var "+n+" = 0, "+n+"Len = 2; ";return t+=n+" < "+n+"Len; "+n+"++) {",t+="\r\n"+r+"\r\n}"},BinaryFunction.createLoopFunction=function(n,r){var t=parseInt(n,10);for(r=String(r);t>-1;)r=BinaryFunction.createBinaryLoop(BinaryFunction.getArgNameAtIndex(t),r),t--;return new Function("binaryLoopFunction",r)},BinaryFunction.createLoopFunctionCall=function(n,r){return String(n)+"("+BinaryFunction.getAllArgNames(r).join(", ")+");"},BinaryFunction.generateMinterms=function(n,r){if(!n||!r)return[];for(var t=String(r).replace(/\s/g,"").split(/\+/),e=[],i=0,o=t.length;o>i;i++)e=e.concat(BinaryFunction.expandBinaryTerm(BinaryFunction.termToBinaryTerm(n,t[i])));return ArrayUtil.getUniqueSortedNumbers(NumberUtil.binsToDecs(e))},BinaryFunction.doPrimeImpsCoverMinterms=function(n,r,t){return BinaryFunction.generateMinterms(n,r).join(",")===t.join(",")},BinaryFunction.termToBinaryTerm=function(n,r){r=String(r);for(var t,e="",i=-1,o="*",a=0,u=n.length;u>a;a++)t=n[a],i=r.indexOf(t),e+=-1!==i?r[i+1]===o?"0":"1":"-";return e},BinaryFunction.checkForUniqueInputs=function(n,r){r=String(r);for(var t,e=0,i=n.length;i>e;e++)if(t=r.indexOf(n[e]),-1<r.indexOf(n[e],1+t))throw new Error("Invalid term. Make sure the term `"+r+"` contains only one reference to each input.")},BinaryFunction.getBinPair=function(n){if(n=String(n),p=n.indexOf("-"),p>-1){var r=n.substring(0,p),t=n.substring(p+1);return[r+"0"+t,r+"1"+t]}return[n]},BinaryFunction.expandBinaryTerm=function(n){if(-1==n.indexOf("-"))return[n];var r=Math.log(1e5)/Math.log(2);if(r<(n.match(/-/g)||[]).length){var t="Too many unknown inputs for `"+n+"`";throw t+="Reduce the `-` count to "+r,new Error(t)}for(var e=[],i=[n];-1<String(i[0]).indexOf("-");){e=[];for(var o=0,a=i.length;a>o;o++)e=e.concat(BinaryFunction.getBinPair(i[o]));i=e.concat()}return e};
var BinaryGroupTable=function(r,t){if(!ArrayUtil.isArray(r)||0<r.length&&isNaN(r[0]))throw new Error("Must pass an array of numbers");if(isNaN(t)||1>t)throw new Error("Must pass the binary length as a non-zero positive number.");return this.nums=r,this.binaryLength=+t,this};BinaryGroupTable.sortBinaryStringsFunc=function(r,t){return StringUtil.count(r.binString,"1")-StringUtil.count(t.binString,"1")};var bgtp=BinaryGroupTable.prototype;bgtp.expandElements=function(){for(var r,t,n,e,i,s,a=this.numbersToSortedChartElements(),o=1e8,u=0,h="-",l={},m=0;m<a.length;m++){if(u>o)throw new Error("Exceeded loop limit of "+o.toLocaleString());t=a[m],r=1+t.amountOf1s;for(var b=m+1,f=a.length;f>b&&(n=a[b],!(r<n.amountOf1s||n.amountOf1s<t.amountOf1s));b++)r===n.amountOf1s&&(s=StringUtil.replaceOneDiff(t.binString,n.binString,h),s&&(e=t.terms.concat(n.terms),e=ArrayUtil.insertionSort(e),i=e.join(","),l[i]||(l[i]=1,a.push(this.createChartElement(s,e))),t.isUsed=!0,n.isUsed=!0),u++)}return a},bgtp.solve=function(){var r=this.expandElements(),t=ArrayUtil.filter(r,function(r){return!r.isUsed});return t},bgtp.createChartElement=function(r,t){if(!ArrayUtil.isArray(t))throw new Error("terms must be an array");return{binString:String(r),isUsed:!1,terms:t,amountOf1s:StringUtil.count(r,"1")}},bgtp.numbersToChartElements=function(){if(!ArrayUtil.isArray(this.nums))throw new Error("Must be an array");for(var r,t=[],n=0,e=this.nums.length;e>n;n++)r=NumberUtil.decToBin(this.nums[n],this.binaryLength),t.push(this.createChartElement(r,[this.nums[n]]));return t},bgtp.numbersToSortedChartElements=function(){return this.numbersToChartElements().sort(BinaryGroupTable.sortBinaryStringsFunc)};
var CoverageTable=function(){var r=function(){this.looped=0,this.LOOP_MAX=1e4,this.orginalMinterms=[],this.minterms={},this.primeImps=[]},e=r.prototype;return e.setMinterms=function(r){if(!ArrayUtil.isArray(r))throw new Error("minterms must be an array.");return this.orginalMinterms=r.concat(),this.minterms=ArrayUtil.arrayToSet(r),this},e.addPrimeImp=function(r,e){if(!ArrayUtil.isArray(e))throw new Error("minterms must be an array.");return this.primeImps.push({active:!1,binaryStr:r,index:this.primeImps.length,orginalMinterms:e.concat(),minterms:ArrayUtil.getUniqueSortedNumbers(e)}),this},e.getActivePrimeImps=function(){for(var r=[],e=0,t=this.primeImps.length;t>e;e++){var i=this.primeImps[e];i.active&&r.push(i)}return r},e.getRemainingPrimeImps=function(){for(var r=[],e=0,t=this.primeImps.length;t>e;e++){var i=this.primeImps[e];i.minterms.length&&r.push(i)}return r},e.updateMintermsInPrimeImps=function(){for(var r=this.minterms,e=function(e){return r[e]},t=0,i=this.primeImps.length;i>t;t++){var n=this.primeImps[t];n.minterms=ArrayUtil.filter(n.minterms,e)}return this},e.getRedundantPrimeImps=function(){for(var r=[],e=0,t=this.primeImps.length;t>e;e++)for(var i=this.primeImps[e],n=e,s=this.primeImps.length;s>n;n++)if(n!==e){var m=this.primeImps[n];if(!(i.minterms.length<1||m.minterms.length<1)){var h=ArrayUtil.compareSets(i.minterms,m.minterms);1===h&&r.push(e),0===h&&r.push(n)}}return r},e.removePrimeImp=function(r){var e=this.primeImps[r];if(!e)throw new Error("Invalid index("+r+") to prime implicant.");return e.minterms=[],this},e.removeRedundantPrimeImps=function(){for(var r=this.getRedundantPrimeImps(),e=0,t=r.length;t>e;e++)this.removePrimeImp(r[e]);return this},e.getEssentialPrimeImps=function(){for(var r=[],e={used:{}},t=0,i=this.primeImps.length;i>t;t++)for(var n=this.primeImps[t],s=0,m=n.minterms.length;m>s;s++){var h=n.minterms[s];e[h]=e[h]||{length:0,pIndex:t},e[h].length++}for(var p in e){var o=e[p];1!==o.length||e.used[o.pIndex]||(e.used[o.pIndex]=1,r.push(o.pIndex))}return r},e.isDone=function(){for(var r in this.minterms)return!1;return!0},e.usePrimeImp=function(r){var e=this.primeImps[r];if(!e)throw new Error("Invalid index("+r+") to prime implicant.");e.active=!0;for(var t=0,i=e.minterms.length;i>t;t++){var n=e.minterms[t];delete this.minterms[n]}return this.removePrimeImp(r),this},e.usePrimeImps=function(r){if(!ArrayUtil.isArray(r))throw new Error("pIndexes must be an array.");for(var e=0,t=r.length;t>e;e++)this.usePrimeImp(r[e]);return this},e.getIsolatedMinterms=function(){for(var r,e,t={},i=[],n=0,s=this.primeImps.length;s>n;n++){r=this.primeImps[n];for(var m=0,h=r.minterms.length;h>m;m++)e=r.minterms[m],t[e]=1}for(var p in this.minterms)t[p]||i.push(p);return i},e.checkIfSolvable=function(){if(0===this.primeImps.length)throw new Error("At least one prime implicant must be added.");var r=this.getIsolatedMinterms();if(r&&0<r.length){var e="Unable to find prime implicants to cover the minterm(s); ";throw new Error(e+r.join(","))}},e.isLoopUnderMax=function(){return this.looped<this.LOOP_MAX},e.foundAnswer=function(){return this.isDone()&&this.isLoopUnderMax()},e.getNextMinterm=function(){for(var r in this.minterms)return r;return null},e.getBestPrimeImpForMinterm=function(r){for(var e={length:0,pIndex:-1},t=0,i=this.primeImps.length;i>t;t++){p=this.primeImps[t];for(var n=0,s=p.minterms.length;s>n;n++)if(p.minterms[n]===r){e.length<s&&(e.length=s,p.pIndex=t);break}}return e.pIndex},e.solve=function(){for(this.checkIfSolvable();!this.isDone()&&this.looped<this.LOOP_MAX;){this.updateMintermsInPrimeImps(),this.removeRedundantPrimeImps();var r=this.getEssentialPrimeImps();if(r&&0<r.length)this.usePrimeImps(r);else{var e=this.getNextMinterm(),t=this.getBestPrimeImpForMinterm(e);this.usePrimeImp(t)}this.looped++}return this},r}();
var NumberUtil={};NumberUtil.binsToDecs=function(r){if(!ArrayUtil.isArray(r))throw new Error("Must pass an array.");for(var t=[],n=0,e=r.length;e>n;n++)t.push(parseInt(r[n],2));return t},NumberUtil.decsToBins=function(r,t,n){r=n?ArrayUtil.getUniqueNumbers(r):r,t=t||Math.max.apply(Math,r).toString(2).length;for(var e=[],i=r.length;i--;)e[i]=NumberUtil.decToBin(r[i],t);return e},NumberUtil.decToBin=function(r,t){var n=Number(r).toString(2);return t=t||n.length,n.length<t&&(n=StringUtil.copy("0",t-n.length)+n),n};
var Petrick=function(){this.poss=[]};Petrick.prototype.setPOSs=function(t){if(0<ArrayUtil.getUniqueElementsIn2dArray(t).length)throw new Error("Must pass a 2d array with no unique values.");if(t.length<2)throw new Error("The 2d array must have a length of 2 or greater.");this.poss=t},Petrick.prototype.getSOPs=function(){if(!ArrayUtil.isArray(this.poss)||this.poss.length<1)throw new Error("POS must be set before calling this function.");var t=this.poss,r=new SimpleSet;return r.addElements([].concat(t[0],t[1])),r.toArray()};
var SimpleSet=function(){this.arr=[],this.indexTable={}};SimpleSet.prototype.hasElement=function(t){return"undefined"!=typeof this.indexTable[t]},SimpleSet.prototype.size=function(){return this.arr.length},SimpleSet.prototype.addElement=function(t){return"undefined"==typeof this.indexTable[t]&&(this.indexTable[t]=this.arr.length,this.arr.push(t)),this},SimpleSet.prototype.addElements=function(t){if(!ArrayUtil.isArray(t))throw new Error("Must pass an array");for(var e=0,r=t.length;r>e;e++)this.addElement(t[e]);return this},SimpleSet.prototype.toArray=function(){return this.arr};
var StringUtil={};StringUtil.replaceCharAtIndex=function(r,t,n){t=ArrayUtil.isArray(t)?t:[t];for(var i,e=t.length;e--;)i=new RegExp("^(.{"+t[e]+"})(.)"),r=r.replace(i,"$1"+n);return r},StringUtil.indexesOf=function(r,t){if(r=String(r),t=String(t),String(r).length<1||String(t).length<1)return[];var n=[],i=-1;for(i=r.indexOf(t,i+1);i>-1;)n.push(i),i=r.indexOf(t,i+1);return n},StringUtil.sharedIndexesOf=function(r,t,n){if(r=String(r),t=String(t),r.length!=t.length)return[];for(var i=[],e=0,g=r.length;g>e;e++)if(r[e]===t[e]&&r[e]===n)i.push(e);else if(r[e]===n||t[e]===n)return[];return i},StringUtil.replaceOneDiff=function(r,t,n){if(r=String(r),t=String(t),r.length!=t.length)return"";for(var i=0,e="",g=0,f=r.length;f>g;g++){if(r[g]!==t[g]){if(n==r.charAt(g)||n==t.charAt(g))return"";i++,e+=n}else e+=r[g];if(i>1)return""}return 1!=i?"":e},StringUtil.getUniqueSortedNumberString=function(r,t){return ArrayUtil.getUniqueSortedNumbers(r.split(t)).join(t)},StringUtil.copy=function(r,t){t=t>0?t:1;for(var n="";0<t--;)n+=r;return n},StringUtil.splitToObject=function(r,t,n){for(var i={},e=r.split(t||","),g=e.length;g--;)i[e[g]]="function"==typeof n?n():n||1;return i},StringUtil.count=function(r,t){if(r=String(r),t=String(t),r.length<1||t.length<1)return 0;var n=0,i=-1;for(i=r.indexOf(t,i+1);i>-1;)n++,i=r.indexOf(t,i+1);return n};
var qm={VERSION:"0.9.6 beta",func:{}};qm.func.checkFormatOfUserInput=function(e){e.dontNeeds=e.dontNeeds||"";var t="",n=function(e){return"string"!=typeof e.dontNeeds||"string"!=typeof e.minterms||"string"!=typeof e.inputs?"\nInput, minterms and dontNeeds properties must be a string.":""},r=function(e){return/[^\d,]/.test(e.minterms)||e.dontNeeds.length&&/[^\d,]/.test(e.dontNeeds)?"The minterms property must be a string of numbers separated by columns.":""},s=function(e){var t="\nNeed more input variables to satisfy: max value in midterm or dontNeeds < 2^(number of input variables).",n=e.dontNeeds+","+e.minterms,r=Math.max.apply(Math,n.split(",")),s=e.inputs.split(",").length;return Math.pow(2,s)<r?t:""};return t=n(e),t+=s(e),t+=r(e)},qm.func.checkInputThenStart=function(e){var t=qm.func.checkFormatOfUserInput(e);if(t)throw new Error(t)},qm.func.getPrimeImplicantsFromMinterms=function(e,t){var n=new BinaryGroupTable(e,t),r=ArrayUtil.map(n.solve(),function(e){return{minterms:e.terms,value:e.binString}});return r},qm.func.getMatchLenAfterAppendPIToMT=function(e,t,n){for(var r=0,s=t.split(","),i=s.length,a={};i--;)a=n[s[i]],a&&(a.PIsKeys[e]||(a.PIs.push(e),a.PIsKeys[e]=1),r++);return r},qm.func.getLeastPrimeImplicantsByGraph=function(e,t){var n,r,s,i,a=e.split(","),m=[],o=new CoverageTable;for(o.setMinterms(a),n=0,r=t.length;r>n;n++)s=t[n],o.addPrimeImp(s.value,s.minterms);if(o.solve(),!o.foundAnswer())throw new Error("Unable to find an answer.");for(i=o.getActivePrimeImps(),n=0,r=i.length;r>n;n++)s=i[n],m.push({minterms:s.orginalMinterms.join(","),value:s.binaryStr});return m},qm.func.convertLeastPIToAlgebra=function(e,t){if(1===t.length&&/^-+$/.test(t[0].value))return[[!0],[t[0].value]];for(var n,r,s=t.length,i=e.split(","),a=i.length,m="",o={0:[],1:[]};s--;){for(m="",r=t[s].value,n=0;a>n;)m+="1"===r[n]?i[n]:"0"===r[n]?i[n]+"*":"",n++;o[0].push(m),o[1].push(r)}return o},qm.func.getLeastPI=function(e){qm.func.checkInputThenStart(e);var t,n,r=e.dontNeeds?e.minterms+","+e.dontNeeds:e.minterms;return t=qm.func.getPrimeImplicantsFromMinterms(r.split(","),e.inputs.split(",").length),n=qm.func.getLeastPrimeImplicantsByGraph(e.minterms,t),qm.func.convertLeastPIToAlgebra(e.inputs,n)},qm.getLeastPrimeImplicants=function(e,t){var n={booleanAlgebra:0,raw:1};type=t in n?t:"booleanAlgebra";var r=n[type];return qm.func.getLeastPI(e)[r].join(" + ")},qm.simplify=function(e,t){if(!ArrayUtil.isArray(e))throw new Error("inputs must be an array of strings");if("string"!=typeof t)throw new Error("The expression must be a string");var n={};return n.inputs=e.join(","),n.minterms=BinaryFunction.generateMinterms(e,t).join(","),qm.getLeastPrimeImplicants(n)};