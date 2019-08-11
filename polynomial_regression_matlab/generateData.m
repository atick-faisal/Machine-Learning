function y = generateData(x, noise)
    % tangent and intercept
    a = 5;
    b = 1;
    c = 4;
    d = 1;
    % equation of a straight line with some noise
    n = length(x);
    y = zeros(1, n);
    for i = 1:n
        y(i) = a *  (x(i) ^ 3) + b * (x(i) ^ 2) + c * x(i) + d + noise * rand(1);
    end
end

