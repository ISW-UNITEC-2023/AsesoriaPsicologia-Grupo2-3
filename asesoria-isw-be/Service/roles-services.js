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
async function createRole(role) {
  const [id_role] = await knex("roles").insert({
    name_role: role.name,
    description_role: role.description,
    user_creator: role.creator,
  });
  return id_role;
}

async function assignPrivilegesToRole(roleId, privilegeId, creator) {
  const role = await knex("roles").select().where("id_role", roleId);
  if (!role) {
    throw new Error("Role not found");
  }

  const privileges = await knex("privileges")
    .select()
    .where("id_privilege", privilegeId);
  if (!privileges) {
    throw new Error("Privileges not found");
  }

  return await knex("roles_privileges").insert({
    id_role: roleId,
    id_privilege: privilegeId,
    user_creator: creator,
  });
}

async function updateRoleName(id, name, editor) {
  return knex("roles").where({ id_role: id }).update({
    name_role: name,
    user_editor: editor,
    last_modification: new Date(),
  });
}

async function updateRoleDescription(id, description, editor) {
  return knex("roles").where({ id_role: id }).update({
    description_role: description,
    user_editor: editor,
    last_modification: new Date(),
  });
}

//Get
async function getRoles() {
  let roles = await knex.select("*").from("roles");
  roles = JSON.stringify(roles);
  return JSON.parse(roles);
}

async function getRolePrivileges(id) {
  // , p.id_elemento, p.privilege, p.user_creator, p.user_editor, p.creation_date, p.last_modification
  let rolesPrivileges = await knex.raw(
    `SELECT p.id_privilege 
      FROM roles_privileges rp 
        INNER JOIN privileges p 
          ON rp.id_privilege = p.id_privilege 
            WHERE rp.id_role = ?`, [id]
  );
  rolesPrivileges = JSON.stringify(rolesPrivileges[0]);
  //console.log("Roles Service Response", rolesPrivileges);
  return JSON.parse(rolesPrivileges);
}

async function getRolePrivilegesByElement(id_role, id_element) {
  // , p.id_elemento, p.privilege, p.user_creator, p.user_editor, p.creation_date, p.last_modification
  try {
    console.log(id_role, id_element);
    let rolesPrivileges = await knex.select("roles_privileges.id_privilege")
    .from("roles_privileges")
    .innerJoin("privileges", "roles_privileges.id_privilege", "=", "privileges.id_privilege")
    .where("roles_privileges.id_role", "=", id_role).andWhere("id_elemento", "=", 'zoom');
    console.log("Roles Service Response", rolesPrivileges);
    rolesPrivileges = JSON.stringify(rolesPrivileges);
    return JSON.parse(rolesPrivileges);
  } catch (e) {
    console.log(e);
    return("Error al cargar los privilegios");
  }
}

//Delete
async function deleteRole(id) {
  try {
    await knex("roles").where("id_role", id).del();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removePrivilegeFromRole(idRole, idPrivilege) {
  try {
    await knex("roles_privileges")
      .select()
      .where({
        id_role: idRole,
        id_privilege: idPrivilege,
      })
      .del();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createRole,
  assignPrivilegesToRole,
  getRoles,
  getRolePrivileges,
  updateRoleName,
  updateRoleDescription,
  deleteRole,
  removePrivilegeFromRole,
  getRolePrivilegesByElement
};
