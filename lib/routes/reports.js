import { Router } from 'express';
const router = Router();

import reports from '../models/reports.js';
import Route from '../const/route.js';

const routes = new Route();

router.post(routes.reports, async function (req, res) { 
    const report = new reports(req.body);
    await report.save();
});
