function y = generateData(x, noise)
    % tangent and intercept
    m = 0.5;
    c = 10;
    % equation of a straight line with some noise
    n = length(x);
    y = zeros(1, n);
    for i = 1:n
        y(i) = m * x(i) + c + noise * rand(1);
    end
end

