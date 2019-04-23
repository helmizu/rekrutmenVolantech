var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const library = ['pro', 'gram', 'merit', 'program', 'it', 'programmer']
  const key = `${req.body.word}`
  let match = '' 
  console.log(key)
  library.forEach((word, index) => {
    // console.log(word)
    if(key.includes(word)){
      match+=word
      if (index !== library.length-1) {
        match+=", "
      }
    }
  })
  res.status(200).json({output : match})
});


router.post('/cek', function(req, res, next) {
  const library = ['pro', 'gram', 'merit', 'program', 'it', 'programmer']
  const key = `${req.body.word}`
  let match = '' 
  let length = 0;
  console.log(key)
  
  library.forEach((word, index) => {
    if(key.length > length) {
    // console.log(word)
      if(key.slice(length).includes(word)){        
        console.log(key.slice(length))
        match+=word
        length+=word.length
        if (index !== library.length-1) {
          match+=", "
        }
      }
    } else {
      length = 0
      match+="\n"
      if(key.slice(length).includes(word)){      
        console.log(key.slice(length))  
        match+=word
        length+=word.length
        if (index !== library.length-1) {
          match+=", "
        }
      }
    }
  })
  res.status(200).send(match)
});

module.exports = router;
