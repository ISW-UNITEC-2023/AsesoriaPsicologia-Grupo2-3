const sectionServices = require("../Service/section-services");

//Post
async function createSection(req, res) {
  const section = req.body;
  try {
    await sectionServices.createSection(section);
    res.send({ message: "Se ha creado la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido crear la sección" });
  }
}

async function getSectionByCourse(req, res) {
  const { course_id } = req.query;

  try {
    
    const section = await sectionServices.getSectionByCourse(course_id);
    res.send(section);
  } catch (error) {
    res.send({ message: "No se ha podido recuperar la sección" });
  }
}

async function assignTeacher(req, res) {
  const { id, teacher, editor } = req.body;
  try {
    await sectionServices.assignTeacher({
      id: id,
      teacher: teacher,
      editor: editor,
    });
    res.send({ message: "Se ha asignado un catedrático al curso" });
  } catch (error) {
    res.send({ message: "No se ha podido asignar un catedrático al curso" });
  }
}

async function setActiveSection(req, res) {
  const { id, active, editor } = req.body;
  try {
    await sectionServices.setActiveSection({
      id: id,
      active: active,
      editor: editor,
    });
    res.send({ message: "Se ha actualizado el estado de la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido activar la sección" });
  }
}

//Get
async function getTeacherSection(req, res) {
  const { id_user } = req.body;
  try {
    const sections = await sectionServices.getTeacherSection(id_user);
    res.send({
      sections: sections,
    });
  } catch (error) {
    res.send("No se ha podido recuperar las secciones");
  }
}

async function getAllSections(req, res) {
  try {
    const sections = await sectionServices.getAllSections();
    res.send({
      sections: sections,
    });
  } catch (error) {
    res.send("No se ha podido recuperar las secciones");
  }
}
async function deleteSection(req, res) {
  const { id } = req.body;
  try {
    await sectionServices.deleteSection(id);
    res.send({ message: "Se ha eliminado la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido eliminar la sección" });
  }
}

async function updateYear(req, res) {
  const { id_sections, year } = req.body;
  try {
    await sectionServices.updateYear({
      id_sections: id_sections,
      year: year,
    });
    res.send({ message: "Se ha actualizado el año de la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido actualizar el año de la sección" });
  }
}

async function updateQuarter(req, res) {
  const { id_sections, quarter } = req.body;
  try {
    await sectionServices.updateQuarter({
      id_sections: id_sections,
      quarter: quarter,
    });
    res.send({ message: "Se ha actualizado el trimestre de la sección" });
  } catch (error) {
    res.send({
      message: "No se ha podido actualizar el trimestre de la sección",
    });
  }
}

async function updateTeacher(req, res) {
  const { id_sections, id_teacher } = req.body;
  try {
    await sectionServices.updateTeacher({
      id_sections: id_sections,
      id_teacher: id_teacher,
    });
    res.send({ message: "Se ha actualizado el catedrático de la sección" });
  } catch (error) {
    res.send({
      message: "No se ha podido actualizar el catedrático de la sección",
    });
  }
}

async function updateActive(req, res) {
  const { id_sections, active_section } = req.body;
  try {
    await sectionServices.updateActive({
      id_sections: id_sections,
      active_section: active_section,
    });
    res.send({ message: "Se ha actualizado el estado de la sección" });
  } catch (error) {
    res.send({ message: "No se ha podido actualizar el estado de la sección" });
  }
}

module.exports = {
  createSection,
  assignTeacher,
  setActiveSection,
  getTeacherSection,
  getAllSections,
  getSectionByCourse,
  deleteSection,
  updateYear,
  updateQuarter,
  updateTeacher,
  updateActive,
};
