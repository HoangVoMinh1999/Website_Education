const db = require("../util/util");

const TBL_COURSE = "ConfigCourse";
const TBL_COURSETYPE = "ConfigCourseType"

module.exports = {
    //#region ConfigCourseType
    getConfigCoursetypes : () => 
        db.load(`select * from ${TBL_COURSETYPE} where IsDeleted = 0`),
    getCourseTypeId : (Type) => 
        db.load(`select Id from ${TBL_COURSETYPE} where IsDeleted = 0 and Name = '${Type}'`),
    getCourseTypeById : (Id) =>
    db.load(`select Name from ${TBL_COURSETYPE} where IsDeleted = 0 and Id = '${Id}'`),
    //#endregion
    //#region ConfigCourse
  all: () => db.load(`select * from ${TBL_COURSE} where IsDeleted = 0`),


  getCourseByCourseTypeId : (courseTypeId) =>
    db.load(`select * from ${TBL_COURSE} where IsDeleted = 0 and ConfigCourseTypeId = '${courseTypeId}'`),

  single: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where IsDeleted = 0 and ID = '${id}'`
    );
    if (rows.length == null) return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, TBL_COURSE),
  delete : (id) =>
    db.patch(`Update ${TBL_COURSE} set Isdeleted = 1 where Id = '${id}'`),

  updateViews : (id,view) => 
    db.patch(`Update ${TBL_COURSE} set Views = '${view}' where Id = '${id}'`),

  updateCourses : (entityID,entityName,entityIntro,entityDescription,entityPrice,entityMaxStudents,entityCurrentStudents,entityLog_UpdatedDate,entityStatus) = 
    db.patch(`UPDATE ${TBL_COURSE} set Name = ${entityName} , Intro = ${entityIntro} , Description = ${entityDescription} , Price = ${entityPrice}, MaxStudents = ${entityMaxStudents}, CurrentStudents = ${entityCurrentStudents} , Log_UpdatedDate = ${entityLog_UpdatedDate} , Status = ${entityStatus} where Id = ${entityID}`),

  // Get 10 latest coures
  get10LatestCourses: () =>
    db.load(`select * from ${TBL_COURSE} where IsDeleted = 0 order by ID desc limit 10`),

  // Get 10 most viewed courses
  get10MostViewedCourses: () =>
    db.load(`select * from ${TBL_COURSE} where IsDeleted = 0 order by views limit 10`),

  // Get quantity by category
  getQuantityByCategory: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where IsDeleted = 0 and ConfigCourseTypeId = ${id}`
    );
    if (rows.length == null) return null;
    return rows;
  },
  //#endregion
};