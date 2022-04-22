const router = require('express').Router()
const Category = require('../models/Category')

//CREATE
router.post('/', async (req, res)=> { 
     try{
          const newCat = new Category(req.body)
          const category = await newCat.save()

          res.status(200).json(category)
     }catch(err){
          res.status(500).json(err)
     }
})

//GET
router.get('/', async (req, res)=> { 
     try{
         
          const category = await Category.find()

          res.status(200).json(category)
     }catch(err){
          res.status(500).json(err)
     }
})

module.exports = router