const List = require('../models/List');
const Card = require('../models/Card');

exports.getLists = async (req, res) => {
    try {
        const lists = await List.find({ board: req.params.boardId });
        res.json(lists);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addCard = async (req, res) => {
    try {
        const { title } = req.body;
        const newCard = new Card({ title, list: req.params.listId });
        await newCard.save();
        res.status(201).json(newCard);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCard = async (req, res) => {
    try {
        const card = await Card.find({ list: req.params.listId });
        res.json(card);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCard = async (req, res) => {
    try {
        const { title } = req.body;
        const card = await Card.findOneAndUpdate( { _id: req.params.cardId }, { title
            }, { new: true });
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({ _id: req.params.cardId });
        if (!card) return res.status(404).json({ message: 'Card not found' });
        const list = await List.findById(req.params.listId);
        list.cards = list.cards.filter((c) => c.toString() !== req.params.cardId);
        await list.save();
        res.json({ message: 'Card deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.moveCard = async (req, res) => {
    try {
        const { cardId, sourceListId, destListId, newPosition } = req.body;
        const card = await Card.findById(cardId);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        if (card.list.toString() !== sourceListId) return res.status(400).json({ message: 'Card does not belong to source list' });
        card.list = destListId;
        card.position = newPosition;
        await card.save();
        res.json({ message: 'Card moved' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



