#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Interface for a task
interface Task {
    description: string;
    completed: boolean;
}

// Simulated in-memory task list
let tasks: Task[] = [];

async function main(): Promise<void> {
    console.log(chalk.blue.bold("Welcome to My To-Do List App!\n"));

    while (true) {
        const toDoApp = await inquirer.prompt([
            {
                name: "toDo",
                message: chalk.yellow("What would you like to do?"),
                type: "list",
                choices: ["Add a Task", "Delete Task", "View Tasks", "Complete Task", "Exit"],
            }
        ]);

        switch (toDoApp.toDo) {
            case "Add a Task":
                const addTask = await inquirer.prompt([
                    {
                        name: "description",
                        message: chalk.yellow("Enter the task description:"),
                        type: "input",
                    }
                ]);
                tasks.push({ description: addTask.description, completed: false });
                console.log(chalk.green("Task added successfully!\n"));
                break;

            case "Delete Task":
                const deleteTask = await inquirer.prompt([
                    {
                        name: "description",
                        message: chalk.yellow("Select the task to delete:"),
                        type: "list",
                        choices: tasks.map(task => task.description),
                    }
                ]);
                tasks = tasks.filter(task => task.description !== deleteTask.description);
                console.log(chalk.red("Task deleted successfully!\n"));
                break;

            case "View Tasks":
                console.log(chalk.blue.bold("Your To-Do List:"));
                tasks.forEach(task => {
                    const taskStatus = task.completed ? chalk.green("(Completed)") : chalk.red("(Incomplete)");
                    console.log(`${task.description} ${taskStatus}`);
                });
                console.log(); // Empty line for readability
                break;

            case "Complete Task":
                const incompleteTasks = tasks.filter(task => !task.completed);
                if (incompleteTasks.length === 0) {
                    console.log(chalk.yellow("No incomplete tasks to mark as complete!\n"));
                    break;
                }
                const completeTask = await inquirer.prompt([
                    {
                        name: "description",
                        message: chalk.yellow("Select the task to mark as complete:"),
                        type: "list",
                        choices: incompleteTasks.map(task => task.description),
                    }
                ]);
                const taskToComplete = tasks.find(task => task.description === completeTask.description);
                if (taskToComplete) {
                    taskToComplete.completed = true;
                    console.log(chalk.cyan("Task marked as complete!\n"));
                }
                break;

            case "Exit":
                console.log(chalk.magenta("Goodbye!"));
                return; // Exit the function, effectively ending the program

            default:
                break;
        }
    }
}

main();