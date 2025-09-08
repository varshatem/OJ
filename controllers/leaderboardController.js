const { Team, User, Submission, Problem } = require('../models');

const getTeamLeaderboard = async (req, res) => {
  try {
    // Get all teams
    const teams = await Team.findAll({
      include: [
        { model: User, as: 'Users', attributes: ['id', 'username'] },
        {
          model: Submission,
          as: 'Submissions',
          include: [{ model: Problem, as: 'Problem', attributes: ['id', 'score'] }]
        }
      ]
    });

    let leaderboard = teams.map(team => {
      // filter only accepted submissions
      const acceptedSubs = team.Submissions.filter(s => s.verdict === 'Accepted');

      // map problem_id → earliest accepted submission
      const uniqueProblems = new Map();
      acceptedSubs.forEach(sub => {
        if (!uniqueProblems.has(sub.problem_id)) {
          uniqueProblems.set(sub.problem_id, sub);
        } else {
          // keep earliest submission
          if (new Date(sub.submitted_at) < new Date(uniqueProblems.get(sub.problem_id).submitted_at)) {
            uniqueProblems.set(sub.problem_id, sub);
          }
        }
      });

      // calculate total score
      const score = Array.from(uniqueProblems.values())
        .reduce((acc, sub) => acc + (sub.Problem?.score || 0), 0);

      // latest submission time (used for tie-breaking)
      let lastSubmissionTime = null;
      if (uniqueProblems.size > 0) {
        lastSubmissionTime = new Date(Math.max(...Array.from(uniqueProblems.values())
          .map(sub => new Date(sub.submitted_at).getTime())));
      }

      return {
        teamId: team.id,
        teamName: team.team_name,
        members: team.Users.map(u => u.username),
        score,
        lastSubmissionTime
      };
    });

    // sort leaderboard → score desc, then submission time asc
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.lastSubmissionTime && b.lastSubmissionTime) {
        return new Date(a.lastSubmissionTime) - new Date(b.lastSubmissionTime);
      }
      return 0;
    });

    res.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

module.exports = { getTeamLeaderboard };
