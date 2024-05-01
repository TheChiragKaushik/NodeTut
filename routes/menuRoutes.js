const express = require('express');
const router = express.Router();

const Menu = require('.././models/menu');

router.post('/', async (req, res) => {

    try {
      const data = req.body;
  
      const newMenu = new Menu(data);
  
      const savedMenu = await newMenu.save();
  
      console.log('Menu saved');
  
      res.status(200).json(savedMenu);
  
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const data = await Menu.find();
      console.log('Menu fetched');
  
      res.status(200).json(data);
  
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:tasteType', async (req, res) => {
    try {
      const tasteType = req.params.tasteType;
  
      if (tasteType == 'sour' || tasteType == 'sweet' || tasteType == 'spicy')
      {
        const response = await Menu.find({taste: tasteType});
        console.log('Menu fetched by type of employment');
        res.status(200).json(response);
      }
      else
      {
        res.status(404).json({error: 'Invalid Work Type'});
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
  });

  module.exports = router;