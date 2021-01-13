const db = require("../util/util");

const TBL_USER = "USE";
const TBL_USERTYPE = "USERTYPE"

module.exports = {
    //#region ConfigCourseType
    getUsertypes : () => 
        db.load(`select * from ${TBL_USERTYPE} where IsDeleted = 0`),
    getCourseTypeId : (Type) => 
        db.load(`select Id from ${TBL_USERTYPE} where IsDeleted = 0 and Role  = '${Type}'`),
    //#endregion
    //#region ConfigCourse
  all: () => db.load(`select * from ${TBL_USER} where IsDeleted = 0`),

  getUsersByUserType : (typeId) =>
    db.load(`select * from ${TBL_COURSE} where IsDeleted = 0 and Role = '${typeId}'`),

  single: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where IsDeleted = 0 and ID = '${id}'`
    );
    if (rows.length == null) return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, TBL_COURSE),
  updateRole : (id,role) => 
    db.patch(`Update ${TBL_COURSE} set Role = '${role}' where Id = '${id}'`),


  //#endregion
};