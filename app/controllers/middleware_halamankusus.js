
class middleware_halamankusus {

    static async getview(req, res){

        const get_role_user = req.user.role;

        res.render('halamankusus/hal_khususAdmin', {user:req.user}); // mengrim role user
    }
}

module.exports = middleware_halamankusus;