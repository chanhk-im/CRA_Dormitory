var Post = require("../models/post");
var User = require("../models/user");

var crypto = require("crypto");

module.exports = function(app) {
    // Get all posts
    app.get("/api/posts", function(req, res) {
        Post.find()
        .sort({published_date: -1})
        .exec(function(err, posts) {
            if (err) return res.status(500).send({ error: "database failure" });
            res.json(posts);
        })
    })

    // Get single post
    app.get("/api/posts/:post_id", function(req, res) {
        Post.findOne({ _id: req.params.post_id }, function(err, post) {
            if (err) return res.status(500).send({ error: err });
            if (!post) return res.status(404).json({ error: "post not found" });

            res.json(post);
        })
    })

    // Get post by post type
    app.get("/api/posts/type/:type", function (req, res) {
        Post.findOne({ type: req.params.type })
            .sort({ published_date: -1 })
            .exec(function (err, posts) {
                if (err) return res.status(500).send({ error: "database failure" });
                res.json(posts);
            })
    })

    // Get post by author
    app.get("/api/posts/author/:author", function(req, res) {
        Post.findOne({ author: req.params.author }, function(err, posts) {
            if (err) return res.status(500).send({ error: err });
            if (posts.length === 0) return res.status(404).send({ error: "post not found" });

            res.json(posts);
        })
    })

    // Create post
    app.post("/api/posts", function(req, res) {
        var post = new Post();
        post.type = req.body.type;
        post.title = req.body.title;
        post.author = req.body.author;
        post.post = req.body.post;
        post.published_date = new Date(req.body.published_date);

        post.save(function(err) {
            if (err) {
                console.error(err);
                res.json({ result: 0 });
                return;
            }

            res.json({ result: 1 });
        });
    });

    // Update a post
    app.put("/api/posts/:post_id", function(req, res) {
        Post.update({ _id: req.params.post_id }, { $set: req.body }, function(err, output) {
            if (err) return res.status(500).json({ error: "database failure" });
            console.log(output);

            if (!output.n) return res.status(404).json({ error: "post not found" });

            res.json({ message: "post updated" });
        })
    });

    // Delets a post
    app.delete("/api/posts/:post_id", function(req, res) {
        Post.remove({ _id: req.params.post_id }, function(err) {
            if (err) return res.status(500).json({ error: "database failure" });

            res.status(204).end;
        })
    })

	app.post("/api/users/signup", function(req, res) {
		User.find({ id: req.body.id })
			.exec()
			.then(user => {
				if (user.length >= 1) {
					res.json({ result: "id is exist" });
				} else {
					const user = new User({
						id: req.body.id,
						password: crypto.createHash('sha512').update(req.body.password).digest('base64'),
						email: req.body.email,
                        name: req.body.name,
                        rc: req.body.rc,
					});
					user.save(function(err) {
						if (err) {
							console.error(err);
							res.json({ result: 0 });
							return;
						}

						res.json({ result: 1 });
					});
				}
			});
	});

	app.post("/api/users/login", function(req, res) {
		User.findOne({ id: req.body.id }, function(err, user) {
			if (err) return res.status(500).json({ error: "database failure" });
			if (!user) return res.status(404).json({ error: "this id is not exist" });

			if (user.password === crypto.createHash('sha512').update(req.body.password).digest('base64'))
				res.json(user);
			else
				return res.json({ error: "password is wrong" });
		});
	});

}
