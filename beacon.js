(function( window ) {

/* $.toJSON extension */
(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return $.quoteString(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=$.toJSON(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){return eval('('+src+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};})(jQuery);

window.clog = function() { if ( window.console && window.console.log ) { window.console.log( arguments ); } };
if ( typeof window.csADS != 'undefined' ) { return false; }

( window.csADS = function( options ) {
	return new window.csADS.fn.init( options );
}).fn = prototype = {
	
	init : function( options ) {
	},
	
	setupMessage : function() {
		/* create some listeners for the parent page */
		if ( window.attachEvent ) {
			window.attachEvent( 'onmessage', this.message );
		} else if ( window.addEventListener ) {
			window.addEventListener( 'message', this.message, false );
		}
	},
	
	message : function( event ) {
		if ( event && event.data && typeof event.data === 'string' && event.data.indexOf( 'csADS' ) != -1 ) {
			var data	= $.parseJSON( event.data ) || null;
			
			if ( data ) {
				var fn		= typeof data.fn != 'undefined' ? data.fn : null,
					HTML	= typeof data.HTML != 'undefined' ? data.HTML : '';
				
				/* run any supplied instructions from iframe */
				if ( fn ) {
					eval( '(' + decodeURI( fn ) + ')();' );
				}
			}
		}
	}
};
window.csADS.fn.init.prototype = window.csADS.fn;
/* setup postMessage */
window.csADS().setupMessage();

})( window );
