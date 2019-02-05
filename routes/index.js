const express = require('express'),
      router = express.Router();

//GET routes
//index/home page
router.get('/',(req,res) => {
  res.render('index');
});



//SHOW by type
router.get('/:type',(req,res) => {
  const type = req.params.type;
  Pokemon.find({ type: type },(err,pokemon) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('types', {pokemon: pokemon});
    }
  });
});



module.exports = router;