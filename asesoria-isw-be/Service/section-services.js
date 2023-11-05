const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

//Post
async function createSection(section) {
  console.log(section);
  const res = knex("sections").insert({
    id_course: section.course_id,
    id_teacher: section.teacher_id,
    year: section.year,
    quarter: section.quarter,
    user_creator: section.user_creator,
  });
  return res;
}

async function assignTeacher(section) {
  return knex("sections").where("id_section", section.id).update({
    id_teacher: section.teacher,
    active_section: 1,
    last_modification: new Date(),
    user_editor: section.editor,
  });
}

async function setActiveSection(section) {
  return knex("sections").where("id_section", section.id).update({
    active_section: section.active,
    last_modification: new Date(),
    user_editor: section.editor,
  });
}

//Get
async function getTeacherSection(id_user) {
  let sections = await knex.raw(
    `
      SELECT sections.*
      FROM sections
      INNER JOIN users ON users.id_user = sections.id_teacher
      WHERE users.id_user = ?
    `,
    [id_user]
  );
  sections = JSON.stringify(sections[0]);
  return JSON.parse(sections);
}

async function getAllSections() {
  let sections = await knex
    .select("*")
    .from("sections")
    .innerJoin("courses", "sections.id_course", "=", "courses.id_course");
  sections = JSON.stringify(sections);
  return JSON.parse(sections);
}

async function getSectionByCourse(course_id) {
  const infoSection = JSON.parse(
    JSON.stringify(
      await knex
        .select(
          "courses.id_course as CourseId",
          "sections.id_section as SectionId",
          "courses.name_course as CourseName",
          "users.name_user as Teacher",
          "sections.year as Year",
          "sections.quarter as Quarter"
        )
        .table("sections")
        .innerJoin("users", "users.id_user", "sections.id_teacher")
        .innerJoin("courses", "courses.id_course", "sections.id_course")
        .where("courses.id_course", course_id)
    )
  );

  return infoSection;
}
async function deleteSection(id) {
  let section = await knex("sections").where("id_section", id).del();
  section = JSON.stringify(section);
  return JSON.parse(section);
}
module.exports = {
  createSection,
  assignTeacher,
  setActiveSection,
  getTeacherSection,
  getAllSections,
  getSectionByCourse,
  deleteSection,
};
