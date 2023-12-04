const actionServices = require("../Service/actions-services");
const userServices = require("../Service/users-services");

async function getActions(req, res){
    try {
        const actions = await actionServices.getActions();
        
        const actionsMandar = await Promise.all(
            actions.map(async (action) => {
                const name = await userServices.getUserCredentialsByid(action.user_id);
                return {
                    idactions: action.idactions,
                    user_name: name[0].name_user,
                    type_action: action.type_action,
                    table_action: action.table_action,
                    info_action: action.info_action,
                    datetime_action: action.datetime_action,
                }
            })
        );

        res.send(actionsMandar);
    } catch (e) {
        res.send({ error: "No fue posible obtener las acciones." });
    }
}

module.exports = {
    getActions,
  };