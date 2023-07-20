import math

# start
# target
# edges = []
# edge = [name, neibour, g_cost, h_cost]


def get_neighbours(current_node, edges):


    neighbours = []
    for e in edges:
        if e[0] == current_node:
            neighbours.append((e[1], e[2]))
    return neighbours

def calc_h_cost(node, target):


    node_x = int(node.split("-")[0])
    node_y = int(node.split("-")[1])

    target_x = int(target.split("-")[0])
    target_y = int(target.split("-")[1])

    h_cost_x = math.sqrt((target_x - node_x)**2)
    h_cost_y = math.sqrt((target_y - node_y)**2)

    return h_cost_x + h_cost_y




def a_star(edges, start, target):

    #av_nodes = (edge[0] for edge in edges)
    g_costs = {edge[0]: float('inf') for edge in edges}
    #weights = {edge[0]: edge [2] for edge in edges}
    h_costs = {edge[0]: calc_h_cost(edge[0], target) for edge in edges}
    #f_costs = {edge[0]: g_costs[edge[0]] + h_costs[edge[0]] for edge in edges}
    #distances = {edge[0]: float('inf') for edge in edges}

    previous_nodes = {edge[0]: None for edge in edges}
    closed_nodes = []
    g_costs[start] = 0
    open_nodes = [start]

    while len(open_nodes) != 0:

        current = min(open_nodes, key= lambda x: g_costs[x] + h_costs[x])
        if current == target:
            break
        open_nodes.remove(current)
        closed_nodes.append(current)

        neighbours = get_neighbours(current, edges)


        for neighbour, cost in neighbours:


            if neighbour in closed_nodes:
                continue
            if (g_costs[current] + cost) < g_costs[neighbour]:


                previous_nodes[neighbour] = current
                g_costs[neighbour] = g_costs[current] + cost
                open_nodes.append(neighbour)





    path = [target]
    temp = target
    while previous_nodes[temp] is not None:
        path.append(previous_nodes[temp])
        temp = previous_nodes[temp]
    path.reverse()


    return closed_nodes, path




