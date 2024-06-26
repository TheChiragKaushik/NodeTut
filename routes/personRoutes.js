const express = require('express');
const router = express.Router();

const Person = require('.././models/person');


//create
router.post('/', async (req, res) => {

    try {
      const data = req.body;
  
      const newPerson = new Person(data);
  
      const savedPerson = await newPerson.save();
  
      console.log('data saved');
  
      res.status(200).json(savedPerson);
  
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//fetch
  router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
  
      res.status(200).json(data);
  
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// fetch deeper
  router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType;
  
      if (workType == 'chef' || workType == 'manager' || workType == 'waiter')
      {
        const response = await Person.find({work: workType});
        console.log('Person fetched by type of employment');
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
// update
  router.put('/:id', async (req, res) => {
    try
    {
        const personID = req.params.id;

        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personID, updatedData, {
            new: true,
            runValidators: true
        });

        if(!response)
        {
            return res.status(404).json({error: 'Person not found!'});
        }

        console.log('Data Updated!');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log('Internal Server Error!');
        res.status(500).json({ error: 'Internal server error!' });
    }
  });


  // delete
  router.delete('/:id', async (req, res) => {
    try
    {
        const personID = req.params.id;

        const response = await Person.findByIdAndUpdate(personID);

        if(!response)
        {
            return res.status(404).json({error: 'Person not found!'});
        }

        console.log('Data Deleted!');
        res.status(200).json({message: 'Person deleted successfully!'});
    }
    catch(err)
    {
        console.log('Internal Server Error!');
        res.status(500).json({ error: 'Internal server error!' });
    }
  });

  module.exports = router;
  