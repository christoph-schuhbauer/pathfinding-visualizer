// important consts

let board_height = 30;
let board_width = 60;
let board = document.getElementById("board");


window.onload = (event) => {
  init();
  let start = document.getElementById("0-0");
  start.classList.add("start");

  let finish = document.getElementById("25-55");
  finish.classList.add("finish");
};

// setup

function init(){

    const table = document.createElement("table");
    for (let i = 0; i< board_height; i++){

        let newtr = table.insertRow(-1);
        for (let j = 0; j< board_width; j++){
            let td = newtr.insertCell(-1);
            let tile = document.createElement("div");
            tile.className = "tile";
            td.appendChild(tile);
            tile.id = String(i) + "-" + String(j);
        }
    }

    board.appendChild(table);
    document.addEventListener('mouseover', e => {
        if (e.target.className == "tile" && e.buttons == 1){
            e.target.classList.add("wall");
        }
        if (e.target.className == "wall" && e.buttons == 1){
            e.target.className == "tile";
        }


    });
}

function reset(){

    list_of_tiles = document.getElementsByClassName("tile");
    for (let i =0; i< list_of_tiles.length; i++){
        tile = list_of_tiles[i];
        tile.className = "tile";
    }

    let start = document.getElementById("0-0");
    start.classList.add("start");

    let finish = document.getElementById("4-4");
    finish.classList.add("finish");


}


function reset_visualization(){
    list_of_tiles = document.getElementsByClassName("tile");
    for (let i =0; i< list_of_tiles.length; i++){

        let tile = list_of_tiles[i];
        if (tile.classList.contains("path") || tile.classList.contains("lookedat")){
            tile.className = "tile";
        }
    }
    set_infos("0", "0");
}



function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}



// change dropdown text function
function change_dropdown_text(name){
    let dropdown_text = document.getElementById("algo_text");
    dropdown_text.text = name;
}



function add_data(time, distance, work_down){




    let data_table = document.getElementById("data_table");


    if( data_table.rows.length == 4){
        data_table.deleteRow(-1);
    }


    let row = data_table.insertRow(1);

    let cell = row.insertCell(0);
    let time_data = document.createElement("div");
    time_data.innerText = work_down;
    cell.appendChild(time_data);

    let cell2 = row.insertCell(0);
    let distance_data = document.createElement("div");
    distance_data.innerText = distance;
    cell2.appendChild(distance_data);

    let cell3 = row.insertCell(0);
    let work_down_data = document.createElement("div");
    work_down_data.innerText = time;
    cell3.appendChild(work_down_data);


}






// draw visited_nodes function
async function draw_visited_nodes(visited_nodes){

    for (let i =0; i< visited_nodes.length; i++){
        let tile = document.getElementById(visited_nodes[i]);

        if (tile.classList.contains("start") || tile.classList.contains("finish") || tile.classList.contains("path")){
            continue;
        }
        await delay(20);
        tile.classList.add("lookedat");
    }
}



// draw solution function
async function draw_solution(solution){                             // start at 1 because at 0 is null

    console.log(solution);
    for (let i =0; i< solution.length; i++){
        let path_tile = document.getElementById(solution[i]);

        if (path_tile.classList.contains("start") || path_tile.classList.contains("finish")){
                continue;
        }

            path_tile.classList.remove("lookedat");
            path_tile.classList.add("path");
            await delay(40);
        }

}

// combine drawing function
async function combine_drawing(visited_nodes, solution){


    let end = document.getElementById(solution[solution.length -2]);
    end.addEventListener("animationend", function (){
        draw_solution(solution);
    }, {once : true});

    draw_visited_nodes(visited_nodes);


}



// create graph1 function
function create_graph(){


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
    //console.log(edges);
    return graph;

}


