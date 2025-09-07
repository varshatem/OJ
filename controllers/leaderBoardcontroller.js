const Leaderboard = require("../models/LeaderBoard");
const Problem = require("../models/Problem");
const Team = require("../models/Team");

// 🔹 Update leaderboard when a problem is accepted
exports.updateLeaderboard = async (team_id, problem_id) => {
  try {
    const problem = await Problem.findByPk(problem_id);
    if (!problem) return { error: "Problem not found" };

    let entry = await Leaderboard.findOne({ where: { team_id } });

    if (!entry) {
      // First time team appears
      entry = await Leaderboard.create({
        team_id,
        problems: [
          {
            problem_id,
            score: problem.score,
            accepted_time: new Date(),
          },
        ],
        total_score: problem.score,
      });
    } else {
      // Team already exists
      let problems = entry.problems || [];
      const idx = problems.findIndex((p) => p.problem_id === problem_id);

      if (idx === -1) {
        problems.push({
          problem_id,
          score: problem.score,
          accepted_time: new Date(),
        });
        entry.total_score += problem.score;
      } else if (problems[idx].score === 0) {
        problems[idx].score = problem.score;
        problems[idx].accepted_time = new Date();
        entry.total_score += problem.score;
      }

      entry.problems = problems;
      await entry.save();
    }

    return { success: true };
  } catch (err) {
    console.error("❌ Error updating leaderboard:", err);
    return { error: "Leaderboard update failed" };
  }
};

// 🔹 Get leaderboard (sorted by score → tie-breaker = majority earlier accepted times)
exports.getLeaderboard = async (req, res) => {
  try {
    const teams = await Team.findAll({ attributes: ["id", "name"] });
    const leaderboard = await Leaderboard.findAll();

    const results = teams.map((team) => {
      const entry = leaderboard.find((e) => e.team_id === team.id);

      return {
        team_id: team.id,
        team_name: team.name,
        total_score: entry ? entry.total_score : 0,
        problems: entry ? entry.problems : [],
      };
    });

    // Sort logic
    results.sort((a, b) => {
      if (b.total_score !== a.total_score) {
        return b.total_score - a.total_score;
      }

      // Tie-breaker (Option B): compare problem accepted times
      let aWins = 0,
        bWins = 0;

      const problemsCount = Math.max(a.problems.length, b.problems.length);

      for (let i = 0; i < problemsCount; i++) {
        const aProb = a.problems[i];
        const bProb = b.problems[i];

        if (aProb?.accepted_time && bProb?.accepted_time) {
          if (new Date(aProb.accepted_time) < new Date(bProb.accepted_time)) {
            aWins++;
          } else if (
            new Date(bProb.accepted_time) < new Date(aProb.accepted_time)
          ) {
            bWins++;
          }
        }
      }

      return bWins - aWins; // whoever wins more comparisons ranks higher
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

