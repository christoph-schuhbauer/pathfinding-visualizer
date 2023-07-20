from flask import Flask, render_template, request, jsonify, make_response
import dijkstra as dijk
import a_star as ast
import breadth_first_search as bfs
app = Flask(__name__)
from datetime import datetime

@app.route("/", methods=["GET", "POST"])
def index():

    return render_template("index.html")

@app.route("/dijkstra", methods=["POST"])
def dijkstra():

    data = request.get_json()

    edges = data[0]
    start = data[1]
    target = data[2]
    #print(start, target)

    start_time = datetime.now()
    visited_nodes, solution = dijk.dijkstra(edges, start, target)
    end_time = datetime.now()
    execution_time = round(((end_time - start_time).total_seconds() * 1000), 2)
    print('Duration: {}'.format(end_time - start_time))
    print('Distance: {}'.format(len(solution)))
    print('Checked: {}'.format(len(visited_nodes)))

    return make_response(jsonify([visited_nodes, solution, execution_time]), 200)


@app.route("/astar", methods=["POST"])
def astar():

    data = request.get_json()

    nodes = data[0]
    start = data[1]
    target = data[2]
    #print(nodes)
    #print(start)
    #print(target)
    start_time = datetime.now()
    visited_nodes, solution = ast.a_star(nodes, start, target)
    end_time = datetime.now()
    execution_time = round(((end_time - start_time).total_seconds() * 1000), 2)
    print('Duration: {}'.format(end_time - start_time))
    print('Distance: {}'.format(len(solution)))
    print('Checked: {}'.format(len(visited_nodes)))


    return make_response(jsonify([visited_nodes, solution, execution_time]), 200)




@app.route("/breadthfirstsearch", methods=["POST"])
def breadth_first_search():

    data = request.get_json()

    edges = data[0]
    start = data[1]
    target = data[2]

    start_time = datetime.now()
    visited_nodes, solution = bfs.breadth_first_search(edges, start, target)
    end_time = datetime.now()
    execution_time = round(((end_time - start_time).total_seconds() * 1000), 2)

    print('Duration: {}'.format(end_time - start_time))
    print('Distance: {}'.format(len(solution)))
    print('Checked: {}'.format(len(visited_nodes)))

    return make_response(jsonify([visited_nodes, solution, execution_time]), 200)







'''
[['0-0', '1-0', 1], ['0-0', '0-1', 1], ['0-1', '1-1', 1], ['0-1', '0-0', 1], ['0-1', '0-2', 1], ['0-2', '1-2', 1], ['0-2', '0-1', 1],
 ['1-0', '0-0', 1], ['1-0', '2-0', 1], ['1-0', '1-1', 1], ['1-1', '0-1', 1], ['1-1', '2-1', 1], ['1-1', '1-0', 1], ['1-1', '1-2', 1],
 ['1-2', '0-2', 1], ['1-2', '2-2', 1], ['1-2', '1-1', 1], ['2-0', '1-0', 1], ['2-0', '2-1', 1], ['2-1', '1-1', 1], ['2-1', '2-0', 1],
 ['2-1', '2-2', 1], ['2-2', '1-2', 1], ['2-2', '2-1', 1]]
'''