// decider function
function visualize(){



    let algorithm_name = document.getElementById("algo_text").text;

    if (algorithm_name == 'Dijkstras Algorithm'){
        graph = create_graph();
        console.log(graph);
        sending('http://192.168.0.232:5000/dijkstra', graph);
    }
    if (algorithm_name == 'A* Algorithm'){
        //do stuff 'http://192.168.0.232:5000/astar'
        graph = create_graph();
        console.log(graph);
        sending('http://192.168.0.232:5000/astar', graph);
    }

    if (algorithm_name == 'Breadth First Search'){
        //do stuff 'http://192.168.0.232:5000/astar'
        graph = create_graph();
        console.log(graph);
        sending('http://192.168.0.232:5000/breadthfirstsearch', graph);
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
    .then(data => handle_response(data));
    //.then(data => combine_drawing(data[0], data[1]));                   // data[0]= search info  // data[1] = solution

}


function handle_response(data){

    combine_drawing(data[0], data[1])
    set_infos(data[2], data[1].length)
    add_data(data[2], data[1].length, data[0].length);

}



function set_infos(time, distance){

    let time_element = document.getElementById("timer");
    let distance_element = document.getElementById("distance");
    console.log(time_element.text);
    time_element.text = time + " milliseconds";
    distance_element.text = distance + " length units";

}



function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//left right lines
function do_maze(){

    var args = Array.prototype.slice.call(arguments);
    let left = 0;
    let top = 0;
    let right = 59;
    let bottom = 29;


    if (args.length == 4){
        top = args[0];
        bottom = args[1],
        left = args[2];
        right = args[3];
    }


    if ((bottom - top) < 3){
        console.log("stop");
        return;
    }
    if ((right - left) < 3){
        console.log("stop");
        return;
    }


    // new points
    let cutline_tb = getRndInteger(top+2, bottom-2);
    let cutline_lr = getRndInteger(left+2, right-2);


    let new_top = top;
    let new_bottom = cutline_tb;
    let new_left = left;
    let new_right = right;

    let new_top2 = cutline_tb;
    let new_bottom2 = bottom;
    let new_left2 = left;
    let new_right2 = right;

    //console.log(new_top, new_bottom, new_left, new_right, cutline_tb);
    //console.log(new_top2, new_bottom2, new_left2, new_right2, cutline_tb);



    let new_top3 = top;
    let new_bottom3 = bottom;
    let new_left3 = left;
    let new_right3 = cutline_lr;

    let new_top4 = top;
    let new_bottom4 = bottom;
    let new_left4 = cutline_lr;
    let new_right4 = right;

    console.log(new_top3, new_bottom3, new_left3, new_right3);
    console.log(new_top4, new_bottom4, new_left4, new_right4);

    let gap = getRndInteger(top+1, bottom-1);


    for(let i = top; i< bottom+1; i++){

        if(i == gap){
            continue;
        }
        let tile_id = String(i) + "-" + String(cutline_lr);
        console.log(tile_id);
        document.getElementById(tile_id).classList.add("wall");
    }


    do_maze2(new_top3 , new_bottom3, new_left3 + 1, new_right3 - 1);
    do_maze2(new_top4, new_bottom4, new_left4 + 1, new_right4 - 1);






}



function do_maze2(){

    var args = Array.prototype.slice.call(arguments);
    let left = 0;
    let top = 0;
    let right = 59;
    let bottom = 29;


    if (args.length == 4){
        top = args[0];
        bottom = args[1],
        left = args[2];
        right = args[3];
    }


    if ((bottom - top) < 3){
        console.log("stop");
        return;
    }
    if ((right - left) < 3){
        console.log("stop");
        return;
    }


    // new points
    let cutline_tb = getRndInteger(top+2, bottom-2);
    let cutline_lr = getRndInteger(left+2, right-2);


    let new_top = top;
    let new_bottom = cutline_tb;
    let new_left = left;
    let new_right = right;

    let new_top2 = cutline_tb;
    let new_bottom2 = bottom;
    let new_left2 = left;
    let new_right2 = right;

    //console.log(new_top, new_bottom, new_left, new_right, cutline_tb);
    //console.log(new_top2, new_bottom2, new_left2, new_right2, cutline_tb);



    let new_top3 = top;
    let new_bottom3 = bottom;
    let new_left3 = left;
    let new_right3 = cutline_lr;

    let new_top4 = top;
    let new_bottom4 = bottom;
    let new_left4 = cutline_lr;
    let new_right4 = right;

    console.log(new_top3, new_bottom3, new_left3, new_right3);
    console.log(new_top4, new_bottom4, new_left4, new_right4);


    let gap  = getRndInteger(left+1, right-1);

    for(let i = left; i< right+1; i++){

        if (gap == i){
            continue;
        }
        let tile_id = String(cutline_tb) + "-" + String(i);
        console.log(tile_id);
        document.getElementById(tile_id).classList.add("wall");
    }


    //do_maze(new_top3 , new_bottom3, new_left3 + 2, new_right3 - 2);
    //do_maze(new_top4, new_bottom4, new_left4 + 2, new_right4 - 2);


    do_maze(new_top + 1 , new_bottom - 1, new_left, new_right);
    do_maze(new_top2 + 1, new_bottom2 - 1, new_left2, new_right2);



}









