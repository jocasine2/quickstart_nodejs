#!/bin/bash

# Função para verificar e criar o arquivo .env se necessário
create_env_file() {
  if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "Arquivo .env não encontrado, ${green}criado novo .env a partir de .env.example${reset}"
  fi
}

# Verificar e criar o arquivo .env se necessário
create_env_file

#funções uteis
function getEnv(){
    eval "$(
    cat .env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
        key=$(echo "$line" | cut -d '=' -f 1)
        value=$(echo "$line" | cut -d '=' -f 2-)
        echo "export $key=\"$value\""
    done
    )"
}

getEnv

function user_docker(){
    if id -nG "$USER" | grep -qw "docker"; then
        echo $USER belongs to docker group
    else
        sudo usermod -aG docker ${USER}
        echo $USER has added to the docker group
    fi
}

function enter(){
    docker exec -it $@ bash
}

function app(){
    if [ $1 == "new" ]; then
        echo criando $2
        new_app
        app_turbolink_remove
        atualiza_nome_app $2
        docker-compose up -d
    elif [ $1 == "enter" ]; then
        enter $APP_NAME'_app'
    elif [ $1 == "scaffold" ]; then
        app_scaffold ${*:2}
    elif [ $1 == "migrate" ]; then
        app rails db:migrate
    elif [ $1 == "remove" ]; then
        remove_app
    elif [ $1 == "user_autentication_api" ]; then
        app_config_devise
        app rails g devise_token_auth:install User auth
        app_config_devise_token_auth
        app rails db:migrate
    else
        docker-compose run app $@
    fi
}

function new_app(){
    app rails new ../app
}

function app_reset(){
    permissions_update
    remove_app
    new_app
}

function app_scaffold_api(){
    docker-compose run app rails g scaffold $@ --api
}

function app_scaffold(){
    docker-compose run app rails g scaffold $@
}

function db(){
    if [ $1 == "restore" ]; then
        echo 'iniciando restauração de '$APP_NAME'_development...'
        docker container exec $APP_NAME'_db' psql -d $APP_NAME'_development' -f '/home/db_restore/'$2 -U postgres
        echo $APP_NAME'_development restaurado com sucesso'
    elif [ $1 == "reset" ]; then
        app rails db:drop
        app rails db:create
        app rails db:migrate
        app rails db:seed
        sudo rm -rf docker-compose/postgres
    else
        docker-compose run postgres $@
    fi 
}

function remove_app(){
    # permissions_update

    #para remover o app criado 
    sudo rm -rf bin 
    sudo rm -rf config 
    sudo rm -rf db 
    sudo rm -rf lib 
    sudo rm -rf log 
    sudo rm -rf public 
    sudo rm -rf storage 
    sudo rm -rf test 
    sudo rm -rf tmp 
    sudo rm -rf vendor 
    sudo rm -rf app 
    sudo rm -rf .gitattributes 
    sudo rm -rf config.ru 
    sudo rm -rf package.json 
    sudo rm -rf Rakefile 
    sudo rm -rf .ruby-version 
    sudo rm -rf docker-compose/postgres
    
    sudo rm -rf node_modules
    sudo rm -rf .browserslistrc
    sudo rm -rf babel.config.js
    sudo rm -rf postcss.config.js
    sudo rm -rf yarn.lock
    sudo rm -rf package-lock.json

}

app_turbolink_remove(){
   sudo sed -i "10c    <%#= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %> <!--trecho desabilitado pelo start.sh-->" app/views/layouts/application.html.erb
}

 # config.change_headers_on_each_request = true config/initializers/devise_token_auth.rb
app_config_devise_token_auth(){
    sudo sed -i "s/# config.change_headers_on_each_request = true/config.change_headers_on_each_request = true/" config/initializers/devise_token_auth.rb
    sudo sed -i "s/# config.check_current_password_before_update = :attributes/ config.check_current_password_before_update = :password/" config/initializers/devise_token_auth.rb
    sudo sed -i "s/# config.send_confirmation_email = true/ config.send_confirmation_email = true/" config/initializers/devise_token_auth.rb 
}

app_config_devise(){
    sudo sed -i "73c    config.action_mailer.delivery_method = :letter_opener \n config.action_mailer.perform_deliveries = true \n config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }" config/environments/development.rb
    sudo sed -i "s/config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'/config.mailer_sender = '$APP_NAME@example.com'/" config/initializers/devise.rb
    sudo sed -i "266c    config.navigational_formats = [:json]" config/initializers/devise.rb
}

atualiza_nome_app(){
   sudo sed -i "1cAPP_NAME="$1 .env
}

function permissions_update(){
    sudo chown -R $USER:$USER app
    sudo chown -R $USER:$USER .env
    sudo chown -R $USER:$USER .gitignore
    sudo chown -R $USER:$USER Dockerfile
    sudo chown -R $USER:$USER README.md
    sudo chown -R $USER:$USER docker-compose.yml
    sudo chown -R $USER:$USER start.sh
    sudo chown -R $USER:$USER docker-compose/functions.sh
    echo permissões atualisadas!
}

function prune(){
    docker system prune -a -f
}

function build_project(){
    app_reset

    app_scaffold_api unit name:string
    app_scaffold_api localization longitude:string latitude:string
    app_scaffold_api store name:string localization:references
    app_scaffold_api list name:string date_time:date store:references
    app_scaffold_api item name:string list:references
    app_scaffold_api itemlist item:references list:references default:boolean unit:references
    app_scaffold_api priceperunitofmeasure quantity:float unit:references
    app_scaffold_api product description:string unit:references packagingquantity:float price:float
    app_scaffold_api productitem item:references product:references
    app_scaffold_api storeproduct store:references product:references

    docker-compose up -d

    app rails db:create
    app rails db:migrate
}

function destroy_project(){
    remove_app
    docker-compose down
    prune
}

function restart(){
    docker-compose down
    prune
    source start.sh
}

function se_existe(){
    file=$1
    if [ -f "$file" ] || [ -d "$file" ]
    then
        $2
    fi
}

function Welcome(){
    echo funções carregadas!
}

Welcome
