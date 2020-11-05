apps : [
    {
        name          : 'tmc-frontend',
        script        : 'npx',
        interpreter   : 'none',
        args          : 'serve -s -C build -l 3000',
        env_production : {
            NODE_ENV: 'production'
        }
    }
]