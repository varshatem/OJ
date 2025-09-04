const fs = require('fs');
const {User ,Submission,Team ,Problem,ProblemSample,Event} = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ...existing code...
exports.registerAdmin = async(req,res) =>{
    try{
        console.log("Received body:", req.body);

        const { username, email, password } = req.body;

        // Check if all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Pass salt rounds as the second argument
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await User.create({
            username,
            email,
            password: hashedPassword,
            is_junior: false,
            role: 'admin'
        });
        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });

    }
    catch(error){
        console.error("Error registering admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// ...existing code...

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json("User Not Found");
        }
        const ValidPassword = await bcrypt.compare(password, user.password);

        if (!ValidPassword) {
            return res.status(400).json("Invalid Password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                is_junior: user.is_junior,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,    // Prevents JavaScript access
            secure: true, // Secure only in production
            sameSite: "None", // Helps prevent CSRF attacks
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        res
            .status(400)
            .json({ error: "Error logging in User", details: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                "id",
                "username",
                "email",
                "is_junior",
                "role",
                "created_at",
                "event_id",
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error fetching users", details: error.message });
    }
}
exports.getAllTeams = async (req, res) => {
    try {

        const teams = await Team.findAll({
            attributes: [
                "id",
                "team_name",
                "user1_id",
                "user2_id",
                "event_id",
                "is_junior",
                "score",
                "correct_submission",
                "wrong_submission",
                "submission_time",
            ],
            include: [
                {
                    model: User,
                    as: 'Users',
                    attributes: ['id', 'username', 'email']
                }
            ],
            include: [
                {
                    model: Event,
                    as: 'Event',
                    attributes: ['id', 'name']
                }
            ]
            
        });
        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ error: "Error fetching teams", details: error.message });
    }
}
exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.findAll({
            attributes: [
                "id",
                "title",
                "is_junior",
                "event_id",
                "created_at",
                "test_case_path",
            ],
        });
        res.status(200).json({ problems });
    } catch (error) {
        res.status(500).json({ error: "Error fetching problems", details: error.message });
    }
}


exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.findAll({
            include: [
                {
                    model: Problem,
                    as: 'Problem',
                    attributes: ['title']
                },
                {
                    model: Team,
                    as: 'Team',
                    attributes: ['team_name']
                }
            ],
            attributes: ['id', 'team_id', 'problem_id', 'result',  'submitted_at', 'code','language']
        });
        res.status(200).json({ submissions });
    } catch (error) {
        res.status(500).json({ error: "Error fetching submissions", details: error.message });
    }
}






