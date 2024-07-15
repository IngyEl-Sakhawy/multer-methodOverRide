const Student = require('../models/studentModel');

exports.getHomePage = async (req, res) => {
  try {
    const students = await Student.find({});
    res.render('index', { title: 'Student Management', students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.registerStudent = async (req, res) => {
  try {
    res.render('addStudent');
  } catch (err) {
    console.error('Error rendering add student page:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, birthdate } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).send('Student with this email already exists');
    }

    const profile_picture ='/uploads/' + req.file.filename;

    const newStudent = new Student({
      name,
      email,
      phone,
      birthdate,
      profile_picture,
    });

    await newStudent.save();
    res.redirect('/');

  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    console.log("student info", student);
    res.render('updateStudent', {student});
  } catch (err) {
    console.error('Error rendering update student page:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateStudent = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedData = req.body;

    if (req.file) {
      console.log("file found")
      updatedData.profile_picture = '/uploads/' + req.file.filename;
    } else {
      console.log("file not found")
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).send('Student not found');
    }

    const students = await Student.find({});
    res.status(200).render('index', { title: 'Student Management', students });

  } catch (err) {
    console.error(`Error updating student with ID ${id}:`, err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).send('Student not found');
    }

    res.status(200).send('Student deleted successfully');
  } catch (err) {
    console.error(`Error deleting student with ID ${id}:`, err);
    res.status(500).send('Internal Server Error');
  }
};


exports.aggregateMatch = async (req,res) =>{
  try {
    const found = await Student.aggregate([
      { $match : { name: {$eq:'malak'}}},
      // { $group : { email : null}}
    ]);

    res.status(200).json({
      status : 'success',
      count : found.length,
      data : {
        found
      }
    })
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
}