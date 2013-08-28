/**
 * DefaultController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var fs = require('fs');
module.exports = {

  
  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /default/index
   */ 
  index: function (req,res) 
  {
    fs.readFile('../../assets/index.html', function (err, data) 
    {
        if (err) throw err;
        res.send(data);
    });

  }
};
