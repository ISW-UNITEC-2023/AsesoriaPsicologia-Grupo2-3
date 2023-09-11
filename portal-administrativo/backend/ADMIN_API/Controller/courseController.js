const { GetCourses: get } = require("../Service/course");

async function GetCourses(_, res) {
  const courses = await get();
  res.send(courses);
}


module.exports = {
  GetCourses,
};
