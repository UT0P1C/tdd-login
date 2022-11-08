const { User } = require("../models");


class SessionController{
	async store(req, res){

		const {email, password} = req.body;

		const user = await User.findOne({ where: { email } });

		if(!user || !(await user.checkPassword(password))){

			return res.status(401).send({message: "Invalid user or password"});

		}


		return res.json({user});
	}
}

module.exports = new SessionController();