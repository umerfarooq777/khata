const sql = require("mssql")
const router = require("express").Router()

router.get("/all", (req, res) => {
  req.app.locals.db.query(`select * from demo;`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordset)
  })
})

router.post("/entryAccount", (req, res) => {
  var today = new Date();
  var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log("🚀-----------------------------------------", date + " " + time)
  req.app.locals.db.query(`INSERT INTO Entry_Account VALUES('${date} ${time}')`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).send('Account Entry Data successfully set')
  })
})


router.post("/debitInfo", (req, res) => {
  const { Debit_Data, Debit_Info_Amount, Debit_Info_Type_Entry, Debit_Info_Nature, Entry_id } = req.body
  const value = `INSERT INTO Debit_Info VALUES(${Debit_Data},${Debit_Info_Amount},${Debit_Info_Type_Entry},${Debit_Info_Nature},${Entry_id})`;
  console.log("🚀 ~ file: sqlRoutes.js ~ line 35 ~ router.post ~ value", value)
  req.app.locals.db.query(`INSERT INTO Debit_Info VALUES('${Debit_Data}',${Debit_Info_Amount},${Debit_Info_Type_Entry},'${Debit_Info_Nature}',${Entry_id})`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).send('Debit Info successfully set')
  })
})


router.post("/creditInfo", (req, res) => {
  const { Credit_Data, Credit_Data_Amount, Credit_Data_Amount_Type_Entry, Credit_Data_Amount_Nature, Entry_id } = req.body
  const value = `INSERT INTO Debit_Info VALUES(${Credit_Data},${Credit_Data_Amount},${Credit_Data_Amount_Type_Entry},${Credit_Data_Amount_Nature},${Entry_id})`;
  console.log("🚀 ~ file: sqlRoutes.js ~ line 35 ~ router.post ~ value", value)
  req.app.locals.db.query(`INSERT INTO Credit_Info VALUES('${Credit_Data}',${Credit_Data_Amount},${Credit_Data_Amount_Type_Entry},'${Credit_Data_Amount_Nature}',${Entry_id})`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).send('Credit Info successfully set')
  })
})


module.exports = router