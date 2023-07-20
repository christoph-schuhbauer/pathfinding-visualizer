import dijkstra
import a_star as a_st
import breadth_first_search as bfs

def test_run():

    edges = [['0-0', '1-0', 1], ['0-0', '0-1', 1], ['0-1', '1-1', 1], ['0-1', '0-0', 1], ['0-1', '0-2', 1],
              ['0-2', '1-2', 1], ['0-2', '0-1', 1],
              ['1-0', '0-0', 1], ['1-0', '2-0', 1], ['1-0', '1-1', 1], ['1-1', '0-1', 1], ['1-1', '2-1', 1],
              ['1-1', '1-0', 1], ['1-1', '1-2', 1],
              ['1-2', '0-2', 1], ['1-2', '2-2', 1], ['1-2', '1-1', 1], ['2-0', '1-0', 1], ['2-0', '2-1', 1],
              ['2-1', '1-1', 1], ['2-1', '2-0', 1],
              ['2-1', '2-2', 1], ['2-2', '1-2', 1], ['2-2', '2-1', 1]]

    start = '0-0'
    target = '2-2'

    previous = bfs.breadth_first_search(edges, start, target)
    print(previous)


if __name__ == '__main__':

    test_run()





