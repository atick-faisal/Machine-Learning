/* 
    Code    : Linear Regression 
    Author  : Atick Faisal
    License : MIT
*/

var order = 1;
var J = [];
var xData = [];
var yData = [];
var time = [];
var value = [];
var prediction = [];
///////////////////////////////////////////
let theta = zeros(order + 1, 1);
let alpha = 0.05;
let num_iter = 100;
///////////////////////////////////////////

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('sketch_holder');
    frameRate(7);
}

function draw() {
    background(47,52,63);
    drawPrediction();
    drawDataset(time, value);
}

function drawDataset(x, y) {
    noStroke();
    fill(54, 162, 235);
    for(let i = 0; i < x.length; i++) {
        let _y = map(y[i], 0, height, height, 0);
        ellipse(x[i], _y, 15, 15);
    }
}

function drawPrediction() {
    stroke(129, 199, 132);
    strokeWeight(2);
    let lineX = linspace(0, width, 100);
    for(let i = 0; i < 100; i++) {
        line(lineX[i], prediction[i], lineX[i + 1], prediction[i + 1]);
    }
}

function normalizeX(x) {
    let norm_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        norm_x[i] = (x[i] - mean(time)) / std(time);
    }
    return norm_x;
}

function normalizeY(y) {
    let norm_y = [];
    let n = y.length;
    for(let i = 0; i < n; i++) {
        norm_y[i] = (y[i] - mean(value)) / std(value);
    }
    return norm_y;
}

function denormalizeY(norm_y) {
    let y = [];
    let n = norm_y.length;
    for(let i = 0; i < n; i++) {
        y[i] = (norm_y[i] * std(value)) + mean(value);
    }
    return y;
}

function mapping(x) {
    let mapped_x = [];
    let n = x.length;
    for(let i = 0; i < n; i++) {
        mapped_x[i] = map(x[i], 0, height, height, 0);
    }
    return mapped_x;
}

function featurizeX(x) {
    let n = x.length;
    let fea_x = ones(n, 2);
    for(let i = 0; i <= order; i++) {
        //fea_x[i][1] = x[i];
        for(let j = 0; j < n; j++) {
            fea_x[j][i] = Math.pow(x[j], i);
        }
    }
    return fea_x;
}

function gradientDescent(X, Y) {
    let m = Y.length;
    for(let i = 0; i < num_iter; i++) {
        let err = sub(mul(X, theta), reshape(Y, Y.length, 1));
        J[i] = (1/(2*m)) * sum(dot(err, err));
        theta[0][0] = theta[0][0] - alpha * (1/m) * sum(err);
        for(j = 1; j <= order; j++) {
            let xx = powAll(normalizeX(time), j);
            theta[j][0] = theta[j][0] - alpha * (1/m) * sum(reshape(dot(err, xx), m, 1));
        }
        // theta[0][0] = theta[0][0] - alpha * (1/m) * sum(err);
        // theta[1][0] = theta[1][0] - alpha * (1/m) * sum(reshape(dot(err, normalizeX(time)), m, 1));
    }
}

function result() {
    let dx = featurizeX(normalizeX(linspace(0, width, 100)));
    prediction = mapping(denormalizeY(mul(dx, theta)));
}

function mousePressed() {
    if(mouseX < 800 && mouseY < 500) {
        let x = mouseX;
        let y = mouseY;
        time.push(x);
        value.push(map(y, 0, height, height, 0));
        if(time.length > 1) {
            let X = featurizeX(normalizeX(time));
            let Y = normalizeY(value);
            gradientDescent(X, Y);
            result();
            xData = linspace(1, num_iter, 6);
            for(let i = 0; i < 6; i++) {
                yData[i] = J[xData[i] - 1];
            }
            myChart.update();
        }
    }
}