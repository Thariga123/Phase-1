let students = [
    { name: "Thariga", age: 22, grades: [85, 90, 78] },
    { name: "Suthan", age: 19, grades: [88, 76, 92] },
    { name: "Dhanu", age: 23, grades: [91, 85, 89] },
    { name: "Rojitha", age: 21, grades: [70, 65, 80] },
    { name: "Harini", age: 18, grades: [95, 92, 89] }
  ];
  
  let studentNames = students.map(student => student.name);
  
  let studentsOlderThan20 = students.filter(student => student.age > 20);
  
  let averageGrade = students.reduce((acc, student) => {
    let totalGrades = student.grades.reduce((sum, grade) => sum + grade, 0);
    let avgGrade = totalGrades / student.grades.length;
    return acc + avgGrade;
  }, 0) / students.length;
  
  let averageGradeOlderThan20 = students.filter(student => student.age > 20)
    .reduce((acc, student) => {
      let totalGrades = student.grades.reduce((sum, grade) => sum + grade, 0);
      let avgGrade = totalGrades / student.grades.length;
      return acc + avgGrade;
    }, 0) / studentsOlderThan20.length;
  
  console.log("Student Names: " + studentNames);
  console.log("Students Older Than 20: ", studentsOlderThan20);
  console.log("Average Grade of All Students: " + averageGrade.toFixed(2));
  console.log("Average Grade of Students Older Than 20: " + averageGradeOlderThan20.toFixed(2));
  