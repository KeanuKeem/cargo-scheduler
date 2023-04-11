const Schedule = require("../models/Schedule");
const dateSplit = require("../references/schedule-references");

const getSchedule = async (req, res) => {
  const month = req.query.month;
  const year = Number(req.query.year);

  try {
    const schedule = await Schedule.find({month, year});
    if (schedule.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(schedule);
    }
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
   }
};

const createSchedule = async (req, res) => {
  const day = dateSplit(req.body.schedule);
  const id = req.body.ref;
  const contType = req.body.contType;
  const month = day.month;
  const year = day.year;
  const date = day.date;

  const newDateObj = {
    date,
    values: [{
      id,
      contType,
    }]
  };

  try {
    const schedule = await Schedule.findOne({ month, year });

    if (schedule) {
      let existingShipment = schedule.shipments.filter(dateObj => {
        return dateObj.date === date
      });
      if (existingShipment.length > 0) {
        existingShipment[0].values.push({id, contType});
      } else {
        schedule.shipments.push(newDateObj);
      }

      await schedule.save();
      res.status(200).json(schedule);
    } else {
      const newSchedule = new Schedule({
        month,
        year,
        shipments: [{
          date,
          values: [{
            id,
            contType,
          }]
        }]
      });

      await newSchedule.save()
      res.status(200).json(newSchedule);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Server error'});
  }
};

const updateSchedule = async (req, res) => {
  const id = req.body.ref;
  const contType = req.body.contType;
  const oldDay = dateSplit(req.body.prevSchedule);
  const oldMonth = oldDay.month;
  const oldYear = oldDay.year;
  const oldDate = oldDay.date;
  const newDay = dateSplit(req.body.schedule);
  const newMonth = newDay.month;
  const newYear = newDay.year;
  const newDate = newDay.date;

  const oldSchedule = await Schedule.findOne({ month: oldMonth, year: oldYear });

  const oldDateObj = oldSchedule.shipments.find(dateObj => {
    return dateObj.date === oldDate;
  });
  
  const deleteIndex = oldDateObj.values.findIndex(oldShipment => {
    return oldShipment.id === id;
  });

  oldDateObj.values.splice(deleteIndex, deleteIndex+1);

  await oldSchedule.save();

  const newDateObj = {
    date: newDate,
    values: [{
      id,
      contType,
    }]
  };

  try {
    const newSchedule = await Schedule.findOne({ month: newMonth, year: newYear });

    if (newSchedule) {
      let existingShipment = newSchedule.shipments.filter(dateObj => {
        return dateObj.date === newDate
      });
      if (existingShipment.length > 0) {
        existingShipment[0].values.push({id, contType});
      } else {
        newSchedule.shipments.push(newDateObj);
      }

      await newSchedule.save();
      res.status(200).json(newSchedule);
    } else {
      const newScheduleModel = new Schedule({
        month: newMonth,
        year: newYear,
        shipments: [{
          date: newDate,
          values: [{
            id,
            contType,
          }]
        }]
      });

      await newScheduleModel.save()
      res.status(200).json(newSchedule);
    }

  } catch (err) {
    res.status(500).send(err);
  }

};

const deleteSchedule = async (req, res) => {
  const id = req.query.id;
  const day = dateSplit(req.query.schedule);
  const [date, month, year] = [day.date, day.month, day.year];

  const schedule = await Schedule.findOne({month, year});

  const dateData = schedule.shipments.find(dateObj => {
    return dateObj.date === date;
  });

  const dateDataIndex = dateData.values.findIndex(shipmentId => {
    return shipmentId.id === id;
  })

  dateData.values.splice(dateDataIndex, dateDataIndex + 1);

  await schedule.save()
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(500).send(err);
  });
};

exports.createSchedule = createSchedule;
exports.getSchedule = getSchedule;
exports.updateSchedule = updateSchedule;
exports.deleteSchedule = deleteSchedule;
