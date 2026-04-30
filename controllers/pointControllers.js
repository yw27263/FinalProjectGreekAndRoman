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

        const points = await Point.find().sort({ createdAt: -1 });

        if (!pointNum || !message || !team) {
            console.log(pointNum, message, team);
            return res.send(pointNum, message, team);
        }

        pointNum = parseInt(pointNum);

        await Point.create({ pointNum, message, team });

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

        res.render('student', {
            title: "Greek and Roman Points!",
            greekPoints,
            romanPoints,
            summary: {
                total: points.length
            }
        });

    } catch (error) {
        console.error("Error sending message", error);
        res.status(500).send("the point is not pointing");
    }
};

export const edit = async (req,res,next) => {
  try {
    const point = await Point.findById(req.params.id);

    if(!point) {
      return res.status(404).send('Point not found');
    }

    res.render('edit', {
        title: "edit",
        point
    });

  } catch (err) {
    next(err)
  }
};

export const pointPage = async (req, res, next) => {
  try {
    const { pointNum, message, team } = req.body;

    await Point.findByIdAndUpdate(req.params.id, {
      pointNum,
      message,
      team
    });

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

export const del = async (req,res,next) => {
  try {
    await Point.findByIdAndDelete(req.params.id);

    res.redirect('/');

  } catch (err) {
    next(err)
  }

};