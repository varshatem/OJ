exports.RunProblem = async (req, res) => {
const axios = require('axios');  
const CELERY_API_BASE = 'http://localhost:5000';//enter ur flask route

async function enqueueTask(queue, data) {
    try {
        if (data.code)
            data.code = Buffer.from(data.code).toString('base64');
        if (data.customTestcase)
            data.customTestcase = Buffer.from(data.customTestcase).toString('base64');

        let endpoint = '';
        if (queue === 'submitQueue') endpoint = '/enqueue/submit';
        else if (queue === 'runQueue') endpoint = '/enqueue/run';
        else if (queue === 'runSystemQueue') endpoint = '/enqueue/system';

        const res = await axios.post(`${CELERY_API_BASE}${endpoint}`, data);
        // console.log(`Enqueued via Flask: ${res.data.message}`);
    } catch (error) {
        console.error(`Error enqueueing via Flask API:`, error.message);
    }
}
    
try {

        const { problem_id, code, customTestcase, language } = req.body;
        const user = req.user;
        
        const submission_id= `run_${Date.now()}`;

        const runData = {
            submission_id: submission_id,
            problem_id,
            // team_id: user.team_id,
            code,
            customTestcase: customTestcase || null,
            language,
        };


        await enqueueTask('runQueue', runData);

        res.status(200).json({ message: `Run request enqueued successfully.`,submission_id: submission_id });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to enqueue run request.' });
    }   
}