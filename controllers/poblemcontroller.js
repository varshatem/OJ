const Problem = require('../models/Problem');
const ProblemSample = require('../models/ProblemSample');

// Create new Problem (with optional samples)
exports.createProblem = async (req, res) => {
  try {
    const { title, description,score,input_format,output_format,consraints,is_junior,time_limit,memory_limit,event_id,samples} = req.body;

    // create problem first
    const problem = await Problem.create({  title, description,score,input_format,output_format,consraints,is_junior,time_limit,memory_limit,event_id, });

    // if samples are provided, bulk insert them
    if (samples && Array.isArray(samples)) {
      const formattedSamples = samples.map(s => ({
        problem_id: problem.id,
        input: s.input,
        output: s.output,
        explanation: s.explanation || null
      }));
      await ProblemSample.bulkCreate(formattedSamples);
    }

    return res.status(201).json({ message: "Problem created", problem });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create problem" });
  }
};

// Get all problems with their samples
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [{ model: ProblemSample, as: "samples" }]
    });
    return res.json(problems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch problems" });
  }
};

// Get a single problem by ID
exports.getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findByPk(id, {
      include: [{ model: ProblemSample, as: "samples" }]
    });

    if (!problem) return res.status(404).json({ error: "Problem not found" });

    return res.json(problem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch problem" });
  }
};

// Add a sample test case to a problem
exports.addSample = async (req, res) => {
  try {
    const { id } = req.params; // problem ID
    const { input, output, explanation } = req.body;

    const problem = await Problem.findByPk(id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const sample = await ProblemSample.create({
      problem_id: id,
      input,
      output,
      explanation
    });

    return res.status(201).json({ message: "Sample added", sample });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add sample" });
  }
};

// Delete a problem (samples deleted automatically via CASCADE)
exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Problem.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Problem not found" });

    return res.json({ message: "Problem deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete problem" });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      score,
      input_format,
      output_format,
      consraints,
      is_junior,
      time_limit,
      memory_limit,
      event_id,
      samples
    } = req.body;

    const problem = await Problem.findByPk(id);
    if (!problem) {
      return res.status(404).json({ error: `Problem with ID ${id} not found` });
    }

    // partial update (only update if field is provided)
    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.score = score || problem.score;
    problem.input_format = input_format || problem.input_format;
    problem.output_format = output_format || problem.output_format;
    problem.consraints = consraints || problem.consraints;
    problem.is_junior = (is_junior !== undefined) ? is_junior : problem.is_junior;
    problem.time_limit = time_limit || problem.time_limit;
    problem.memory_limit = memory_limit || problem.memory_limit;
    problem.event_id = event_id || problem.event_id;

    await problem.save();

    // handle samples if provided
    if (samples && Array.isArray(samples)) {
      // delete old samples
      await ProblemSample.destroy({ where: { problem_id: id } });

      // add new ones
      const formattedSamples = samples.map(s => ({
        problem_id: id,
        input: s.input,
        output: s.output,
        explanation: s.explanation || null
      }));

      await ProblemSample.bulkCreate(formattedSamples);
    }

    return res.status(200).json({
      message: "Problem updated successfully",
      problem
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error updating problem",
      details: error.message
    });
  }
};

