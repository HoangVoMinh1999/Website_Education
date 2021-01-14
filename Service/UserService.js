const db = require("../util/util");

const TBL_USER = "USER";
const TBL_USERTYPE = "USERTYPE"

module.exports = {
    //#region UserType
    getUsertypes: () =>
        db.load(`select * from ${TBL_USERTYPE} where IsDeleted = 0`),
    getUserType: (id) =>
        db.load(`select * from ${TBL_USERTYPE} where IsDeleted = 0 and Id = ${id}`),
    getUserTypeId: (Type) =>
        db.load(`select Id from ${TBL_USERTYPE} where IsDeleted = 0 and Role  = '${Type}'`),
    //#endregion
    //#region User
    all: () => db.load(`select * from ${TBL_USER} where IsDeleted = 0`),

    getUsersByUserType: (typeId) =>
        db.load(`select * from ${TBL_USER} where IsDeleted = 0 and Role = '${typeId}'`),

    single: async(id) => {
        const rows = await db.load(
            `select * from ${TBL_USER} where IsDeleted = 0 and ID = '${id}'`
        );
        if (rows.length == null) return null;
        return rows[0];
    },

    singleByUsername: async(username) => {
        const rows = await db.load(
            `select * from ${TBL_USER} where IsDeleted = 0 and Username = '${username}'`
        );
        if (rows.length == null) return null;
        return rows[0];
    },

    add: (entity) => db.add(entity, TBL_USER),

    delete: (id) =>
        db.patch(`Update ${TBL_USER} set IsDeleted = 1 where Id = '${id}'`),

    updateUser: (entityID, entityRole, entityStatus, entityLog_UpdatedDate) =>
        db.patch(`UPDATE ${TBL_USER} set Role = '${entityRole}', Status = '${entityStatus}', Log_UpdatedDate = '${entityLog_UpdatedDate}' where Id = '${entityID}'`),


    //#endregion
};