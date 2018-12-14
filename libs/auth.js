

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.json({
        status: 403,
        data: {
            m: "Access Denied",
            e: req.query.e,
            user: req.user
        }
    });
}

const isLoggingOut = (req, res, next) => {
    req.session.destroy( (err) => {
        return next();
    });
}

module.exports = {
    isLoggedIn,
    isLoggingOut
};

