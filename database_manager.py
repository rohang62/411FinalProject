import pymysql
import datetime

def connect_to_db(host, user, passwd, db):
    try:
        con = pymysql.connect(host = host, user = user, password = passwd, database = db)
        cursor = con.cursor()
        return con, cursor
    except pymysql.MySQLError as e:
        print(e)
        print("there was an error connecting to db" + str(e))

def create_table(table_desc, con, cursor):
    query = "CREATE TABLE IF NOT EXISTS " + table_desc
    try:
        cursor.execute(query)
        con.commit()
    except Exception as e:
        con.rollback()
        print("there was an error" + str(e))
    return

def delete_table(table_name, con, cursor):
    query = "DROP TABLE IF EXISTS " + table_name
    try:
        cursor.execute(query)
        con.commit()
    except Exception as e:
        con.rollback()
        print("there was an error" + str(e))
    return

def insert_into_table(table_name, values, con, cursor):
    query = "INSERT INTO " + table_name + " VALUES" + str(values)
    try:
        cursor.execute(query)
        con.commit()
    except Exception as e:
        con.rollback()
        print("there was an error" + str(e))
    return

def select_data(query, con, cursor):
    try:
        cursor.execute(query)
        resultList = cursor.fetchall()
        res = []
        for row in resultList:
            l = list(row)
            for i in range(len(row)):
                if isinstance(row[i], datetime.date) or isinstance(row[i], datetime.timedelta):
                    l[i] = str(row[i])
            res.append(l)
        field_names = [i[0] for i in cursor.description]
        return res, field_names
    except Exception as e:
        print ("Encountered error while retrieving data from database"+str(e))

def execute_sql_command(db_cursor, db_connection, query):
    try:
        print("hi", query)
        db_cursor.execute(query)
        db_connection.commit()
        return True
    except pymysql.err.OperationalError:
        return False
    except mysql.connector.errors.ProgrammingError:
        return False

def create_update_query(table_name, data, k, id):
    query = "UPDATE " + table_name + " SET "
    for key, value in data.items():
        query += key + " = "
        if isinstance(value, list):
            for i, val in enumerate(value):
                value[i] = val.replace(',', ' -')
            value = str(value)
            value = value.replace('[', '')
            value = value.replace(']', '')
            value = value.replace(',', ';')
            value = value.replace('\'', '')
            value = value.replace('\"', '')
            query += '\'' + value + '\'' + ", "
        elif isinstance(value, str):
            value = value.replace('\'', '\'\'')
            query += '\'' + value + '\'' + ", "
        else:
            query += str(value) + ", "

    query = query[ : -2]
    query += " WHERE " + k + " = \'" + id + "\'"
    return query

def create_procedure_query(type, data):
    query = "CALL " + type + "("
    for key, value in data.items():
        if isinstance(value, list):
            for i, val in enumerate(value):
                value[i] = val.replace(',', ' -')
            value = str(value)
            value = value.replace('[', '')
            value = value.replace(']', '')
            value = value.replace(',', ';')
            value = value.replace('\'', '')
            value = value.replace('\"', '')
            query += '\'' + value + '\'' + ", "
        elif isinstance(value, str):
            value = value.replace('\'', '\'\'')
            query += '\'' + value + '\'' + ", "
        else:
            query += str(value) + ", "

    query = query[ : -2]
    query += ");"
    return query

def convert_dict_to_query(table_name, values_dict):
    values = "VALUES("
    columns = table_name + "("
    dup_values = ""
    for key, value in values_dict.items():
        columns += key + ", "
        dup_values += key + "="
        if isinstance(value, list):
            for i, val in enumerate(value):
                value[i] = val.replace(',', ' -')
            value = str(value)
            value = value.replace('[', '')
            value = value.replace(']', '')
            value = value.replace(',', ';')
            value = value.replace('\'', '')
            value = value.replace('\"', '')
            values += '\'' + value + '\'' + ", "
            dup_values += '\'' + value + '\'' + ", "
        elif isinstance(value, str):
            value = value.replace('\'', '\'\'')
            values += '\'' + value + '\'' + ", "
            dup_values += '\'' + value + '\'' + ", "
        else:
            values += str(value) + ", "
            dup_values += str(value) + ", "
    columns = columns[:-2]
    columns += ")"
    values = values[:-2]
    values += ")"
    dup_values = dup_values[:-2]
    return "INSERT INTO " + columns + " " + values + " ON DUPLICATE KEY UPDATE " + dup_values
