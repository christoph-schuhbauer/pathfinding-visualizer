// change dropdown text function
function change_dropdown_text(name){
    let dropdown_text = document.getElementById("algo_text");
    dropdown_text.text = name;
}


// draw visited_nodes function
async function draw_visited_nodes(visited_nodes){

    for (let i =0; i< visited_nodes.length; i++){
        let tile = document.getElementById(visited_nodes[i]);

        if (path_tile.classList.contains("start") || path_tile.classList.contains("finish") || path_tile.classList.contains("path")){
            continue;
        }
        await delay(20);
        path_tile.classList.add("lookedat");
    }
}



// draw solution function
async function draw_solution(solution){
    for (let i =0; i< solution.length; i++){
        let tile = document.getElementById(solution[i]);

        if (path_tile.classList.contains("start") || path_tile.classList.contains("finish")){
            continue;
        }
        path_tile.classList.add("path");
        await delay(20);
    }
}

// combine drawing function
async function combine_drawing(visited_nodes, solution){

    draw_visited_nodes(visited_nodes);
    draw_solution(solution);

}



// create graph1 function
function create_astar(){


    let edges = []

    let start = document.getElementsByClassName("start")[0];
    let finish = document.getElementsByClassName("finish")[0];



    list_of_tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < list_of_tiles.length; i++){
        let tile = list_of_tiles[i];
        if (tile.classList.contains("wall")){
            continue;
        }

        let coords = tile.id.split("-");
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);

        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];


        for(let j = 0; j < directions.length; j++){

            let side = directions[j];

            let new_x = x + side[0];
            let new_y = y + side[1];

            let neighbour = document.getElementById(String(new_x) + "-" + String(new_y));

            if ( neighbour == null){

            }else if (!neighbour.classList.contains("wall")){

                let edge = [];
                edge.push(tile.id);
                edge.push(neighbour.id);
                edge.push(1);
                edges.push(edge);
            }
        }
    }

    graph = [edges, start.id, finish.id];
    return graph;
    }


// create graph 2 function
function create_dijkstra(){


    let edges = [];

    let start = document.getElementsByClassName("start")[0];
    let finish = document.getElementsByClassName("finish")[0];

    list_of_tiles = document.getElementsByClassName("tile");
    console.log(list_of_tiles.length);
    for(let i = 0; i< list_of_tiles.length; i++){
        let tile = list_of_tiles[i];
        if (tile.classList.contains("wall")){
            continue;
        }
        let coords = tile.id.split("-");
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);

        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        for(let j = 0; j< directions.length; j++){

            let side = directions[j];

            let new_x = x + side[0];
            let new_y = y + side[1];

            let neighbour = document.getElementById(String(new_x) + "-" + String(new_y));

            if ( neighbour == null){

            }else if (!neighbour.classList.contains("wall")){
                let edge = [];
                edge.push(tile.id);
                edge.push(neighbour.id);
                edge.push(1);
                edges.push(edge);
            }
        }
    }


    graph = [edges, start.id, finish.id];
    console.log(edges);
    return graph;

}


// decider function
function visualize(){

    let algorithm_name = document.getElementById("algo_text").text;

    if (algorithm_name == 'Dijkstras Algorithm'){
        graph = create_dijkstra();
        sending('http://192.168.0.232:5000/dijkstra', graph);
    }
    if (algorithm_name == 'A* Algorithm'){
        //do stuff 'http://192.168.0.232:5000/astar'
        graph = create_astar;
        sending('http://192.168.0.232:5000/astar', graph);
    }

}



// sending function
function sending(url, graph){

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graph)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => combine_drawing(data[0], data[1]));                   // data[0]= search info  // data[1] = solution


}