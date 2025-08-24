// // const { DataTypes } = require('sequelize');
// // const  sequelize  = require('../config/database');
// // const Team = require('./Team');
// // const Problem = require('./Problem');
// // const Event = require('./Event'); // Add at the top


// // const Submission = sequelize.define('Submission', {
// //     id: {
// //         type: DataTypes.INTEGER,
// //         autoIncrement: true,
// //         primaryKey: true
// //     },
// //     team_id: {
// //         type: DataTypes.INTEGER,
// //         allowNull: false,
// //     },
// //     problem_id: {
// //         type: DataTypes.INTEGER,
// //         allowNull: false,
// //         references: {
// //             model: Problem,
// //             key: 'id'
// //         }
// //     },
// //     event_id: {
// //         type: DataTypes.INTEGER,
// //         allowNull: false,
// //         references: {
// //             model: Event,
// //             key: 'id'
// //         }
// //     },
// //     code: {
// //         type: DataTypes.TEXT,
// //         allowNull: false
// //     },
// //     language: {
// //         type: DataTypes.ENUM('cpp', 'python', 'java'),
// //         allowNull: false
// //     },
// //     failed_test_case: {
// //         type: DataTypes.TEXT,
// //         defaultValue: null,
// //         allowNull: true
// //     },
// //     result: {
// //         type: DataTypes.TEXT,
// //         allowNull: false,
// //         defaultValue: 'Pending'
// //     },
// //     execution_time: {
// //         type: DataTypes.FLOAT,
// //         defaultValue: 0.0
// //     },
// //     memory_usage: {
// //         type: DataTypes.FLOAT,
// //         defaultValue: 0.0
// //     },
// //     submitted_at: {
// //         type: DataTypes.DATE,
// //         defaultValue: DataTypes.NOW
// //     }
// // }, {
// //     timestamps: false
// // });

// // // Define relationships

// // module.exports = Submission;

// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../config/database');

// // const Submission = sequelize.define('Submission', {
// //     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
// //     team_id: { type: DataTypes.INTEGER, allowNull: false },
// //     problem_id: { type: DataTypes.INTEGER, allowNull: false,
// //         references: { model: Problem, key: 'id' }
// //      },
// //     code: { type: DataTypes.TEXT, allowNull: false },
// //     event_id: {
// //         type: DataTypes.INTEGER,
// //         allowNull: false,
// //         references: {
// //             model: Event,
// //             key: 'id'
// //         }
// //     },
// //     language: { type: DataTypes.STRING, allowNull: false },
// //     verdict: { type: DataTypes.STRING, allowNull: false },
// //     submitted_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
// // }, {
// //     timestamps: false
// // });

// // module.exports = Submission;
// const { DataTypes } = require('sequelize');
// const  sequelize = require('../config/database');
// const Team = require('./Team');
// const Problem = require('./Problem');
// const Event = require('./Event'); // Add at the top


// const Submission = sequelize.define('Submission', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     team_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     problem_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Problem,
//             key: 'id'
//         }
//     },
//     event_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Event,
//             key: 'id'
//         }
//     },
//     code: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     language: {
//         type: DataTypes.ENUM('cpp', 'python', 'java'),
//         allowNull: false
//     },
//     failed_test_case: {
//         type: DataTypes.TEXT,
//         defaultValue: null,
//         allowNull: true
//     },
//     result: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         defaultValue: 'Pending'
//     },
//     execution_time: {
//         type: DataTypes.FLOAT,
//         defaultValue: 0.0
//     },
//     memory_usage: {
//         type: DataTypes.FLOAT,
//         defaultValue: 0.0
//     },
//     submitted_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }
// }, {
//     timestamps: false
// });

// // Define relationships

// module.exports = Submission;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams', // lowercase plural
            key: 'id'
        }
    },
    problem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'problems', // lowercase plural
            key: 'id'
        }
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'events', // lowercase plural
            key: 'id'
        }
    },
    code: { type: DataTypes.TEXT, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    failed_test_case: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: true
    },
    result: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'Pending'
    },
     execution_time: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
      memory_usage: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
     submitted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    verdict: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

module.exports = Submission;