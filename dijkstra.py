def dijkstra(edges, start_node, target_node):


    nodes = set(x[0] for x in edges)
    distances = {x[0]: float('inf') for x in edges}
    previous_nodes = {x[0]: None for x in edges}
    animation_order = []

    # ----------------------

    open_nodes = nodes.copy()
    #start_node = "a"
    distances[start_node] = 0
    while len(open_nodes) != 0:
        current_node = min(open_nodes, key= lambda u: distances[u])
        if distances[current_node] == float('inf'):
            break


        neighbours = get_all_neighbours(current_node, edges)

        for (neighbour, cost) in neighbours:

            if distances[neighbour] > distances[current_node] + cost:
                distances[neighbour] = distances[current_node] + cost
                previous_nodes[neighbour] = current_node
        animation_order.append(current_node)
        open_nodes.remove(current_node)
        if target_node == current_node:
            break


    solution = [target_node]
    temp = target_node
    while previous_nodes[temp] is not None:
        solution.append(previous_nodes[temp])
        temp = previous_nodes[temp]
    solution.reverse()

    return animation_order, solution



def get_all_neighbours(node, edges):

    neighbours = [(x[1], x[2]) for x in edges if x[0] == node]
    return neighbours





