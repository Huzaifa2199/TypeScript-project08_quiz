#!/usr/bin/env node
import { exit } from 'process';


interface quizQues {
    question: string;
    choices: string[];
    correctChoice: string;
}
async function quizGame(): Promise<void> {
    const questions: quizQues[] = [
        {
            question: "What is the largest ocean in the world?",
            choices: ["Atlantic", "Pacific", "Arctic"],
            correctChoice: "Pacific"
        },
        {
            question: "What is the highest mountain in the world?",
            choices: ["Mount Everest", "K2", "Mount Denali"],
            correctChoice: "Mount Everest"
        },
        {
            question: "Which team won fifa qatar Final?",
            choices: ["Spain", "France", "Argentina"],
            correctChoice: "Argentina"
        }
    ];

    let numCorrect = 0;
    for (const question of questions) {
        await askQuestion(question);
        numCorrect++;
    }

    console.log(`You got ${numCorrect} out of ${questions.length} questions correct!`);
    exit();
}
async function askQuestion(question: quizQues): Promise<void> {
    console.log(question.question);
    for (let i = 0; i < question.choices.length; i++) {
        console.log(`${i + 1}: ${question.choices[i]}`);
    }
    const userChoice: any = await askUserForInput(`Enter the number of your choice:`);
    if (question.choices[userChoice - 1] === question.correctChoice) {
        console.log("Correct!");
    } else {
        console.log("Incorrect!");
    }
}

async function askUserForInput(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdout.write(prompt);
        process.stdin.on("data", (data: string) => {
            resolve(data.toString().trim());
        });
    });
}

quizGame();