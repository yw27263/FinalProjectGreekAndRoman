import Message from '../models/Message.js';

export const loadPage = async (req, res)=> {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        res.render('index', {
            title: "Skeleton",
            message:"Hello World",
            name: "bob",
            messages,
            summary: {
                total: messages.length
            }
        });
    } catch (error) {
        console.error("Error loading", error);
        res.status(500).send("Fix urself");
    }
};

export const send = async (req, res)=> {
    try {
        const { message, name } = req.body;

        if (!name || !message) {
            const messages = await Message.find().sort({ createdAt: -1 });
            return res.render('index', {
                title: "U suck",
                message: "Pls fill out fields",
                name: "the almighty",
                messages
            });
        }

        await Message.create({ message, name });

        const messages = await Message.find();

        res.render('index', {
            title: "Skeleton",
            message,
            name,
            messages,
            summary: {
                total: messages.length
            }
        });

    } catch (error) {
        console.error("Error sending message", error);
        res.status(500).send("Fix urself");
    }
};

export const edit = async (req,res,next) => {
  try {
    const message = await Message.findById(req.params.id);

    if(!message) {
      return res.status(404).send('Message not found');
    }

    res.render('edit', {
        title: "edit",
        message
    });

  } catch (err) {
    next(err)
  }
};

export const messagePage = async (req, res, next) => {
  try {
    const { name, message } = req.body;

    await Message.findByIdAndUpdate(req.params.id, {
      name,
      message
    });

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

export const del = async (req,res,next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.redirect('/');

  } catch (err) {
    next(err)
  }

};