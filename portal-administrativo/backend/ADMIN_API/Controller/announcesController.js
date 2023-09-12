const {
  CreateAnnounce: create,
  GetAnnouncesForSection: getSectionAnnounce,
  GetAnnouncesForUser: getUserAnnounce,
  GetAnnouncesForSections: getAnnouncesSections,
  GetAnnouncesForUsers: getUsersAnnounce,
  DeleteAnnounce: deleteAnnou,
  ExistAnnounce: existAnnoun,
  DeleteAnnounce_d: deleteAnnounce_d,
  updateDescrip: descrip,
  updateTitle: title,
} = require("../Service/announces");

const { SectionExists: exists } = require("../Service/section");

const { ExisteUser: existUser } = require("../Service/admin");

async function GetAnnounForSections(_, res) {
  try {
    const announces = await getAnnouncesSections();
    res.status(200).send(announces);
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!");
  }
}

async function GetAnnounForUsers(_, res) {
  try {
    const announces = await getUsersAnnounce();
    res.send(announces);
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function GetAnnnounceSection(req, res) {
  try {
    const { section_id } = req.query;

    const exist = await exists(section_id);

    if (!exist) {
      return res.status(401).json({ message: "No existe la seccion" });
    } else {
      const announce = await getSectionAnnounce(section_id);
      res.status(200).send(announce);
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function GetAnnounceUser(req, res) {
  try {
    const { user_id } = req.query;

    const user = await existUser(user_id);

    if (!user) {
      res.status(404).send("USER NOT FOUND!!");
    } else {
      const announe = await getUserAnnounce(user_id);
      res.status(200).send(announe);
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function CreateAnnounce(req, res) {
  try {
    const announce = req.body;

    const createAnnounce = await create(announce);
    res.status(200).send(createAnnounce);
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function DeleteAnnounce(req, res) {
  try {
    const { id } = req.query;

    const existId = await existAnnoun(id);

    if (!existId) {
      res.status(404).send("ID ANNOUNCE NOT EXIST!!");
    } else {
      await deleteAnnounce_d(id);
      await deleteAnnou(id);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
}

async function UpdateAnnounceTitle(req, res) {
  try {
    const { id } = req.query;
    const announce = req.body;

    await title(id, announce.title);
    res.status(200).send();
  } catch (exception) {
    res.status(500).send("INTERNAL SERVER ERROR");
  }
}

async function UpdateAnnounceDescrip(req, res) {
  try {
    const { id } = req.query;
    const announce = req.body;

    await descrip(id, announce.message);
    res.status(200).send();
  } catch (exception) {
    res.status(500).send("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  GetAnnnounceSection,
  GetAnnounForSections,
  GetAnnounForUsers,
  GetAnnounceUser,
  CreateAnnounce,
  DeleteAnnounce,
  UpdateAnnounceTitle,
  UpdateAnnounceDescrip
};