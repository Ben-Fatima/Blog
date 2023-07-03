import {User} from '../Models/User.js';
import Joi from 'joi';
import bcrypt from "bcrypt";


// Validation schema
const userSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    bio: Joi.string().min(3).max(500).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export class UserController {

    /**
     * Get all users.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async getUsers(req, res) {
        try {
            const users = await User.getUsers()
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(users))
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end(`An error occurred while trying to all users`)
        }
    }

    /**
     * Get a user with a specific id.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async getUser(req, res) {
        try {
            const user = await User.getUserById(req.params.id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end(`An error occurred while trying to get the user of id: ${req.params.id}`)
        }
    }

    /**
     * Add a new user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async addUser(req, res) {
        const validationResult = userSchema.validate(req.body)
        if (validationResult.error) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end('Invalid user data')
            return
        }

        try {
            const newUser = new User(req.body)
            await newUser.addUser()
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newUser))
        } catch (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end('An error occurred while creating the user: ' + err.message)
        }
    }

    /**
     * Update a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async updateUser(req, res) {
        try {
            const user = await User.getUserById(req.params.id)
            Object.assign(user, req.body)
            await user.update()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('An error occurred')
        }
    }

    /**
     * Get posts of a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async getUserPosts(req, res) {
        try {
            const user = await User.getUserById(req.params.id)
            const posts = await user.getAllPosts()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(posts))
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('An error occurred')
        }
    }

    /**
     * Login a user.
     *
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     */
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.getUserByEmail(email)
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                res.writeHead(400, { 'Content-Type': 'text/plain' })
                res.end('Invalid email or password')
                return;
            }
            user.password = undefined
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('An error occurred')
        }
    }
}
