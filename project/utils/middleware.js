exports.isAuth = (req,res,next) => {
    if (req.isAuthenticated()) {
        return next();
    }
     res.redirect('/user/login');
};


exports.isMember = (req,res,next) => {
    if (req.user.role === 'user') {
        return res.redirect('/user/member');
    }
    next();
};

exports.isAdmin = (req,res,next) => {
    if (req.user.role === 'admin') {
        return next();
    }
    res.redirect('/user/member');
};