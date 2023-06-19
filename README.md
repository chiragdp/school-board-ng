# Project in Angular (School Board)

- This webapplication is build using the angular version 16

## Features of Project

- `User Features`
  - student can login/register into the board app
  - user can view the anouncements
  - user can search and sorts the anouncements
- `Admin Features`
  - admin can login into dashboard with following credentials
    > `credentials`
          username: chirag
          password: chirag
  - admin can view,create, update, delete the anouncements
  - admin has rich text editor build into dashboard for better anouncement create

## steps to use this project

First clone this repo using the following command

```shell
git clone https://github.com/chiragdp/school-board-ng.git

cd school-board-ng

npm install
```

now there is 2 way of running this project

### 1) using shell script

this project comes with `script.sh` file which can be used to run the project very easily
simply run the following commands

```shell
chmod +x script.sh
./script.sh
```

it will run the project very easily

### 2) using npm script

simply run the following command into your terminal

```shell
npm run start
```

## if you want to build the application for the production run the following command

```shell
npm run build:prod
```
