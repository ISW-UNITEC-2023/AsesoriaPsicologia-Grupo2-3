const {
  getSections: get,
  GetInfoSection: infoSection,
  CreateSection: createSection,
} = require("../Service/section");

async function getSections(_, res) {
  const sections = await get();
  res.send(sections);
}

async function InfoSection(req, res) {
  const { course_id } = req.query;
  const section = await infoSection(course_id);
  res.send(section);
}

async function sectionCreate(req, res) {
  const section = req.body;
  const result = await createSection(section);
  res.send(result);
}

module.exports = {
  getSections,
  InfoSection,
  sectionCreate,
};
