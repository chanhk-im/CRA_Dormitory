var passport		= require("passport");
var LocalStrategy	= require("passport-local").Strategy;
var User			= require("./models/user");

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	passport.use(new LocalStrategy({
		usernameField: "id",
		passwordField: "password",
		session: true,
		passReqToCallback: false,
	}, (id, password, done) => {
		User.findOne({ id: id }, (findError, user) => {
			if (findError) return done(findError);
			if (!user) return done(null, false, { message: "id is not exist" });
			return user.comparePassword(password, (passError, isMatch) => {
				if (isMatch) {
					return done(null, user);
				}
				return done(null, false, { message: "password is wrong" });
			});
		});
	}));
}
