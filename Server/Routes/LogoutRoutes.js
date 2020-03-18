
module.exports = (app, db) => {
    app.get('/logout', function(req, res){
        cookie = req.cookies;
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }    
            res.cookie(prop, '', {expires: new Date(0)});
        }
        res.send('logout successfully');

        //res.send('Done')
        //return res.redirect(`/SignIn`);
    });
}