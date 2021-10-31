#!/usr/bin/env python

'''API library to access information about books and authors'''

import os
import json
import flask
from flask_cors import CORS

from dotenv import load_dotenv
from flask import request, jsonify
from database_manager import connect_to_db, insert_into_table, select_data, execute_sql_command, convert_dict_to_query, create_update_query

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'
app.config['DEBUG'] = True
load_dotenv()
username = os.getenv('username')
passwd = os.getenv('passwd')
con, cursor = connect_to_db("localhost", username, passwd, "cs411")

@app.route('/', methods=['GET', 'PUT', 'POST', 'DELETE'])
def home():

    ''' Home page'''

    return "<h1>Covid Appointment Scheduling</h1>"

@app.route('/api/select', methods=['GET'])
def api_select_data():
    data = {}
    if 'query' not in request.args:
        data['Error'] = "No query provided. Please specify a query."
        return data, 400
    query = request.args['query']
    if query[0] == '\'':
        query = query[1 : -1]
    print(query)
    records, field_names = select_data(query, con, cursor)
    data['data'] = []
    for row in records:
        data_row = {}
        for idx, value in enumerate(row):
            data_row[field_names[idx]] = value
        data['data'].append(data_row)
    return jsonify(data), 200

@app.route('/api/post', methods=['POST'])
def api_add_data():
    table_name = request.args['table']
    data = request.data.decode("utf-8").replace("\'", "\"")
    data = json.loads(data)
    print(data)
    query = convert_dict_to_query(table_name, data)
    failed = False
    print(query)
    if execute_sql_command(cursor, con, query):
        failed = False
    else:
        failed = True
    if not failed:
        return "Successfully added entry", 200
    return "Failed to add entry", 400

@app.route('/api/put', methods=['PUT'])
def api_update_data():
    table_name = request.args['table']
    key = request.args['key']
    id = request.args['id']
    data = request.data.decode("utf-8").replace("\'", "\"")
    data = json.loads(data)
    query = create_update_query(table_name, data, key, id)
    print(query)
    if execute_sql_command(cursor, con, query):
        failed = False
    else:
        failed = True
    if not failed:
        return "Successfully updated entry", 200
    return "Failed to update entry", 400

@app.route('/api/delete', methods=['DELETE'])
def api_delete_data():
    table_name = request.args['table']
    key = request.args['key']
    id = request.args['id']
    query = "DELETE FROM " + table_name + " WHERE " + key + " = \'" + id + "\'"
    print(query)
    if execute_sql_command(cursor, con, query):
        failed = False
    else:
        failed = True
    if not failed:
        return "Successfully deleted entry", 200
    return "Failed to delete entry", 400

@app.errorhandler(404)
def page_does_not_exist(error):

    ''' Page shown when url invalid'''

    return "<h1>404</h1><p>The page does not exist.</p>", 404

if __name__ == '__main__':
    app.run()
