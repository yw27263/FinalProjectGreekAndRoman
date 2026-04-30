import Admin from '../models/Admin.js';
import Point from '../models/Point.js';

export const adminEnter = async (req, res)=> {
    try {
        const points = await Point.find();
        let greekPoints = 0;
        let romanPoints = 0;
        points.forEach(p => {
         if (p.team === "greek"){
            greekPoints += p.pointNum;
         }   
         else if (p.team === "roman") {
            romanPoints += p.pointNum;
         }
        });

        //res.json(greekPoints,romanPoints);

        res.render('admin', {
            title: "Greek and Roman Points!",
            greekPoints,
            romanPoints,
            summary: {
                total: points.length
            }
        });
    } catch (error) {
        console.error("Error loading", error);
        res.status(500).send("Fix urself");
    }
};