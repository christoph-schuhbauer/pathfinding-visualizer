
def breadth_first_search(edges, start, target):

    nodes = set(edge[0] for edge in edges)
    previous_nodes = {edge[0]: None for edge in edges}
    closed_nodes = []
    open_nodes = [start]

    while len(open_nodes) != 0:

        current = open_nodes.pop(0)
        closed_nodes.append(current)
        if current == target:
            break

        neighbours = get_neighbours(current, edges)

        for neighbour in neighbours:

            if neighbour not in open_nodes:
                if neighbour not in closed_nodes:
                    previous_nodes[neighbour] = current
                    open_nodes.append(neighbour)

    solution = [target]
    temp = target
    while previous_nodes[temp] is not None:
        solution.append(previous_nodes[temp])
        temp = previous_nodes[temp]
    solution.reverse()

    return closed_nodes, solution


def get_neighbours(node, edges):

    neighbours = []

    for edge in edges:
        if edge[0] == node:
            neighbours.append(edge[1])

    return neighbours
