1. Clonar o repositório

git clone (https://github.com/wom2000/cursosApp.git)
cd cursos


2. Instalar dependências

composer install
npm install


3. Configurar ambiente

cp .env.example .env
php artisan key:generate


Edita o `.env` e configura a base de dados.


4. Preparar base de dados

php artisan migrate


5. Rodar o projeto

Abre dois terminais:

php artisan serve
npm run dev


Acede a `http://localhost:8000`

Como Trabalhar com Git- Criar uma branch para as tuas alterações

git checkout -b nome-da-tua-branch


Fazer commit das alterações

git add .
git commit -m "o que fizeste"


Enviar para o repositório

git push origin nome-da-tua-branch


Depois abre um **Pull Request** no GitHub/GitLab para eu rever.
