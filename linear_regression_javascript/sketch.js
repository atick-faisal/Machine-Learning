
var time = [];
var value = [];
let _x = [];
let h = [];
let X = [];
let Y = [];
let err = [];
let dx = [];
///////////////////////////////////////////
let theta = zeros(2, 1);
let alpha = 0.05;
let num_iter = 1000;
///////////////////////////////////////////

function setup() {
    let canvas = createCanvas(800, 500);
    background(237);
}

function draw() {
    
}

function addDataPoint(x, y) {
    noStroke();
    fill(239, 83, 80);
    ellipse(x, y, 10, 10);
}

function normalize(x) {
    let norm_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        norm_x[i] = (x[i] - mean(x)) / std(x);
    }
    return norm_x;
}

function normalizeResultX(x) {
    let norm_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        norm_x[i] = (x[i] - mean(time)) / std(time);
    }
    return norm_x;
}

function normalizeResultY(x) {
    let norm_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        norm_x[i] = (x[i] - mean(value)) / std(value);
    }
    return norm_x;
}

function denormalize(x) {
    let norm_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        norm_x[i] = (x[i] * std(value)) + mean(value);
    }
    return norm_x;
}

function mapping(x) {
    let mapped_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        mapped_x[i] = map(x[i], 0, height, height, 0);
    }
    return mapped_x;
}

function featurize(x) {
    let n = x.length;
    let fea_x = ones(n, 2);
    for(let i = 0; i < n; i++) {
        fea_x[i][1] = x[i];
    }
    return fea_x;
}

function gradientDescent() {
    //console.log(reshape(Y, Y.length, 1));
    let m = Y.length;
    for(let i = 0; i < num_iter; i++) {
        err = sub(mul(X, theta), reshape(Y, Y.length, 1));
        //console.log(err);
        theta[0][0] = theta[0][0] - alpha * (1/m) * sum(err);
        //theta[0][0] = 0;
        theta[1][0] = theta[1][0] - alpha * (1/m) * sum(reshape(dot(err, _x), m, 1));
    }
}

function result() {
    dx = [0, width];
    dx = normalizeResultX(dx);
    dx = featurize(dx);
    H = mul(dx, theta);
    H = denormalize(H);
    h = mapping(H);
    stroke(2);
    line(0, h[0], width, h[1]);
}

function mousePressed() {
    let x = mouseX;
    let y = mouseY;
    addDataPoint(x, y);

    //==================================//
    time.push(x);
    value.push(map(y, 0, height, height, 0));
    //============================================//
    if(time.length > 1) {
        _x = normalize(time);
        X = featurize(_x);
        Y = normalize(value);
        gradientDescent();
        result();
    }
}