const Post = require('../models/post');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {
    // POSTS /index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    // POSTS /new
    postNew(req, res, next) {
        res.render('posts/new');
    },
    // POSTS /create
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for(const file of req.files){
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    // POSTS /show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    // POSTS /edit
    async postEdit(req, res, next)     {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
     // POSTS /update
     async postUpdate(req, res, next)     {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
     // POSTS /delete
     async postDestroy(req, res, next)     {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }
}