const express = require("express");
//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
//const express = require("./routes")

//Connecting to mongodb
mongoose.connect('mongodb://localhost:27017/employeesDB');

const app = express(); 
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//Create Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    birth: String,
    salary: Number,
    phone: Number,
    role: String,
    report: String
});

//Create Model
const Employee = mongoose.model("Employee", employeeSchema);

const employee = new Employee({
    name: "Manu",
    surname: "Phi",
    birth: "06-04-1998",
    salary: 67000, 
    phone: 0711,
    role: "CEO",
    report: " "
});

//employee.save();

app.post("/create", function(req, res){
    res.render("create");

});

app.post("/read", function(req, res){
    //console.log(req.body.read)
    Employee.findById(req.body.read, function(err, employee){
        if(err){
            console.log("Error in finding employee")
        }else{
            res.render("read", {employee: employee});
        }
    });

    //res.render("read", {employee: });

});

app.post("/update", function(req, res){

    Employee.findById(req.body.update, function(err, employee){
        if(err){
            console.log("Error in finding employee")
        }else{
            res.render("update", {myEmployee: employee});
        }
    });

})

app.post("/update/employee", function(req, res){
    const employeeName =  req.body.fname;
    const employeeSurname = req.body.lname;
    const employeeBirth = req.body.birth;
    const employeeSalary = parseInt(req.body.salary);
    const employeePhone = parseInt(req.body.phone);
    const employeeRole = req.body.role;
    const employeeReport = req.body.report;
    const employeeId = req.body.employeeId;

    Employee.updateOne({_id: employeeId}, {name: employeeName, surname: employeeSurname, 
        birth: employeeBirth, salary: employeeSalary, phone: employeePhone, role: employeeRole, report: employeeReport}, function(err){
            if(err){
                console.log("Error in updating employee details")
            }else{
                res.redirect("/")
            }})
})

app.post("/delete", function(req, res){
    const employeeId = req.body.delete;

    Employee.deleteOne({_id: employeeId}, function(err){
        if(err){
            console.log("Error in deleting employee")
        }else{
            res.redirect("/")
        }})
})


app.get("/", function(req, res){
    //res.sendFile(__dirname + "/index.html");

    Employee.find(function(err, employees){
        if(err){
            console.log("Error in finding employees");
        }
        else{
            employees.forEach(employee =>{
                console.log(employee.name + " " + employee.surname);
            })
            
            res.render("index", {allEmployees: employees})
        }
    })

});

app.post("/creation", function(req, res){
    const one_employee = new Employee({
        name: req.body.fname,
        surname: req.body.lname,
        birth: req.body.birth,
        salary: parseInt(req.body.salary), 
        phone: parseInt(req.body.phone),
        role: req.body.role,
        report: req.body.report
    });

app.post("/readd", function(req, res){
    console.log(req.body.read)
    //res.render("read");
})

    Employee.insertMany([one_employee], function(err){
        if (err){
            console.log("Failed");
        }else{
            console.log("Successfully added employee");
        }
    })

});


app.listen(3000, function(){
    console.log("Server started in port 3000");
});