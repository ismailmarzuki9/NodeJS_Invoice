
class middleware_halamankusus {

    static async getview(req, res){

        const get_role_user = req.user.role;

        const response = await fetch("https://date.nager.at/api/v3/2026/ID");

        const data = await response.json();

        console.log(data);

        res.render('halamankusus/hal_khususAdmin', {user:req.user}); // mengrim role user
    }
}

module.exports = middleware_halamankusus;