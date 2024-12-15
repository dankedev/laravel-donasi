FROM dunglas/frankenphp

RUN install-php-extensions \
    pcntl
    # Add other PHP extensions here...

RUN /bin/sh -c composer install --ignore-platform-reqs --no-dev -a
# RUN frankenphp php-cli artisan optimize
# RUN frankenphp php-cli artisan migrate
# RUN frankenphp php-cli artisan key:generate

COPY . /app



# RUN frankenphp php-server

ENTRYPOINT ["php", "artisan", "octane:frankenphp"]
