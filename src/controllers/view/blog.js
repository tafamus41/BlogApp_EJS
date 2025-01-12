"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Blog = require('../../models/blog');
const Category = require('../../models/category');
const removeQueryParam = require("../../helpers/removeQueryParam");

module.exports = {

    list: async (req, res) => {
       
        const datas = await res.getModelList(Blog, {isPublished: true}, [
                    
                    { path: 'userId', select: 'username' },
                    { path: 'categoryId', select: 'name' }
                ])
                const categories = await Category.find({})
          
                const details = await res.getModelListDetails(Blog, { isPublished: true })
            
                let pageUrl = '';
                const queryString = req.originalUrl.split("?")[1]
            
                if (queryString) {
                  pageUrl = removeQueryParam(queryString, "page")
                }
            
                pageUrl = pageUrl ? "&" + pageUrl : "";
            
            
            
                res.render('index', { categories, datas, details, pageUrl, })
              },
            

    // CRUD:
    create: async (req, res) => {
       

        const data = await Blog.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
       

        const data = await Blog.findOne({ _id: req.params.id }).populate([
            
            { path: 'brandId', select: 'name' }
        ]);

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        
        const data = await Blog.updateOne({ _id: req.params.id }, req.body, { runValidators: true })


        res.status(202).send({
            error: false,
            data,
            new: await Blog.findOne({ _id: req.params.id })
        })
    },

    deleteBlog: async (req, res) => {
       
        const data = await Blog.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        })
    },

   
}