from flask import Flask, render_template, request, jsonify, make_response
import dijkstra as dijkstra_algorithm
import a_star as a_star_algorithm
import breadth_first_search as bfs_algorithm
from datetime import datetime

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():

    return render_template("index.html")


@app.route("/dijkstra", methods=["POST"])
def dijkstra():

    data = request.get_json()

    edges = data[0]
    start = data[1]
    target = data[2]

    start_time = datetime.now()
    visited_nodes, solution = dijkstra_algorithm.dijkstra(edges, start, target)
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
    start_time = datetime.now()
    visited_nodes, solution = a_star_algorithm.a_star(nodes, start, target)
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
    visited_nodes, solution = bfs_algorithm.breadth_first_search(edges, start, target)
    end_time = datetime.now()
    execution_time = round(((end_time - start_time).total_seconds() * 1000), 2)

    print('Duration: {}'.format(end_time - start_time))
    print('Distance: {}'.format(len(solution)))
    print('Checked: {}'.format(len(visited_nodes)))

    return make_response(jsonify([visited_nodes, solution, execution_time]), 200)

