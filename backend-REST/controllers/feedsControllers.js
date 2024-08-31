const Post = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
exports.getPosts= (req,res,next)=>{
    console.log(req.userId)
    Post.find()
    .then(result=>{console.log(result)
       res.json({posts:result}) 
    })
    .catch(err=>{console.log(err)})
    
}

exports.getOnePost = (req,res,next)=>{
    console.log(req.params.id)
    Post.findById(req.params.id)
    .then(post=>{
        res.json({post:post})
    })
    .catch(err=>{console.log(err)})
}
exports.postPost = (req,res,next)=>{
   console.log(req.body)
    const title = req.body.title
    const content = req.body.content
    if (!req.file) {
        console.log( 'No file uploaded or invalid file type' );
    }
    const userId = req.userId
    const imageUrl = req.file.path.replace("\\" ,"/");
    const post = new Post({
        title:title,
        imageUrl: imageUrl,
        content:content,
        creator:userId
    })
    let creator;
    post.save().then(result=>{
        return User.findById(userId)
        
    }).then(user=>{
        creator = user
        user.posts.push(post);
        
        return user.save()
    }).then(result=>{
        console.log(creator)
        res.status(201).json({
            message:'Post Created',
            post:result,
            creator:{_id:creator._id,name:creator.name}
    })
    }).catch(err=>{console.log(err)})
    
}
exports.updatePost = (req,res,next)=>{
    const postId = req.params.postId
    const title = req.body.title
    const content = req.body.content
    let imageUrl = req.body.image
    if (req.file){
        imageUrl = req.file.path.replace("\\" ,"/");
    }
    
    Post.findById(postId).then(post=>{
        if (!post){
            return res.status(404).json({message:'Post not found'})
        }

        post.title = title
        post.content = content
        post.imageUrl = imageUrl
        return post.save()
    }).then(result=>{
        res.status(201).json({message:'Succsfuly edited',post:result})
    })
}
exports.deletePost = (req,res,next)=>{
    const postId = req.params.postId
    Post.deleteOne({_id: postId}).then(result=>{
        res.status(201).json({message:'Succsfuly deleted'})
    }).catch(err=>{console.log(err)});

}
const clearImages = filePath=>{
    fileP = path.join(__dirname,'..',filePath)
    fs.unlink(fileP)
}