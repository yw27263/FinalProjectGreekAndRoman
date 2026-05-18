import Point from '../models/Point.js';

export const loadPage = async (req, res)=> {
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

        res.render('student', {
            title: "Greek and Roman Points!",
            greekPoints,
            romanPoints,
            summary: {
                total: points.length
            }
        });
    } catch (error) {
        console.error("Error loading", error);
        res.status(500).send("page not loading");
    }
};

export const addPoint = async (req, res)=> {
    try {
        let { pointNum, message, team } = req.body;

        if (!pointNum || !message || !team) {
            console.log(pointNum, message, team);
            return res.send(pointNum, message, team);
        }

        pointNum = parseInt(pointNum);

        await Point.create({ pointNum, message, team });

        res.redirect('/adminLoad');

    } catch (error) {
        console.error("Error sending message", error);
        res.status(500).send("the point is not pointing");
    }
};

export const pointHistory = async (req, res) => {
    try {
        const points = await Point.find().sort({ date: 1 });
        res.render('pointHistory', {
            points
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading Point History');
    }
};