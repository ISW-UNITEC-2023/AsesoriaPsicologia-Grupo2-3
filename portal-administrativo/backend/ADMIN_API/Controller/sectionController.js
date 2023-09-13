const {
  getSections: get,
  GetInfoSection: infoSection,
  CreateSection: createSection,
  DeleteSection: deleteSection,
  SectionExists: sectionExi,
  updateSection: update,
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

async function EraseSection(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const exists = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await deleteSection(id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateSection(req, res) {
  try {
    const errorMessage = [];

    const { id } = req.query;
    const course = req.body;
    const exists = await sectionExi(id);

    if (!id) {
      errorMessage.push("PARAMETER ID REQUIRED!!");
    }
    if (!exists) {
      errorMessage.push("ID NOT EXISTS!!");
    }

    if (errorMessage.length > 0) {
      res.status(404).send(errorMessage);
    } else {
      await update(id, course.course_id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

module.exports = {
  getSections,
  InfoSection,
  sectionCreate,
  EraseSection,
  UpdateSection,
};
