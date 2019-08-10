function J = costf(x, y, theta)
    n = length(y);
    h = hypothesis(x, theta);
    J = (1 / (2 * n)) * sum((h - y) .^ 2);
end

