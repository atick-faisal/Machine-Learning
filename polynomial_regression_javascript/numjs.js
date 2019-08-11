function sum(x) {
    let n = x.length;
    let sum = 0;
    if(x[0].length) {
        for(let i = 0; i < n; i++) {
            sum = sum + x[i][0];
        }
    } else {
        for(let i = 0; i < n; i++) {
            sum = sum + x[i];
        }
    }
    return sum;
}

function mean(x) {
    let n = x.length;
    let sum = 0;
    if(x[0].length) {
        for(let i = 0; i < n; i++) {
            sum = sum + x[i][0];
        }
    } else {
        for(let i = 0; i < n; i++) {
            sum = sum + x[i];
        }
    }
    let avg = sum / n;
    return avg;
}

function std(x) {
    let n = x.length;
    let sum = 0;
    if(x[0].length) {
        for(let i = 0; i < n; i++) {
            sum = sum + Math.pow(x[i][0] - mean(x), 2);
        }
    } else {
        for(let i = 0; i < n; i++) {
            sum = sum + Math.pow(x[i] - mean(x), 2);
        }
    }
    let sdev = Math.sqrt(sum / (n - 1));
    return sdev;
}

function add(x, y) {
    m = x.length;
    n = y[0].length;

    let M = zeros(m, n);

    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            M[i][j] = x[i][j] + y[i][j];
        }
    }
    return M;
}

function sub(x, y) {
    m = x.length;
    n = y[0].length;

    let M = zeros(m, n);

    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            M[i][j] = x[i][j] - y[i][j];
        }
    }
    return M;
}

function mul(x, y) {
    m = x.length;
    n = y[0].length;
    p = y.length;

    let M = zeros(m, n);

    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            for(let k = 0; k < p; k++) {
                M[i][j] += x[i][k] * y[k][j];
            }
        }
    }
    return M;
}

function dot(x, y) {
    m = x.length;

    let M = [];

    for(let i = 0; i < m; i++) {
        M[i] = x[i] * y[i];
    }
    return M;
}

function zeros(row, column) {
    let x = [];
    for(let i = 0; i < row; i++) {
        let entry = [];
        for(let j = 0; j < column; j++) {
            entry[j] = 0;
        }
        x[i] = entry;
    }
    return x;
}

function ones(row, column) {
    let x = [];
    for(let i = 0; i < row; i++) {
        let entry = [];
        for(let j = 0; j < column; j++) {
            entry[j] = 1;
        }
        x[i] = entry;
    }
    return x;
}

function reshape(x, row, column) {
    let y = zeros(row, column);
    let offset = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            y[i][j] = x[i + j + offset];
        }
        offset += (column - 1);
    }
    return y;
}

function linspace(start, end, n) {
    let x = [];
    let interval = (end - start) / (n - 1);
    for(let i = 0; i < n; i++) {
        x[i] = Math.floor(start + interval * i);
    }
    return x;
}

function powAll(x, pow) {
    let n = x.length;
    let y = [];
    for(let i = 0; i < n; i++) {
        y[i] = Math.pow(x[i], pow);
    }
    return y;
}