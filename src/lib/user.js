const User = require('../models/users');

export function createUser({firstname, lastname, password, username, phone, job, country, privacyCheck, company, gender, county, avater}){
    return new Promise((resolve, reject) => {
        let result;

        let newUser = new User({
            firstname: firstname,
            password: password,
            lastname: lastname,
            username: username,
            phone: phone,
            job: job,
            country: country,
            privacyCheck: privacyCheck,
            company: company,
            gender: gender,
            county: county,
            avater: avater
        });
    
        User.getUserByUsername(username, async function(err, user){
            if(err){
                throw new Error(err.message)
            }
            if(user){
                resolve({code: 500, user: null})
            } else {
                User.createUser(newUser, function(err, user){
                    if(err){
                        throw new Error(err.message)
                    }
                    if(user){
                        resolve({user: user, code: 200})
                    }
                })
            }
        });
    
    })
}

export async function findUser({ username, password}){
    return new Promise((resolve, reject) => {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
    
            if(user){
                console.log(password.split(""))
                User.comparePassword(password, user.password, function(err, isMatch){
                    if(err) throw err;

                    if(isMatch){
                        resolve ({user: true, data: user})
                    } else {
                        resolve ({user: false})
                    }
                })
            } else {
                resolve ({user: false});
            }
        })
    })
}

export async function findUserByUsername({username}){
    return new Promise((resolve, reject) => {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;

            if(user){
                resolve({user: user});
            } else {
                resolve({user: null})
            }
        })
    })
}

export async function getAllUsers(){
    return new Promise((resolve, reject) => {
        User.getAllUsers(function(err, users){
            if(err) throw err;

            if(users){
                resolve({users: users.length})
            }
        })
    })
}