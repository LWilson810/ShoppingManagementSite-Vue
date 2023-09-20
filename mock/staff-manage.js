
export default [
    {
        url:'/api/users/addNewStaff',
        type:'post',
        response: config => {
            console.log(config.body)
            const error = {}
            UnsignedUser.findOne({email: config.body.email})
            .then(user => {
                if(user) {
                    error.text = "Email address already exists."
                    // return res.status(403).json(error);
                    return {
                        code: 403,
                        error: error,
                    }
                } else {
                    var data = config.body;
                    data['name'] = config.body.first_name + " " + config.body.second_name;
                    delete data['first_name'];
                    delete data['second_name'];
                    const newUser = new UnsignedUser(data);
                    newUser.save().then(user => {
                        return {
                            code:200,
                            message:'New User Registered.',
                            data:{}
                        }
                        // res.json({ message:'New User Registered.', data:{}});
                    })
                }
            })
        }
    }
]