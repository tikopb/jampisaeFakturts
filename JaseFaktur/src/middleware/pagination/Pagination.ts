import { Request, Response } from "express";
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const Db = require('@/config/db');

class Pagination{
  credential: {
    user_id: number
    };
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }

  /**
   * getting pagination data if where just client id than get with materilized view
   * @param {*} offset 
   * @param {*} limit 
   * @param {*} tableName 
   */
  PaginationGet = async(req: Request,tableName: Text) => {
    const WhereMap = await this.GetWhereMapOrm(req);
    let total_data = 0;
    let limit: number = parseInt(req.query.page_size as string) || 20;
    const page: number = parseInt(req.query.page as string) || 1;
    let offset: number = limit * (page - 1);
    
    if(Object.keys(WhereMap).length > 1){
      const sql:String = await this.GetWhereSql(req);
      total_data = await this.CountDataWithWhereParameter(tableName, sql);
      offset = 0;
    }else{
      total_data = await this.CountDataWithMaterialized(tableName);
    }
    let  total_page = Math.ceil(total_data / limit);
    if(total_page == 0){
      total_page = 1
    }
    const metadata = {
      page,
      limit,
      total_page,
      offset
    }

    return metadata;
  }

  /**
   * function making map for where decalare on function
   * @returns whereParameter
   */
  GetWhereMapOrm = async (req: Request): Promise<any> => {
    const searchParams = req.query;
    const whereClause: any = {
      [Op.or]: []
    };
  
    for (const param in searchParams) {
      if (searchParams.hasOwnProperty(param)) {
        const value = searchParams[param];
        if (param !== 'page') {
          if (param !== 'page_size') {
            whereClause[Op.or].push({ [param]: { [Op.iLike]: `%${value}%` } });
          }
        }
      }
    }
  
    return whereClause;
  };

  /**
   * user for write sql for pagination get
   * @param {*} req 
   * @returns 
   */
  GetWhereSql = async (req: Request): Promise<String>=> {
    const searchParams = req.query;
    let sql: String  = '';
    let i = 0;

    for (const key in searchParams) {
      if(key !== 'page'){
        if(key !=='page_size'){
          const value = (searchParams[key] as string).toLowerCase();
          sql += ` or lower ('${key}') like '%${value}%' `
        }
      }
    }
    return sql;
  }

  /**
   * getting data from materlized view use when not use where as parameter
   * @param {*} tableName 
   */
  CountDataWithMaterialized = async (tableName: Text) => {
    let sql = `select count("${tableName}_id") as count from ${tableName} `;
    console.log(sql)
    let count = await Db.query(sql,
        {
          type: QueryTypes.SELECT,
        },
      );
    return parseInt(count[0].count);;
  }

  /**
   * getting pagination need by counting table with where conditirion sql.
   * @param {*} tableName 
   */
  CountDataWithWhereParameter = async (tableName: Text, paramSql: String) => {

    let sql = `select count("${tableName}_id") as count from ${tableName} where 1=1 ${paramSql}` 
    let count = await sequelize.query(sql,
      {
        type: QueryTypes.SELECT,
      },
    );
    return parseInt(count[0].count);;
  }
  
}

export default Pagination;
