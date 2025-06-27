#!/bin/bash

criarTudo() {
    echo "Criando recurso"
    docker exec -it api-tarefada sh -c "nest g resource --no-spec "
}

$1