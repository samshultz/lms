import User from '../models/users.js';
import sanitizeHtml from 'sanitize-html'

/**
 * Get all users
 * @param req
 * @returns void
*/

export function getUsers(req, res){
    User.find().sort('-dateAdded').exec((err, users) => {
        if (err) {
            res.status(500).send(err)
        }
        res.json({ users });
    })
}



/**
 * Save a User
 * @param req
 * @param res
 * @returns void

*/
export function addUser(req, res){
    if(
        !req.body.user.firstName || 
        !req.body.user.lastName || 
        !req.body.user.username ||
        !req.body.user.password ||
        !req.body.user.gender ) {
        return res.status(403).end();
    }

    const newUser = new User(req.body.user);
    // Let's sanitize inputs
    newUser.username = sanitizeHtml(newUser.username);
    newUser.firstName = sanitizeHtml(newUser.firstName);
    newUser.lastName = sanitizeHtml(newUser.lastName)
    newUser.email = sanitizeHtml(newUser.email)
    newUser.phone = sanitizeHtml(newUser.phone)
    newUser.address = sanitizeHtml(newUser.address)

    newUser.save((err, saved) => {
        if (err){
            return res.status(500).send(err);
        }
        return res.json({ user: saved })
    })

}

/**
 * Get a single user
 * @params req
 * @param res
 * @returns void
*/
export async function getUser(req, res){
    let user = await User.findById(req.user.user_id)
    return res.status(200).json(user)
    
}

/**
 * Delete a User
 * @params req
 * @params res
 * @returns void
*/

export function deleteUser(req, res){
    User.findOne({ _id: req.params.cuid }).exec((err, user)=> {
        if (err) {
            res.status(500).send(err)
        }
        user.remove(() => {
            res.status(200).end()
        })
    })
}