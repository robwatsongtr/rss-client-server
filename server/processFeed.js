let Parser = require('rss-parser');
const util = require('util')
let parser = new Parser({
  customFields: {
    // includes article icon url field. Also renames field form first 
    // entry in array to second.  
    item: [ 
      ['media:content', 'mediaLink'] 
    ]
  }
});

(async () => {

  let feed = await parser.parseURL('https://theappeal.org/feed/theappeal/')
  console.log( util.inspect( feed,{showHidden: false, depth: null, colors: true} ) );

})();