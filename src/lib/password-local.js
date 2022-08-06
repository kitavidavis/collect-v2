import Local from 'passport-local';
import { findUser } from './user';

export const localStrategy = new Local.Strategy( async function(username, password, done){
    await findUser({username, password}).then((user) => {
        if(user.user){
            done(null, user)
        } else {
            done(new Error('Invalid username or password'))
        }
    }).catch((error) => {
        done(error);
    })
})