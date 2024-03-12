const ToDoItem = require("../models/todo_item");
const mongoose = require("mongoose");
// const apiUrl = "http://localhost:3000";
const apiUrl = "https://ill-flip-flops-tick.cyclic.app";

exports.get_all_item = (req, res, next) => {
  ToDoItem.find()
    .select("title description _id date stautus")
    .exec()
    .then((docs) => {
      // console.log(doc);
      if (docs.length > 0) {
        const response = {
          count: docs.length,
          item: docs.map((doc) => {
            return {
              _id: doc.id,
              title: doc.title,
              description: doc.description,
              date: doc.date,
              stautus: doc.stautus,
              request: {
                type: "GET",
                inf: "to get item by Id",
                url: apiUrl + "/toDoApi/" + doc.id,
              },
            };
          }),
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No  item found ",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.create_item = (req, res, next) => {
  console.log(req.file);
  const toDoItem = new ToDoItem({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    // date: req.body.date,
    date: Date.now(),
    stautus: req.body.stautus,
  });
  toDoItem
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Created Itime successfully",
        createdtem: {
          _id: result.id,
          title: result.title,
          description: result.description,
          date: result.date,
          stautus: result.stautus,
          request: {
            type: "DELETE",
            inf: "to delete item by Id",
            url: apiUrl + "/toDoApi/" + result.id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.find_item_byId = (req, res, next) => {
  const id = req.params.itemId;
  ToDoItem.findById(id)
    .select("title description _id date stautus")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "PATCH",
            inf: " to  update item",
            url: apiUrl + "/toDoApi/" + id,
          },
        });
      } else {
        res.status(404).json({
          message: `No valid entry found for item ID ${id}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.update_item = (req, res, next) => {
  const id = req.params.itemId;
  const updateOps = {};

  console.log(id);
  ToDoItem.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        stautus: req.body.stautus,
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      //   console.log(result);
      res.status(200).json({
        updateItem: {
          _id: result.id,
          title: result.title,
          description: result.description,
          date: result.date,
          stautus: result.stautus,
        },
        request: {
          type: "GET",
          description: "GET All Item ",

          url: "/toDoApi",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.delete_item = (req, res, next) => {
  const id = req.params.itemId;
  ToDoItem.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result.deletedCount);
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "item delete",
          request: {
            type: "POST",
            description: "POST to add new Item ",

            url: apiUrl + "/toDoApi",
          },
        });
      } else {
        res.status(404).json({
          message: `No valid entry found for item ID ${id}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
