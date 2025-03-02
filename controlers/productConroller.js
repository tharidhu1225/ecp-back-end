import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){


    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function getProducts(req,res){
  Product.find({}).then((products)=>{
    res.json(products)
  })  
}

export function deleteProduct(req,res){
   

    const productId = req.params.productId

    Product.deleteOne(
        {productId : productId}
    ).then(()=>{
        res.json({
            message : "Product deleted"
        })
    }).catch(()=>{
        res.json({
            message : "Product not deleted"
        })
    })
}

export function updateProduct(req,res){
   
    const productId = req.params.productId
    const newProductData = req.body

    Product.updateOne(
        {productId : productId},
        newProductData
    ).then(()=>{
        res.json({
            message: "Product updated"
        })
    }).catch((error)=>{
        res.json({
            message: error
        })
    })
}

export async function getProductById(req,res){
    
    try{
        const productId = req.params.productId

       const product = await Product.findOne({productId : productId})

        res.json(product)
    }catch(e){
        res.status(500).json({
            e
        })
    }
}

export default async function searchProducts(req,res){
    const query = req.params.query
    try{
        const products = await Product.find({
            $or:[
                {productName : {$regex : query, $options : "i"},},
                { altNames: { $elemMatch :{ $regex: query, $options: "i" } }},
            ]
            
        });

    res.json(products)
    }catch(e){
        res.status(500).json({
            e
        })
    }

    
}