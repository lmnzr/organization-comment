import db from "./connection";
import * as logger from "../logger/logger";
import { QueryResult } from "pg";

export async function queryWithParam(
  query: string,
  values: any[]
): Promise<QueryResult> {
  if (query === "") {
    const error = "Database query string is empty";
    logger.serverError({ query: query, values: values, error: error });
    throw new Error(error);
  }
  if (values.length <= 0) {
    const error = "Database query params is empty";
    logger.serverError({ query: query, values: values, error: error });
    throw new Error(error);
  }
  try {
    const start = Date.now();
    const dbcon = db.getConnection();
    const result = await dbcon.query(query, values);
    const duration = Date.now() - start;
    logger.dbInfo({ query: query, values: values, duration: duration });
    return result;
  } catch (err) {
    logger.dbError({ query: query, values: values, error: err.message });
    throw new Error(`Database Query Error : ${err.message}`);
  }
}

export async function query(query: string): Promise<QueryResult> {
  if (query === "") {
    const error = "Database query string is empty";
    logger.serverError({ query: query, error: error });
    throw new Error(error);
  }
  try {
    const start = Date.now();
    const dbcon = db.getConnection();
    const result = await dbcon.query(query);
    const duration = Date.now() - start;
    logger.dbInfo({ query: query, duration: duration });
    return result;
  } catch (err) {
    logger.dbError({ query: query, error: err.message });
    throw new Error(`Database Query Error : ${err.message}`);
  }
}
